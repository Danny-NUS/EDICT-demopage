(() => {
  'use strict';
  const escape=window.EDICT_UI.escape;
  const research=window.EDICT_RESEARCH;
  const metricLabels={'N-MOS':'Naturalness','Edit-MOS':'Edit Accuracy','S-MOS':'Target similarity','Instr-MOS':'Instruction Following','Trans-MOS':'Transition quality'};
  function table(columns,rows,caption) {
    return `<div class="table-scroll" tabindex="0" role="region" aria-label="${escape(caption)}"><table><caption class="sr-only">${escape(caption)}</caption><thead><tr>${columns.map(c=>`<th scope="col">${escape(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr class="${/EDICT|GRPO target-only/.test(row[0])?'edict-row':''}">${row.map((v,i)=>i===0?`<th scope="row">${escape(v)}</th>`:`<td>${escape(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function result(type) {
    const d=research.results[type];
    const conditions=d.variants.map(v=>`<section class="result-condition" aria-labelledby="result-${escape(type)}-${escape(v.id)}"><h5 id="result-${escape(type)}-${escape(v.id)}">${escape(v.label)}</h5>${table(v.columns,v.rows,d.title+' · '+v.label)}</section>`).join('');
    return `<details class="experiment" data-experiment="${escape(type)}" open><summary><h4>${escape(d.label)}</h4><span class="disclosure-state" aria-hidden="true"><span class="when-open">Collapse −</span><span class="when-closed">Expand +</span></span></summary><div class="experiment-body"><p class="experiment-context">${escape(d.context)}</p>${conditions}<div class="experiment-notes"><p>${escape(d.note)}</p><p class="takeaway">${escape(d.takeaway)}</p></div></div></details>`;
  }
  document.getElementById('results-content').innerHTML=['voice','local','joint'].map(result).join('');
  const captions={
    timbre:{'N-MOS':'Naturalness evaluates pronunciation, rhythm and artifacts, independently of edit accuracy. Seed-VC receives a target recording.','Edit-MOS':'Edit Accuracy evaluates requested changes and explicit preservation requirements. Seed-VC receives target audio and is not evaluated on this criterion.','S-MOS':'Target similarity evaluates perceived timbre relative to the target recording. Seed-VC receives this recording as an input; instruction-conditioned systems do not.'},
    intra:{'N-MOS':'Naturalness is rated on each complete utterance. All four systems use the Qwen-VD backbone.','Instr-MOS':'Instruction Following measures whether the requested delivery occurs at the corresponding text spans. All four systems use Qwen-VD.','Trans-MOS':'Transition quality assesses a consistent voice naturally changing expression. All four systems use the Qwen-VD backbone.'}
  };
  document.querySelectorAll('[data-mos-task]').forEach(select=>select.addEventListener('change',()=>{
    const task=select.dataset.mosTask,metric=select.value;
    const img=document.getElementById('mos-'+task),src=`assets/charts/mos-${task}-${metric.toLowerCase()}.svg`;
    img.src=src.replace('.svg','-compact.svg');img.parentElement.querySelector('source').srcset=img.src;img.alt=`${task==='timbre'?'Timbre editing':'Local control'} — ${metricLabels[metric]} (${metric}): mean ratings and reported symmetric confidence-interval display.`;
    img.closest('[data-figure]').dataset.figure=src;
    document.getElementById('mos-'+task+'-caption').textContent=captions[task][metric];
  }));
  const rows=research.mos.map(r=>[r.system,r.task==='timbre'?'Timbre editing':'Local control',`${metricLabels[r.metric]} (${r.metric})`,r.mean===null?'N/A':r.mean.toFixed(2),r.interval_half_width===null?'N/A':r.interval_half_width.toFixed(2)]);
  document.getElementById('mos-table').innerHTML=table(['System','Task','Criterion','Mean','Reported half-width'],rows,'All MOS means and reported symmetric interval half-widths');
  const dialog=document.getElementById('figure-dialog');let priorFocus;
  document.addEventListener('click',e=>{
    const button=e.target.closest('[data-figure]');if(!button)return;
    priorFocus=button;const img=button.querySelector('img');
    dialog.querySelector('img').src=button.dataset.figure;dialog.querySelector('img').alt=img.alt;
    dialog.querySelector('p').textContent=button.closest('figure')?.querySelector('figcaption')?.textContent||img.alt;
    dialog.showModal();
  });
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
  dialog.addEventListener('close',()=>priorFocus?.focus());
})();
