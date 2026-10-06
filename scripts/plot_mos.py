"""Regenerate the site's six MOS figures from the original CSV, without altering values.

Export desktop/mobile SVGs and the six-page PDF used by the website.
Intervals are the published symmetric display half-widths, not re-estimated CIs.
"""
import csv
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
from matplotlib.patches import Rectangle

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/charts'
OUT.mkdir(parents=True, exist_ok=True)
BLUE, GRAY, INK = '#0072B2', '#879597', '#263F47'
plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 11,
    'text.color': INK, 'axes.labelcolor': '#62767A', 'xtick.color': '#71868A',
    'ytick.color': INK, 'svg.fonttype': 'none', 'pdf.fonttype': 42,
    'savefig.facecolor': 'white', 'savefig.dpi': 300})
with (ROOT / 'assets/data/mos_results.csv').open() as source:
    rows = list(csv.DictReader(source))
lookup = {(r['task'], r['system'], r['metric']): r for r in rows}
GROUPS = [
    ('timbre', ['Qwen3-TTS-VD', 'Qwen3-TTS-Base', 'CosyVoice 2', 'Seed-VC', 'EDICT'], ['Edit-MOS', 'N-MOS', 'S-MOS']),
    ('intra', ['Concat.', 'Joint', 'TED-TTS adaptation', 'EDICT'], ['Instr-MOS', 'Trans-MOS', 'N-MOS'])]
LABELS = {'Edit-MOS':'Edit Accuracy', 'N-MOS':'Naturalness', 'S-MOS':'Target similarity', 'Instr-MOS':'Instruction Following', 'Trans-MOS':'Transition quality'}

def chart(task, systems, metric, compact=False, title=False):
    fig, ax = plt.subplots(figsize=(4.2, 3.05) if compact else (8.4, 3.5))
    fig.subplots_adjust(left=.335 if compact else .265, right=.81, bottom=.17, top=.86)
    positions = list(range(len(systems)))
    ax.set_xlim(1, 5)
    ax.set_ylim(len(systems)-.55, -.55)
    ax.set_xticks([1,3,5] if compact else [1,2,3,4,5])
    ax.set_yticks(positions, ['TED-TTS\nadaptation' if compact and s == 'TED-TTS adaptation' else s + (' †' if s == 'Seed-VC' else '') for s in systems])
    ax.tick_params(axis='both', length=0, pad=9, labelsize=10 if compact else 12)
    ax.set_xlabel('Mean opinion score (1–5) ↑', fontsize=9 if compact else 11, labelpad=10)
    for spine in ax.spines.values(): spine.set_visible(False)
    ax.set_axisbelow(True)
    ax.grid(axis='x', color='#E6EEEE', lw=.8)
    for i, system in enumerate(systems):
        own = system == 'EDICT'
        if own:
            ax.add_patch(Rectangle((-.68 if compact else -.50,i-.43),2.02 if compact else 1.79,.86,transform=ax.get_yaxis_transform(),clip_on=False,facecolor='#EDF5F8',edgecolor='none',zorder=-1))
        r = lookup[task, system, metric]
        color = BLUE if own else GRAY
        if r['mean'].strip() in ('', 'NA', 'N/A'):
            ax.text(3, i, 'Not evaluated', va='center', ha='center', fontsize=8 if compact else 11, color='#91A0A2')
            value = '—'
        else:
            mean, err = float(r['mean']), float(r['interval_half_width'])
            ax.errorbar(mean, i, xerr=err, fmt='D' if system == 'Seed-VC' else 'o',
                markersize=4.5 if compact else 6.5, color=color,
                markerfacecolor='white' if system == 'Seed-VC' else color,
                markeredgewidth=1.2, elinewidth=1.4, capsize=3, zorder=3)
            value = f'{mean:.2f} ± {err:.2f}'
        ax.text(1.025 if compact else 1.08, i, value, transform=ax.get_yaxis_transform(), va='center', ha='left',
            fontsize=9 if compact else 11.5, color=BLUE if own else '#5E7377',
            fontweight='bold' if own else 'normal', clip_on=False)
    for label in ax.get_yticklabels():
        if label.get_text() == 'EDICT': label.set_color(BLUE); label.set_fontweight('bold')
    ax.text(-.64 if compact else -.47, 1.055, 'SYSTEM', transform=ax.transAxes, fontsize=7 if compact else 9, color='#7B8E91', clip_on=False)
    ax.text(1.025 if compact else 1.08, 1.055, 'MEAN ± CI', transform=ax.transAxes, fontsize=7.5 if compact else 9, color='#7B8E91', clip_on=False)
    if title:
        fig.suptitle(('Timbre editing' if task == 'timbre' else 'Local instruction control')+' · '+LABELS[metric],x=.035,y=.98,ha='left',fontsize=12)
        fig.text(.035,.015,'Reported symmetric 95% bootstrap CI display. † Seed-VC receives target audio.',fontsize=7,color='#62767A')
    return fig

with PdfPages(OUT / 'mos-overview.pdf', metadata={'Title':'EDICT: mean opinion scores', 'Author':''}) as pdf:
    for task, systems, metrics in GROUPS:
        for metric in metrics:
            name = f'mos-{task}-{metric.lower()}'
            fig = chart(task, systems, metric)
            fig.savefig(OUT / f'{name}.svg')
            plt.close(fig)
            fig = chart(task, systems, metric, compact=True)
            fig.savefig(OUT / f'{name}-compact.svg')
            plt.close(fig)
            fig = chart(task, systems, metric, title=True)
            pdf.savefig(fig)
            plt.close(fig)
for svg in OUT.glob('mos-*.svg'):
    svg.write_text('\n'.join(line.rstrip() for line in svg.read_text().splitlines()) + '\n')
print('Generated all six MOS charts and the six-page overview from unchanged CSV values.')
