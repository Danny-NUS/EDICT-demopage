(() => {
  'use strict';
  const escape = window.EDICT_UI.escape, research = window.EDICT_RESEARCH;
  const metricLabels = {'N-MOS':'Naturalness','Edit-MOS':'Edit Accuracy','S-MOS':'Target similarity','Instr-MOS':'Instruction Following','Trans-MOS':'Transition quality'};
  function table(columns, rows, caption) {
    return `<div class="table-scroll" tabindex="0" role="region" aria-label="${escape(caption)}"><table><caption class="sr-only">${escape(caption)}</caption><thead><tr>${columns.map(c => `<th scope="col">${escape(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr class="${/EDICT|GRPO target-only/.test(row[0]) ? 'edict-row' : ''}">${row.map((v, i) => i === 0 ? `<th scope="row">${escape(v)}</th>` : `<td>${escape(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function result(type, index) {
    const d = research.results[type];
    const conditions = d.variants.map(v => `<section class="result-condition" aria-labelledby="result-${escape(type)}-${escape(v.id)}"><h5 id="result-${escape(type)}-${escape(v.id)}">${escape(v.label)}</h5>${table(v.columns, v.rows, d.title + ' · ' + v.label)}</section>`).join('');
    return `<details class="experiment" data-experiment="${escape(type)}" open><summary><h4><span class="experiment-number">${String(index + 1).padStart(2,'0')}</span> ${escape(d.label)}</h4><span class="disclosure-state" aria-hidden="true"><span class="when-open">Collapse −</span><span class="when-closed">Expand +</span></span></summary><div class="experiment-body"><p class="experiment-context">${escape(d.context)}</p>${conditions}<div class="experiment-notes"><p>${escape(d.note)}</p><p class="takeaway">${escape(d.takeaway)}</p></div></div></details>`;
  }
  document.getElementById('results-content').innerHTML = ['voice','local','joint'].map(result).join('');
  const allToggle = document.getElementById('toggle-results');
  const updateToggle = () => { allToggle.textContent = document.querySelector('.experiment[open]') ? 'Collapse all −' : 'Expand all +'; };
  allToggle.addEventListener('click', () => {
    const collapse = !!document.querySelector('.experiment[open]');
    document.querySelectorAll('.experiment').forEach(d => { d.open = !collapse; }); updateToggle();
  });
  document.querySelectorAll('.experiment').forEach(d => d.addEventListener('toggle', updateToggle));
  const captions = {
    timbre:{'N-MOS':'Pronunciation, rhythm and artifacts, assessed independently of edit accuracy.','Edit-MOS':'How well the requested changes and explicit preservation requirements are fulfilled. Seed-VC is not evaluated on this criterion.','S-MOS':'Perceived timbre similarity to the target recording. Seed-VC receives that recording as an input; instruction-conditioned systems do not.'},
    intra:{'N-MOS':'Naturalness of each complete utterance, across all of its text segments.','Instr-MOS':'Whether each requested delivery occurs at the corresponding text span.','Trans-MOS':'How naturally a consistent voice changes expression across segment boundaries.'}
  };
  const metrics = {timbre:['Edit-MOS','N-MOS','S-MOS'],intra:['Instr-MOS','Trans-MOS','N-MOS']};
  const selected = {timbre:'Edit-MOS',intra:'Instr-MOS'};
  let task = 'timbre';
  function renderMOS() {
    const metric = selected[task];
    document.querySelectorAll('[data-mos-task]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mosTask === task)));
    document.getElementById('mos-metrics').innerHTML = metrics[task].map(m => `<button type="button" data-mos-metric="${m}" aria-pressed="${m === metric}">${metricLabels[m]}</button>`).join('');
    const img = document.getElementById('mos-chart');
    const src = `assets/charts/mos-${task}-${metric.toLowerCase()}.svg?v=studio-4`;
    img.src = src;
    img.parentElement.querySelector('source').srcset = src.replace('.svg', '-compact.svg');
    img.alt = `${task === 'timbre' ? 'Timbre editing' : 'Local control'}: ${metricLabels[metric]}. Mean ratings on a fixed 1–5 scale with the reported symmetric 95% confidence-interval display. Exact values are available below.`;
    img.closest('[data-figure]').dataset.figure = src;
    document.getElementById('mos-criterion').textContent = metricLabels[metric];
    document.getElementById('mos-caption').textContent = captions[task][metric];
    const score = research.mos.find(r => r.task === task && r.system === 'EDICT' && r.metric === metric);
    document.getElementById('mos-score').textContent = score.mean.toFixed(2);
    document.getElementById('mos-interval').textContent = `± ${score.interval_half_width.toFixed(2)}`;
    document.getElementById('mos-scope').textContent = task === 'timbre' ? '19 listeners · 10 items per system. † Seed-VC uses target audio, a different input condition.' : '19 listeners · 12 items per system. All four methods use the Qwen-VD backbone.';
  }
  document.querySelectorAll('[data-mos-task]').forEach(b => b.addEventListener('click', () => { task = b.dataset.mosTask; renderMOS(); }));
  document.getElementById('mos-metrics').addEventListener('click', e => {
    const button = e.target.closest('[data-mos-metric]'); if (!button) return;
    selected[task] = button.dataset.mosMetric; renderMOS();
    document.querySelector(`[data-mos-metric="${selected[task]}"]`).focus({preventScroll:true});
  });
  renderMOS();
  const rows = research.mos.map(r => [r.system, r.task === 'timbre' ? 'Timbre editing' : 'Local control', `${metricLabels[r.metric]} (${r.metric})`, r.mean === null ? 'N/A' : r.mean.toFixed(2), r.interval_half_width === null ? 'N/A' : r.interval_half_width.toFixed(2)]);
  document.getElementById('mos-table').innerHTML = table(['System','Task','Criterion','Mean','Reported half-width'], rows, 'All MOS means and reported symmetric interval half-widths');
  const dialog = document.getElementById('figure-dialog'); let priorFocus;
  document.addEventListener('click', e => {
    const button = e.target.closest('[data-figure]'); if (!button) return;
    priorFocus = button; const img = button.querySelector('img');
    dialog.querySelector('img').src = button.dataset.figure; dialog.querySelector('img').alt = img.alt;
    dialog.querySelector('p').textContent = button.closest('.mos-plot') ? `${metricLabels[selected[task]]}. ${captions[task][selected[task]]} Whiskers show the reported symmetric 95% CI display.` : button.closest('figure')?.querySelector('figcaption')?.textContent || img.alt;
    dialog.showModal();
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target !== dialog) return; const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); });
  dialog.addEventListener('close', () => priorFocus?.focus());
})();
