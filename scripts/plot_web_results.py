"""Reproducible vector charts for the website. Requires matplotlib and numpy.
Run from any directory: python3 scripts/plot_web_results.py
"""
import csv
import json
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT/'assets/charts'
OUT.mkdir(parents=True,exist_ok=True)
DATA = json.loads((ROOT/'assets/data/results.json').read_text())
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':12,'text.color':'#172039',
    'axes.labelcolor':'#5a657b','xtick.color':'#5a657b','ytick.color':'#172039',
    'axes.edgecolor':'#dce2ee','axes.spines.top':False,'axes.spines.right':False,
    'svg.fonttype':'none','pdf.fonttype':42,'savefig.facecolor':'white','savefig.dpi':300})
OUR='#0072B2'
COLORS={'Qwen3-TTS-VD':'#596579','Qwen3-TTS-Base':'#009E73','CosyVoice 2':'#E69F00',
        'Seed-VC':'#CC79A7','EDICT':OUR,'Concat.':'#596579','Joint':'#009E73','TED-TTS adaptation':'#E69F00'}
GROUPS=[('timbre',['Qwen3-TTS-VD','Qwen3-TTS-Base','CosyVoice 2','Seed-VC','EDICT'],['N-MOS','Edit-MOS','S-MOS']),
        ('intra',['Concat.','Joint','TED-TTS adaptation','EDICT'],['N-MOS','Instr-MOS','Trans-MOS'])]
lookup={(r['task'],r['system'],r['metric']):r for r in DATA['mos']}

def interval_chart(ax,task,systems,metric,compact=False):
    labels=[s.replace('Qwen3-TTS-','Qwen-').replace('TED-TTS adaptation','TED-TTS')+(' †' if s=='Seed-VC' else '') for s in systems]
    for i,s in enumerate(systems):
        r=lookup[task,s,metric]
        if s=='EDICT':ax.axhspan(i-.36,i+.36,color='#edf5fa',zorder=0)
        if r['mean'] is None:
            ax.text(3,i,'Not evaluated',ha='center',va='center',color='#7c8597',fontsize=12)
            continue
        mean,err=r['mean'],r['interval_half_width']
        ax.errorbar(mean,i,xerr=err,fmt='D' if s=='Seed-VC' else 'o',markersize=8,
            color=COLORS[s],markerfacecolor='white' if s=='Seed-VC' else COLORS[s],
            markeredgewidth=1.6,elinewidth=1.8,capsize=4,zorder=3)
        if compact:
            ax.text(.99,i+.29,f'{mean:.2f} ± {err:.2f}',transform=ax.get_yaxis_transform(),va='center',ha='right',fontsize=12,
                color=OUR if s=='EDICT' else '#596579',fontweight='bold' if s=='EDICT' else 'normal')
        else:
            ax.text(5.17,i,f'{mean:.2f} ± {err:.2f}',va='center',ha='left',fontsize=13,
                color=OUR if s=='EDICT' else '#596579',fontweight='bold' if s=='EDICT' else 'normal',clip_on=False)
    ax.set_yticks(range(len(systems)),labels)
    ax.set_ylim(len(systems)-.45,-.65)
    ax.set_xlim(.95,5.05)
    ax.set_xticks([1,2,3,4,5])
    ax.set_xlabel('Mean opinion score (1–5) ↑',labelpad=12,fontsize=12)
    ax.set_axisbelow(True);ax.grid(axis='x',color='#e5eaf2',linewidth=.8)
    ax.spines['left'].set_visible(False)
    ax.tick_params(axis='y',length=0,pad=7 if compact else 12,labelsize=12 if compact else 13)
    ax.tick_params(axis='x',length=0,pad=8,labelsize=12)

for task,systems,metrics in GROUPS:
    for metric in metrics:
        fig,ax=plt.subplots(figsize=(8.3,3.65))
        fig.subplots_adjust(left=.18,right=.80,bottom=.22,top=.97)
        interval_chart(ax,task,systems,metric)
        key=f'mos-{task}-{metric.lower()}'
        for ext in ['svg','png']:
            fig.savefig(OUT/f'{key}.{ext}',metadata={'Title':f'{task}: {metric} — reported means and symmetric confidence-interval display'} if ext=='svg' else None)
        plt.close(fig)
        fig,ax=plt.subplots(figsize=(4.6,3.65))
        fig.subplots_adjust(left=.29,right=.96,bottom=.22,top=.97)
        interval_chart(ax,task,systems,metric,compact=True)
        fig.savefig(OUT/f'{key}-compact.svg')
        plt.close(fig)
fig,axes=plt.subplots(2,3,figsize=(19,8.2))
fig.subplots_adjust(left=.065,right=.94,bottom=.08,top=.93,wspace=.57,hspace=.48)
for row,(task,systems,metrics) in enumerate(GROUPS):
    for col,metric in enumerate(metrics):
        interval_chart(axes[row,col],task,systems,metric)
        axes[row,col].set_title(('Timbre editing' if task=='timbre' else 'Local control')+' · '+metric,loc='left',fontsize=13,pad=15)
fig.savefig(OUT/'mos-overview.pdf',bbox_inches='tight');plt.close(fig)

# Complementary objective views; data come from the same extracted table rows.
fig,ax=plt.subplots(figsize=(7.2,4.6));fig.subplots_adjust(left=.15,right=.97,bottom=.18,top=.94)
rows=DATA['results']['local']['variants'][0]['rows']
for row,marker,color in zip(rows,['s','^','D','o'],['#596579','#009E73','#E69F00',OUR]):
    x,y=float(row[1]),float(row[3])
    ax.scatter(x,y,s=75,marker=marker,color=color,zorder=3)
    ax.annotate(row[0],(x,y),xytext=(-10,-19) if row[0]=='Concat.' else (9,8),textcoords='offset points',ha='right' if row[0]=='Concat.' else 'left',fontsize=11,color=color)
ax.set_xlim(45,100);ax.set_ylim(45,90)
ax.set_xlabel('Segment instruction accuracy (%) ↑',labelpad=10)
ax.set_ylabel('Transition quality (%) ↑',labelpad=10)
ax.grid(color='#e5eaf2');ax.set_axisbelow(True)
for ext in ['svg','pdf','png']:fig.savefig(OUT/f'local-tradeoff.{ext}')
plt.close(fig)

fig,ax=plt.subplots(figsize=(7.4,4.6));fig.subplots_adjust(left=.31,right=.94,bottom=.18,top=.91)
rows=DATA['results']['cache']['variants'][0]['rows'];y=np.arange(len(rows));height=.28
for off,col,color,label in [(-height/2,1,'#56B4E9','Segment accuracy'),(height/2,3,OUR,'Transition quality')]:
    values=[float(r[col]) for r in rows]
    bars=ax.barh(y+off,values,height,color=color,label=label,zorder=3)
    for bar,v in zip(bars,values):ax.text(v+1,bar.get_y()+height/2,f'{v:.2f}',va='center',fontsize=10,color='#4e5b70')
ax.set_yticks(y,['Persistent cache','Truncated cache','EDICT (full)','No initial context','No recent context']);ax.invert_yaxis();ax.set_xlim(0,104)
ax.set_xlabel('Score (%) ↑',labelpad=10);ax.set_xticks([0,25,50,75,100]);ax.grid(axis='x',color='#e5eaf2');ax.set_axisbelow(True);ax.tick_params(axis='y',length=0)
ax.legend(loc='lower left',bbox_to_anchor=(-.02,1.02),ncol=2,frameon=False,fontsize=10)
for ext in ['svg','pdf','png']:fig.savefig(OUT/f'cache-ablation.{ext}')
plt.close(fig)
print('Generated six MOS interval views, a vector PDF overview, and two objective-result charts.')
