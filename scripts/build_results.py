"""Extract the website tables directly from the manuscript's numeric cells.

Usage: python3 scripts/build_results.py /path/to/EDICT_ICLR
No third-party packages required. The MOS CSV is a provided aggregate.
"""
import csv
import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAPER = Path(sys.argv[1])
OUT = ROOT / 'assets/data'
(OUT / 'sources').mkdir(parents=True, exist_ok=True)


def extract(relative, width, count):
    path = PAPER / relative
    shutil.copy2(path, OUT / 'sources' / path.name)
    rows = []
    for row in re.split(r'\\\\', path.read_text()):
        if '&' not in row:
            continue
        values = []
        for cell in row.split('&')[1:]:
            cell = re.sub(r'\\[A-Za-z]+', '', cell)
            cell = re.sub(r'[{}$\s]', '', cell)
            if re.fullmatch(r'-?\d+(?:\.\d+)?(?:/-?\d+(?:\.\d+)?)?', cell):
                values.append(cell.replace('/', ' / '))
        if len(values) == width:
            rows.append(values)
    assert len(rows) == count, (relative, len(rows), count)
    return rows


def variant(key, label, names, values, columns):
    return dict(id=key, label=label, columns=['System / configuration'] + columns,
                rows=[[name] + row for name, row in zip(names, values)])


systems = ['Qwen3-TTS-VD', 'Qwen3-TTS-Base', 'CosyVoice 2', 'EDICT']
local_systems = ['Concat.', 'Joint', 'TED-TTS', 'EDICT']
timbre = extract('tables/timbre_editing_results.tex', 9, 10)
local = extract('tables/intratts_results.tex', 7, 8)
joint = extract('tables/joint_control_results.tex', 8, 4)
attributes = extract('tables/attribute_editing_results.tex', 4, 8)
cache = extract('tables/kv_cache_ablation.tex', 7, 5)
training = extract('tables/timbre_editor_posttraining.tex', 5, 10)
medtts = extract('appendix/tables/medtts_overall.tex', 6, 8)
quality = ['CER / WER (%) ↓', 'UTMOS ↑', 'DNSMOS ↑']
local_cols = ['SegAcc (%) ↑', 'EmoAcc (%) ↑', 'Trans (%) ↑', 'SIM-I ↑'] + quality
voice_cols = quality + ['WavLM SIM-T ↑', 'WavLM SIM-R', 'WavLM ΔSIM ↑', 'ERes2Net SIM-T ↑', 'ERes2Net SIM-R', 'ERes2Net ΔSIM ↑']
data = {
    'voice': dict(label='Timbre editing', title='TimbreEdit-Bench', source='timbre_editing_results.tex',
        context='Instruction-conditioned systems are compared under matched structured or descriptive requests. Target-reference voice conversion is evaluated separately on a same-text subset and receives target audio.',
        note='SIM-T and SIM-R compare output with the target and source voices. ΔSIM = SIM-T − SIM-R; source similarity is not ranked. CER/WER are Chinese character and English word error rates. UTMOS and DNSMOS are predicted quality scores.',
        takeaway='EDICT improves target similarity under both instruction forms and both speaker encoders. Target-reference systems operate with different input information.',
        variants=[variant('structured','Structured instructions',systems,timbre[:8:2],voice_cols),variant('descriptive','Descriptive instructions',systems,timbre[1:8:2],voice_cols),variant('target','Target-reference VC · separate subset',['FreeVC','Seed-VC'],timbre[8:],voice_cols)]),
    'local': dict(label='Local control',title='IntraTTS-Bench',source='intratts_results.tex',
        context='All four methods within a backbone use the same TTS model. TED-TTS denotes the segment-aware adaptation evaluated in the paper.',
        note='SegAcc: segment instruction adherence. EmoAcc: requested emotion realization. Trans: natural, speaker-consistent transitions. These are Gemini 3.1 Pro judgments, averaged per utterance. SIM-I measures inter-segment speaker similarity with WavLM.',
        takeaway='On both backbones, EDICT improves control and transition scores over TED-TTS. Concat. has the strongest isolated segment accuracy; Joint favors speaker consistency and intelligibility.',
        variants=[variant('qwen','Qwen-VD backbone',local_systems,local[:4],local_cols),variant('cosy','CosyVoice 2 backbone',local_systems,local[4:],local_cols)]),
    'joint': dict(label='Joint control',title='Joint timbre and delivery control',source='joint_control_results.tex',
        context='Qwen-VD backbone. Joint and Concat. receive the original reference and global edit request. Editor + concat. and Full EDICT share the same edited reference.',
        note='SIM-T compares the complete utterance with the target voice. Target audio is used only for evaluation. SIM-I measures speaker consistency across segments; CER/WER report content errors.',
        takeaway='The editor improves target matching; reconstruction improves continuity. Full EDICT has the highest transition score and target similarity, with lower segment accuracy than independent synthesis.',
        variants=[variant('all','Qwen-VD backbone',['Qwen-VD · Joint','Qwen-VD · Concat.','Editor + concat.','Full EDICT'],joint,['SegAcc (%) ↑','Trans (%) ↑']+quality+['SIM-I ↑','WavLM SIM-T ↑','ERes2Net SIM-T ↑'])]),
    'attributes': dict(label='Attribute accuracy',title='Edit Accuracy and attribute preservation',source='attribute_editing_results.tex',
        context='500 TimbreEdit-Bench requests. Gemini compares the source and generated audio without the target recording.',
        note='Up/Down accuracy measures ordinal direction, not exact edit magnitude. Category accuracy measures requested categorical targets. Preservation evaluates attributes that should remain unchanged.',
        takeaway='EDICT has stronger requested-edit accuracy; Qwen-VD better preserves unmentioned attributes. These are separate evaluation criteria.',
        variants=[variant('structured','Structured instructions',systems,attributes[::2],['Up accuracy (%) ↑','Down accuracy (%) ↑','Category accuracy (%) ↑','Preservation (%) ↑']),variant('descriptive','Descriptive instructions',systems,attributes[1::2],['Up accuracy (%) ↑','Down accuracy (%) ↑','Category accuracy (%) ↑','Preservation (%) ↑'])]),
    'cache': dict(label='Cache ablation',title='KV cache reconstruction ablation',source='kv_cache_ablation.tex',
        context='IntraTTS-Bench, Qwen-VD. Full EDICT retains the first S = 4 and most recent K = 5 acoustic positions. Persistent and truncated caches reuse old KV states.',
        note='The context ablations remove either initial or recent acoustic inputs. All variants otherwise use the same backbone. Higher control and continuity can coincide with higher recognition errors.',
        takeaway='Reconstruction outperforms simply retaining or truncating old states. Removing initial context weakens speaker consistency; removing recent context sharply reduces transition quality.',
        variants=[variant('all','Qwen-VD · S = 4, K = 5',['Persistent KV cache','Truncated KV cache','EDICT (full)','Without initial context','Without recent context'],cache,local_cols)]),
    'training': dict(label='Editor training',title='Timbre-editor training ablation',source='timbre_editor_posttraining.tex',
        context='TimbreEdit-Bench. Post-training starts from the 1M-pair SFT checkpoint. M is the number of candidates per condition; GRPO denotes the offline, clipped-ratio variant used in this work.',
        note='GRPO target-only uses M = 16. SIM-T is reported with both WavLM and ERes2Net. Quality and recognition metrics are retained to show the post-training trade-offs.',
        takeaway='Offline target-only optimization achieves the highest target similarity among these configurations, while quality and recognition-error changes are mixed.',
        variants=[variant('structured','Structured instructions',['SFT (0.5M)','SFT (1M)','DPO (M = 4)','DPO (M = 16)','GRPO target-only'],training[::2],quality+['WavLM SIM-T ↑','ERes2Net SIM-T ↑']),variant('descriptive','Descriptive instructions',['SFT (0.5M)','SFT (1M)','DPO (M = 4)','DPO (M = 16)','GRPO target-only'],training[1::2],quality+['WavLM SIM-T ↑','ERes2Net SIM-T ↑'])]),
    'medtts': dict(label='MED-TTS',title='Supplementary evaluation on MED-TTS',source='medtts_overall.tex',
        context='500 MED-TTS examples. Results are separated by language and use emotion2vec+ large classification accuracy as a complementary emotion measure.',
        note='Emo2v: emotion classification accuracy. SIM-I: inter-segment speaker similarity. TCD is reported in the manuscript’s 10⁻³ TCD scale; lower is better. OVRL denotes DNSMOS OVRL. Recognition error is CER for Chinese and WER for English.',
        takeaway='EDICT improves emotion accuracy over Joint and TED-TTS and has the lowest TCD in both languages. Concat. retains the highest emotion-classification accuracy.',
        variants=[variant('zh','Chinese',local_systems,medtts[:4],['CER (%) ↓','Emo2v (%) ↑','SIM-I ↑','TCD (10⁻³) ↓','OVRL ↑','UTMOS ↑']),variant('en','English',local_systems,medtts[4:],['WER (%) ↓','Emo2v (%) ↑','SIM-I ↑','TCD (10⁻³) ↓','OVRL ↑','UTMOS ↑'])])
}
mos = []
for row in csv.DictReader((OUT/'mos_results.csv').open()):
    for key in ['mean','interval_half_width']:
        row[key] = float(row[key]) if row[key] else None
    mos.append(row)
payload = dict(results=data, mos=mos)
(OUT/'results.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
(ROOT/'results-data.js').write_text('/* Extracted from manuscript tables; regenerate with scripts/build_results.py. */\nwindow.EDICT_RESEARCH = '+json.dumps(payload,ensure_ascii=False,indent=2)+';\n')
print(f'Extracted {len(data)} result families, {sum(len(d["variants"]) for d in data.values())} table views and {len(mos)} MOS records.')
