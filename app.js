(() => {
  'use strict';
  const data = window.EDICT_DEMOS;
  const state = {lang: 'en', example: 0};
  const samples = new Map();
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const time = seconds => `${Math.floor((seconds || 0) / 60)}:${String(Math.floor((seconds || 0) % 60)).padStart(2, '0')}`;
  const icons = {play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor"/></svg>', pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm7 0h4v14h-4z" fill="currentColor"/></svg>'};
  let sequence = null;
  function stopSequence(pause = false) {
    if (!sequence) return;
    const old = sequence; sequence = null;
    old.button.classList.remove('is-running');
    old.button.setAttribute('aria-pressed', 'false');
    old.button.innerHTML = old.label;
    old.button.closest('.sequence-control').querySelector('[role="status"]').textContent = '';
    if (pause) old.current?.pause();
  }
  function audio(label, d, key, featured = false, colorSegments = false) {
    const src = d.audio[key];
    if (!src) return '';
    const peaks = window.EDICT_WAVEFORMS?.[src] || [];
    const bars = peaks.map((p, i) => `<rect x="${i * 4}" y="${16 - Math.max(1, p * 15)}" width="2" height="${Math.max(2, p * 30)}" rx="1"/>`).join('');
    const duration = d.durations[key];
    const segmented = colorSegments && duration > 0 && d.boundaries?.length === d.segments?.length;
    // Sharp gradient stops keep color changes at the actual instruction boundaries,
    // including a boundary that falls in the middle of a waveform bar.
    const wave = layer => {
      const gradientId = `wave-${d.id}-${key}-${layer}`;
      const stops = segmented ? d.boundaries.map((end, i) => {
        const start = i === 0 ? 0 : d.boundaries[i - 1];
        const left = Math.min(100, start / duration * 100);
        const right = i === d.boundaries.length - 1 ? 100 : Math.min(100, end / duration * 100);
        return `<stop offset="${left}%" class="segment-${i}"/><stop offset="${right}%" class="segment-${i}"/>`;
      }).join('') : '';
      const defs = segmented ? `<defs><linearGradient id="${escape(gradientId)}" gradientUnits="userSpaceOnUse" x1="0" x2="256" y1="0" y2="0">${stops}</linearGradient></defs>` : '';
      return `<svg viewBox="0 0 256 32" preserveAspectRatio="none" aria-hidden="true">${defs}<g${segmented ? ` fill="url(#${escape(gradientId)})"` : ''}>${bars}</g></svg>`;
    };
    // Durations and waveforms are bundled; fetch audio only when the visitor plays it.
    const name = escape(`${label} — ${d.title}`);
    return `<div class="audio-slot ${featured ? 'featured-audio' : ''}"><div class="audio-header"><strong>${escape(label)}</strong>${featured ? '<span class="ours-label">OURS</span>' : ''}</div><div class="player"><button type="button" class="play-button" aria-label="Play ${name}">${icons.play}</button><div class="waveform${segmented ? ' segmented-wave' : ''}"><div class="wave-base">${wave('base')}</div><div class="wave-progress">${wave('progress')}</div><input type="range" min="0" max="${d.durations[key] || 1}" step="0.01" value="0" aria-label="Seek ${name}" aria-valuetext="0:00" title="${segmented ? 'Colors match the instruction segments. Drag to seek.' : 'Seek audio'}"></div></div><div class="player-bottom"><span class="player-state">${featured ? 'EDICT output' : key === 'source' ? 'Reference audio' : key === 'target' ? 'Reference audio' : 'Comparison output'}</span><span class="player-time">0:00 / ${time(d.durations[key])}</span></div><audio controls preload="none" data-role="${escape(key)}" aria-label="${name}"><source src="${escape(src)}" type="audio/wav"></audio><span class="audio-status" role="status"></span></div>`;
  }
  function scripts(d, timed = false) {
    return `<div class="script-grid" style="--segment-count:${d.segments.length}">${d.segments.map((s, i) => {
      const start = i === 0 ? 0 : d.boundaries[i - 1];
      const tag = timed ? 'button' : 'article';
      return `<${tag} ${timed ? `type="button" data-seek="${start}" aria-label="Play segment ${i + 1}: ${escape(s.style)}"` : ''} class="script-card segment-${i}" data-segment="${i}"><span class="segment-top"><span class="segment-number">${String(i + 1).padStart(2, '0')}</span>${timed ? `<span class="segment-time">▶ ${time(start)}</span>` : '<span class="segment-line" aria-hidden="true"></span>'}</span><span class="segment-style">${escape(s.style)}</span><span class="segment-text">${escape(s.text)}</span><span class="segment-detail">${escape(s.instruction)}</span></${tag}>`;
    }).join('')}</div>`;
  }
  const sequenceButton = (roles, label) => `<div class="sequence-control"><button class="listen-sequence" type="button" data-sequence="${roles}" aria-pressed="false"><span aria-hidden="true">▶</span> ${label}</button><span role="status"></span></div>`;
  const cardHeading = (d, lang, i) => `<header class="sample-heading"><div><span class="sample-number">${String(i + 1).padStart(2, '0')}</span><h3>${escape(d.title)}</h3></div><span class="sample-language">${lang === 'zh' ? '中文' : 'ENGLISH'}</span></header>`;
  function sampleHTML(type, d, lang, i = 0) {
    samples.set(d.id, d);
    let content;
    if (type === 'voice') {
      content = `${cardHeading(d, lang, i)}<div class="timbre-input"><div class="source-player">${audio('Source voice', d, 'source')}</div><div class="timbre-instruction"><span class="field-label">THE EDIT INSTRUCTION</span><p>“${escape(d.edit)}”</p></div></div><div class="synthesis-text"><span class="field-label">TEXT</span><p>${escape(d.text)}</p></div><div class="comparison-label"><span>Compare the outputs</span>${sequenceButton('source,edict', 'Source → EDICT')}</div><div class="method-players">${audio('Qwen3-TTS-VD', d, 'qwen_vd')}${audio('Qwen3-TTS-Base', d, 'qwen_base')}${audio('CosyVoice 2', d, 'cosyvoice2')}${audio('EDICT', d, 'edict', true)}</div><details class="sample-context"><summary>Target reference <span>For evaluation only +</span></summary><div class="target-context">${audio('Target reference', d, 'target')}<p>This recording is available for listening comparison, not as input to the instruction-conditioned systems above.</p></div></details>`;
    } else if (type === 'delivery') {
      content = `${cardHeading(d, lang, i)}<div class="comparison-label"><span>Text + local instructions</span><span>${d.segments.length} ordered segments</span></div>${scripts(d)}<div class="comparison-label"><span>Compare the complete utterance</span><span>Same text · Same voice description</span></div><div class="method-players">${audio('Concat.', d, 'concat')}${audio('Joint', d, 'joint')}${audio('TED-TTS', d, 'ted_tts')}${audio('EDICT', d, 'edict', true)}</div><details class="sample-context"><summary>Voice instruction &amp; listening notes <span>+</span></summary><div class="context-body"><span class="field-label">GLOBAL VOICE INSTRUCTION</span><p>${escape(d.globalInstruction)}</p><p class="case-listen"><strong>Listen for.</strong> ${escape(d.listen)}</p></div></details>`;
    } else {
      content = `<div class="joint-inputs"><div class="joint-request"><span class="field-label"><b>1</b> EDIT THE VOICE</span><p class="edit-copy">“${escape(d.edit)}”</p></div><div class="reference-strip">${audio('Source voice', d, 'source')}${audio('Edited voice · synthesis reference', d, 'target')}</div></div><div class="joint-output-heading"><div><span class="field-label"><b>2</b> SYNTHESIZE WITH LOCAL INSTRUCTIONS</span><h3>${escape(d.title)}</h3></div>${sequenceButton('target,edict', 'Edited voice → Synthesis')}</div><div class="joint-output">${audio('Synthesized speech · Edited timbre', d, 'edict', true, true)}</div><div class="segment-guidance"><span>Click a segment to listen from there</span><span class="playback-caption" aria-live="polite">${d.segments.length} segments · one edited voice</span></div>${scripts(d, true)}<p class="case-listen"><strong>Listen for.</strong> ${escape(d.listen)}</p>`;
    }
    return `<article class="sample ${type === 'joint' ? 'joint-sample' : 'comparison-card'}" data-sample="${escape(d.id)}" aria-label="${escape(d.title)}" lang="${lang === 'zh' ? 'zh-CN' : 'en'}">${content}</article>`;
  }
  function render(type) {
    const container = document.getElementById(type + '-content');
    container.querySelectorAll('audio').forEach(a => a.pause());
    if (type !== 'joint') {
      container.innerHTML = ['en','zh'].map(lang => data[type][lang].map((d, i) => sampleHTML(type, d, lang, i)).join('')).join('');
    } else {
      stopSequence(true);
      const list = data.joint[state.lang], shell = container.closest('[data-demo]');
      shell.querySelectorAll('[data-language]').forEach(button => {
        const lang = button.dataset.language;
        button.textContent = `${lang === 'zh' ? '中文' : 'English'} · ${data.joint[lang].length}`;
        button.setAttribute('aria-pressed', String(lang === state.lang));
      });
      const choices = shell.querySelector('[data-example-choices]');
      choices.innerHTML = list.map((d, i) => `<button type="button" class="sample-choice" id="joint-example-${state.lang}-${i}" data-example="${i}" aria-pressed="${i === state.example}" aria-controls="joint-content"><span class="sample-choice-number">${String(i + 1).padStart(2, '0')}</span><span>${escape(d.title)}</span><span class="sample-choice-arrow" aria-hidden="true">↗</span></button>`).join('');
      choices.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
      shell.querySelector('[data-example-count]').textContent = '6 demos · 3 English + 3 中文';
      container.setAttribute('aria-labelledby', `joint-example-${state.lang}-${state.example}`);
      container.innerHTML = sampleHTML(type, list[state.example], state.lang);
    }
    bindAudio(container);
  }
  function play(a) {
    if (!a) return;
    a.play().catch(() => {
      a.closest('.audio-slot').querySelector('.audio-status').textContent = 'Playback could not start. Press play to retry.';
      stopSequence();
    });
  }
  function nextInSequence() {
    if (!sequence) return;
    if (sequence.index >= sequence.tracks.length) { stopSequence(); return; }
    const a = sequence.tracks[sequence.index++]; sequence.current = a;
    a.currentTime = 0;
    sequence.button.closest('.sequence-control').querySelector('[role="status"]').textContent = `${sequence.index} / ${sequence.tracks.length} · ${a.closest('.audio-slot').querySelector('strong').textContent}`;
    play(a);
  }
  function bindAudio(container) {
    container.querySelectorAll('audio').forEach(a => {
      const slot = a.closest('.audio-slot'), sample = a.closest('[data-sample]');
      const button = slot.querySelector('.play-button'), range = slot.querySelector('input');
      const label = a.getAttribute('aria-label');
      a.controls = false; slot.classList.add('enhanced');
      const update = () => {
        const duration = Number.isFinite(a.duration) ? a.duration : Number(range.max);
        range.max = duration || 1; range.value = a.currentTime;
        range.setAttribute('aria-valuetext', `${time(a.currentTime)} of ${time(duration)}`);
        slot.style.setProperty('--progress', `${Math.min(100, a.currentTime / (duration || 1) * 100)}%`);
        slot.querySelector('.player-time').textContent = `${time(a.currentTime)} / ${time(duration)}`;
        if (a.dataset.role !== 'edict' || !sample.classList.contains('joint-sample')) return;
        const d = samples.get(sample.dataset.sample);
        let index = d.boundaries.findIndex(t => a.currentTime < t);
        if (index < 0) index = d.segments.length - 1;
        sample.querySelectorAll('[data-segment]').forEach(c => {
          const active = !a.ended && !a.paused && Number(c.dataset.segment) === index;
          c.classList.toggle('active', active);
          if (active) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current');
        });
        const caption = sample.querySelector('.playback-caption');
        const text = a.ended ? 'Complete · replay any segment' : a.paused ? `${d.segments.length} segments · one edited voice` : `Now playing ${index + 1} / ${d.segments.length} · ${d.segments[index].style}`;
        if (caption.textContent !== text) caption.textContent = text;
      };
      const updateButton = () => {
        button.innerHTML = a.paused ? icons.play : icons.pause;
        button.setAttribute('aria-label', `${a.paused ? 'Play' : 'Pause'} ${label}`);
        slot.classList.toggle('is-playing', !a.paused);
        slot.querySelector('.player-state').textContent = a.paused ? a.dataset.role === 'edict' ? 'EDICT output' : ['source','target'].includes(a.dataset.role) ? 'Reference audio' : 'Comparison output' : a.readyState < 3 ? 'Loading…' : 'Playing';
        update();
      };
      button.addEventListener('click', () => { stopSequence(); if (a.paused) play(a); else a.pause(); });
      range.addEventListener('input', () => { stopSequence(); a.currentTime = Number(range.value); update(); });
      a.addEventListener('play', () => {
        if (sequence && sequence.current !== a) stopSequence();
        document.querySelectorAll('audio').forEach(other => { if (other !== a) other.pause(); });
        slot.querySelector('.audio-status').textContent = ''; updateButton();
      });
      a.addEventListener('pause', updateButton);
      a.addEventListener('waiting', updateButton);
      a.addEventListener('playing', updateButton);
      a.addEventListener('loadedmetadata', update);
      a.addEventListener('timeupdate', update);
      a.addEventListener('ended', () => { updateButton(); if (sequence?.current === a) nextInSequence(); });
      const error = () => { slot.querySelector('.audio-status').textContent = 'Audio unavailable. Please try again later.'; stopSequence(); };
      a.addEventListener('error', error); a.querySelector('source').addEventListener('error', error);
    });
  }
  document.addEventListener('click', e => {
    const language = e.target.closest('[data-language]'), choice = e.target.closest('[data-example]');
    if (language || choice) {
      if (language) { state.lang = language.dataset.language; state.example = 0; }
      else state.example = Number(choice.dataset.example);
      render('joint');
      if (choice) document.querySelector(`[data-example="${state.example}"]`).focus({preventScroll: true});
      return;
    }
    const jump = e.target.closest('[data-seek]');
    if (jump) {
      stopSequence(); const a = jump.closest('[data-sample]').querySelector('audio[data-role="edict"]');
      a.currentTime = Number(jump.dataset.seek); play(a); return;
    }
    const button = e.target.closest('[data-sequence]');
    if (button) {
      if (sequence?.button === button) { stopSequence(true); return; }
      stopSequence(true);
      const sample = button.closest('[data-sample]');
      const tracks = button.dataset.sequence.split(',').map(key => sample.querySelector(`audio[data-role="${key}"]`)).filter(Boolean);
      sequence = {button, tracks, index: 0, current: null, label: button.innerHTML};
      button.innerHTML = '<span aria-hidden="true">■</span> Stop comparison'; button.classList.add('is-running'); button.setAttribute('aria-pressed', 'true');
      nextInSequence();
    }
  });
  for (const type of ['joint','voice','delivery']) render(type);
  window.EDICT_UI = {escape, render};
})();
