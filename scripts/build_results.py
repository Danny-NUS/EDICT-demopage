"""Extract the website tables directly from the manuscript's numeric cells.

Usage: python3 scripts/build_results.py [path/to/EDICT_ICLR]
Without an argument, rebuild from the three included main-experiment tables.
No third-party packages required. The MOS CSV is a provided aggregate.
"""
import csv
import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAPER = Path(sys.argv[1]) if len(sys.argv) > 1 else None
OUT = ROOT / 'assets/data'
(OUT / 'sources').mkdir(parents=True, exist_ok=True)


def extract(relative, width, count):
    path = PAPER / relative if PAPER else OUT / 'sources' / Path(relative).name
    destination = OUT / 'sources' / path.name
    if path.resolve() != destination.resolve():
        shutil.copy2(path, destination)
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

}
mos = []
for row in csv.DictReader((OUT/'mos_results.csv').open()):
    for key in ['mean','interval_half_width']:
        row[key] = float(row[key]) if row[key] else None
    mos.append(row)
payload = dict(results=data, mos=mos)
(ROOT/'results-data.js').write_text('/* Extracted from manuscript tables; regenerate with scripts/build_results.py. */\nwindow.EDICT_RESEARCH = '+json.dumps(payload,ensure_ascii=False,indent=2)+';\n')
print(f'Extracted {len(data)} result families, {sum(len(d["variants"]) for d in data.values())} table views and {len(mos)} MOS records.')
