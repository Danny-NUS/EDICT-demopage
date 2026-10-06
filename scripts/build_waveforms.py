"""Build lightweight waveform previews from the demo WAV files (standard library only)."""
from array import array
import json
from pathlib import Path
import sys
import wave

ROOT = Path(__file__).resolve().parents[1]
previews = {}
for path in sorted((ROOT / 'assets/audio').glob('*.wav')):
    with wave.open(str(path)) as audio:
        if audio.getsampwidth() != 2:
            raise ValueError(f'Expected 16-bit PCM: {path.name}')
        samples = array('h', audio.readframes(audio.getnframes()))
        if sys.byteorder != 'little':
            samples.byteswap()
    peaks = [max(map(abs, samples[i * len(samples) // 64:(i + 1) * len(samples) // 64]), default=0) for i in range(64)]
    scale = max(peaks) or 1
    previews[path.relative_to(ROOT).as_posix()] = [round(peak / scale, 3) for peak in peaks]
(ROOT / 'waveform-data.js').write_text('window.EDICT_WAVEFORMS = ' + json.dumps(previews, separators=(',', ':')) + ';\n')
print(f'Built {len(previews)} waveform previews from the existing audio.')
