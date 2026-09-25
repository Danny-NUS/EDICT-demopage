(() => {
  'use strict';
  const data = window.EDICT_DEMOS;
  const state = {joint:{lang:'en',example:0},voice:{lang:'en',category:'single',example:0},delivery:{lang:'en',category:'emotion',example:0}};
  const samples = new Map();
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function safeSource(src) {
    if (!src) return '';
    try { return ['http:','https:','file:'].includes(new URL(src,location.href).protocol) ? src : ''; } catch { return ''; }
  }
  function audio(label,src,featured=false,track=false) {
    const url=safeSource(src);
    return `<div class="audio-slot ${featured?'featured-audio':''}"><div class="audio-header"><strong>${escape(label)}</strong>${url?'<span class="audio-status" role="status"></span>':''}</div>${url?`<audio controls preload="none" aria-label="${escape(label)}" ${track?'data-track="true"':''}><source src="${escape(url)}"></audio>`:`<div class="empty-audio"><span class="empty-play" aria-hidden="true">▶</span><span>Audio forthcoming</span></div>`}</div>`;
  }
  function scripts(segments) {
    return `<div class="script-grid">${segments.map((s,i)=>`<article class="script-card ${escape(s.tone)}" data-segment="${i}"><span class="segment-number">Segment ${i+1}</span><h3>${escape(s.style)}</h3><p>${escape(s.text)}</p><span class="segment-detail">${escape(s.instruction)}</span></article>`).join('')}</div>`;
  }
  function system(label,src,note,featured=false) {
    return `<div>${audio(label,src,featured,featured)}<p class="system-note">${escape(note)}</p></div>`;
  }
  function sampleHTML(type,d,lang) {
    samples.set(d.id,d);
    let body='';
    if(type==='voice') {
      body=`<div class="voice-brief"><div><span class="field-label">Edit instruction · descriptive</span><p class="request-text">“${escape(d.edit)}”</p><div class="edit-tags">${d.tags.map(t=>`<span>${escape(t)}</span>`).join('')}</div></div><div class="transcript"><span class="field-label">Synthesis text · illustrative</span><p>${escape(d.text)}</p></div></div><div class="reference-strip">${audio('Source reference',d.audio.source)}${audio('Target reference · evaluation only',d.audio.target)}</div><div class="comparison-label"><span>System comparison</span><span>Same source, text and edit request</span></div><div class="system-comparison">${system('Qwen3-TTS-VD',d.audio.baseline,'VoiceDesign instruction baseline')}${system('Qwen3-TTS-Base',d.audio.qwenBase,'Base-model instruction baseline')}${system('CosyVoice 2',d.audio.cosy,'Alternative TTS backbone')}${system('EDICT',d.audio.edict,'Reference-conditioned timbre editor',true)}</div><p class="case-listen"><strong>Evaluation focus.</strong> ${escape(d.listen)}</p>`;
    } else {
      const joint=type==='joint';
      body=`${joint?`<div class="sample-edit"><span class="field-label">Global edit instruction</span><p>“${escape(d.edit)}”</p><div class="edit-tags">${d.tags.map(t=>`<span>${escape(t)}</span>`).join('')}</div></div>`:''}<div class="reference-strip ${joint?'':'single-reference'}">${audio(joint?'Source reference':'Shared source reference',d.audio.source)}${joint?audio('Edited reference · shared anchor',d.audio.reference):'<p>All four methods receive the same voice reference, text and ordered local instructions.</p>'}</div><div class="comparison-label"><span>Text and local instructions</span><span>${d.segments.length} segments · ${joint?'Shared edited voice':'Qwen-VD backbone'}</span></div>${scripts(d.segments)}<div class="comparison-label outputs-label"><span>Full-utterance comparison</span><span>Compare the instruction boundaries</span></div><div class="system-comparison">${joint?system('Qwen-VD · Joint',d.audio.joint,'Original reference + edit request; joint generation')+system('Qwen-VD · Concat.',d.audio.concat,'Original reference + edit request; independent segments')+system('Editor + concat.',d.audio.editorConcat,'Edited reference; independent segments')+system('Full EDICT',d.audio.edict,'Edited reference + cache reconstruction',true):system('Concat.',d.audio.concat,'Independent segment synthesis')+system('Joint',d.audio.joint,'Whole-utterance generation')+system('TED-TTS',d.audio.ted,'Segment conditions with cached acoustic history')+system('EDICT',d.audio.edict,'Cache reconstruction at instruction switches',true)}</div>`;
    }
    return `<article class="sample" data-sample="${escape(d.id)}" aria-label="${escape(d.title)}" lang="${lang==='zh'?'zh-CN':'en'}">${body}</article>`;
  }
  function render(type) {
    const s=state[type],list=type==='joint'?data.joint[s.lang]:data[type][s.category][s.lang];
    const container=document.getElementById(type+'-content');
    container.querySelectorAll('audio').forEach(a=>a.pause());
    s.example=Math.min(s.example,list.length-1);
    const picker=container.closest('[data-demo]').querySelector('[data-example-picker]');
    picker.innerHTML=list.map((d,i)=>`<option value="${i}" ${i===s.example?'selected':''}>${String(i+1).padStart(2,'0')} · ${escape(d.title)}</option>`).join('');
    picker.lang=s.lang==='zh'?'zh-CN':'en';
    container.innerHTML=sampleHTML(type,list[s.example],s.lang);
    bindAudio();
  }
  function bindAudio() {
    document.querySelectorAll('audio').forEach(a=>{
      if(a.dataset.bound)return;
      a.dataset.bound='true';
      a.addEventListener('play',()=>document.querySelectorAll('audio').forEach(other=>{
        if(other!==a){other.pause();other.closest('[data-sample]')?.querySelectorAll('.script-card.active').forEach(c=>c.classList.remove('active'));}
      }));
      const onError=()=>a.closest('.audio-slot').querySelector('.audio-status').textContent='Audio unavailable';
      a.addEventListener('error',onError);a.querySelector('source')?.addEventListener('error',onError);
      if(a.dataset.track){
        a.addEventListener('timeupdate',()=>{
          const sample=a.closest('[data-sample]'),d=samples.get(sample.dataset.sample);
          if(!d.boundaries?.length||!d.segments)return;
          let index=d.boundaries.findIndex(t=>a.currentTime<t);if(index<0)index=d.segments.length-1;
          sample.querySelectorAll('[data-segment]').forEach(c=>c.classList.toggle('active',Number(c.dataset.segment)===index));
        });
        a.addEventListener('ended',()=>a.closest('[data-sample]').querySelectorAll('.script-card.active').forEach(c=>c.classList.remove('active')));
      }
    });
  }
  document.querySelectorAll('[data-demo]').forEach(shell=>{
    shell.addEventListener('click',e=>{
      const button=e.target.closest('[data-language],[data-case]');if(!button)return;
      button.parentElement.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      const type=shell.dataset.demo;
      if(button.dataset.language)state[type].lang=button.dataset.language;
      if(button.dataset.case)state[type].category=button.dataset.case;
      state[type].example=0;
      render(type);
    });
    shell.addEventListener('change',e=>{
      if(!e.target.matches('[data-example-picker]'))return;
      const type=shell.dataset.demo;
      state[type].example=Number(e.target.value);
      render(type);
    });
  });
  for(const type of Object.keys(state))render(type);
  window.EDICT_UI={escape,render};
})();
