/* Extracted from manuscript tables; regenerate with scripts/build_results.py. */
window.EDICT_RESEARCH = {
  "results": {
    "voice": {
      "label": "Timbre editing",
      "title": "TimbreEdit-Bench",
      "source": "timbre_editing_results.tex",
      "context": "Instruction-conditioned systems are compared under matched structured or descriptive requests. Target-reference voice conversion is evaluated separately on a same-text subset and receives target audio.",
      "note": "SIM-T and SIM-R compare output with the target and source voices. ΔSIM = SIM-T − SIM-R; source similarity is not ranked. CER/WER are Chinese character and English word error rates. UTMOS and DNSMOS are predicted quality scores.",
      "takeaway": "EDICT improves target similarity under both instruction forms and both speaker encoders. Target-reference systems operate with different input information.",
      "variants": [
        {
          "id": "structured",
          "label": "Structured instructions",
          "columns": [
            "System / configuration",
            "CER / WER (%) ↓",
            "UTMOS ↑",
            "DNSMOS ↑",
            "WavLM SIM-T ↑",
            "WavLM SIM-R",
            "WavLM ΔSIM ↑",
            "ERes2Net SIM-T ↑",
            "ERes2Net SIM-R",
            "ERes2Net ΔSIM ↑"
          ],
          "rows": [
            [
              "Qwen3-TTS-VD",
              "4.5 / 0.3",
              "3.861",
              "3.946",
              "0.701",
              "0.871",
              "-0.170",
              "0.450",
              "0.745",
              "-0.295"
            ],
            [
              "Qwen3-TTS-Base",
              "5.1 / 1.9",
              "3.742",
              "3.805",
              "0.632",
              "0.950",
              "-0.318",
              "0.431",
              "0.845",
              "-0.414"
            ],
            [
              "CosyVoice 2",
              "6.9 / 4.2",
              "3.941",
              "4.065",
              "0.646",
              "0.918",
              "-0.272",
              "0.396",
              "0.825",
              "-0.429"
            ],
            [
              "EDICT",
              "4.1 / 1.7",
              "3.830",
              "3.942",
              "0.819",
              "0.620",
              "0.199",
              "0.653",
              "0.442",
              "0.211"
            ]
          ]
        },
        {
          "id": "descriptive",
          "label": "Descriptive instructions",
          "columns": [
            "System / configuration",
            "CER / WER (%) ↓",
            "UTMOS ↑",
            "DNSMOS ↑",
            "WavLM SIM-T ↑",
            "WavLM SIM-R",
            "WavLM ΔSIM ↑",
            "ERes2Net SIM-T ↑",
            "ERes2Net SIM-R",
            "ERes2Net ΔSIM ↑"
          ],
          "rows": [
            [
              "Qwen3-TTS-VD",
              "3.0 / 0.3",
              "3.830",
              "3.965",
              "0.676",
              "0.832",
              "-0.156",
              "0.435",
              "0.714",
              "-0.279"
            ],
            [
              "Qwen3-TTS-Base",
              "3.3 / 1.1",
              "3.756",
              "3.776",
              "0.637",
              "0.950",
              "-0.313",
              "0.434",
              "0.849",
              "-0.415"
            ],
            [
              "CosyVoice 2",
              "7.9 / 2.5",
              "4.021",
              "4.104",
              "0.644",
              "0.937",
              "-0.293",
              "0.419",
              "0.854",
              "-0.435"
            ],
            [
              "EDICT",
              "4.0 / 1.1",
              "3.816",
              "3.963",
              "0.793",
              "0.598",
              "0.195",
              "0.648",
              "0.441",
              "0.207"
            ]
          ]
        },
        {
          "id": "target",
          "label": "Target-reference VC · separate subset",
          "columns": [
            "System / configuration",
            "CER / WER (%) ↓",
            "UTMOS ↑",
            "DNSMOS ↑",
            "WavLM SIM-T ↑",
            "WavLM SIM-R",
            "WavLM ΔSIM ↑",
            "ERes2Net SIM-T ↑",
            "ERes2Net SIM-R",
            "ERes2Net ΔSIM ↑"
          ],
          "rows": [
            [
              "FreeVC",
              "3.2 / 2.0",
              "3.911",
              "3.968",
              "0.873",
              "0.671",
              "0.202",
              "0.570",
              "0.387",
              "0.183"
            ],
            [
              "Seed-VC",
              "3.0 / 2.5",
              "3.342",
              "3.893",
              "0.957",
              "0.659",
              "0.298",
              "0.889",
              "0.463",
              "0.427"
            ]
          ]
        }
      ]
    },
    "local": {
      "label": "Local control",
      "title": "IntraTTS-Bench",
      "source": "intratts_results.tex",
      "context": "All four methods within a backbone use the same TTS model. TED-TTS denotes the segment-aware adaptation evaluated in the paper.",
      "note": "SegAcc: segment instruction adherence. EmoAcc: requested emotion realization. Trans: natural, speaker-consistent transitions. These are Gemini 3.1 Pro judgments, averaged per utterance. SIM-I measures inter-segment speaker similarity with WavLM.",
      "takeaway": "On both backbones, EDICT improves control and transition scores over TED-TTS. Concat. has the strongest isolated segment accuracy; Joint favors speaker consistency and intelligibility.",
      "variants": [
        {
          "id": "qwen",
          "label": "Qwen-VD backbone",
          "columns": [
            "System / configuration",
            "SegAcc (%) ↑",
            "EmoAcc (%) ↑",
            "Trans (%) ↑",
            "SIM-I ↑",
            "CER / WER (%) ↓",
            "UTMOS ↑",
            "DNSMOS ↑"
          ],
          "rows": [
            [
              "Concat.",
              "92.44",
              "92.66",
              "60.68",
              "0.658",
              "4.5 / 0.9",
              "3.266",
              "3.939"
            ],
            [
              "Joint",
              "66.80",
              "66.37",
              "70.66",
              "0.922",
              "3.8 / 1.3",
              "3.794",
              "3.952"
            ],
            [
              "TED-TTS",
              "74.25",
              "74.02",
              "78.03",
              "0.911",
              "4.5 / 1.7",
              "3.655",
              "3.853"
            ],
            [
              "EDICT",
              "82.30",
              "83.60",
              "82.00",
              "0.915",
              "5.1 / 1.8",
              "3.631",
              "3.930"
            ]
          ]
        },
        {
          "id": "cosy",
          "label": "CosyVoice 2 backbone",
          "columns": [
            "System / configuration",
            "SegAcc (%) ↑",
            "EmoAcc (%) ↑",
            "Trans (%) ↑",
            "SIM-I ↑",
            "CER / WER (%) ↓",
            "UTMOS ↑",
            "DNSMOS ↑"
          ],
          "rows": [
            [
              "Concat.",
              "62.43",
              "62.73",
              "31.80",
              "0.917",
              "6.5 / 3.6",
              "3.916",
              "3.866"
            ],
            [
              "Joint",
              "49.68",
              "50.19",
              "69.71",
              "0.939",
              "5.4 / 3.1",
              "3.877",
              "3.897"
            ],
            [
              "TED-TTS",
              "58.10",
              "58.00",
              "63.94",
              "0.920",
              "7.5 / 4.6",
              "4.021",
              "3.828"
            ],
            [
              "EDICT",
              "60.56",
              "60.10",
              "76.20",
              "0.924",
              "8.1 / 5.5",
              "3.978",
              "3.844"
            ]
          ]
        }
      ]
    },
    "joint": {
      "label": "Joint control",
      "title": "Joint timbre and delivery control",
      "source": "joint_control_results.tex",
      "context": "Qwen-VD backbone. Joint and Concat. receive the original reference and global edit request. Editor + concat. and Full EDICT share the same edited reference.",
      "note": "SIM-T compares the complete utterance with the target voice. Target audio is used only for evaluation. SIM-I measures speaker consistency across segments; CER/WER report content errors.",
      "takeaway": "The editor improves target matching; reconstruction improves continuity. Full EDICT has the highest transition score and target similarity, with lower segment accuracy than independent synthesis.",
      "variants": [
        {
          "id": "all",
          "label": "Qwen-VD backbone",
          "columns": [
            "System / configuration",
            "SegAcc (%) ↑",
            "Trans (%) ↑",
            "CER / WER (%) ↓",
            "UTMOS ↑",
            "DNSMOS ↑",
            "SIM-I ↑",
            "WavLM SIM-T ↑",
            "ERes2Net SIM-T ↑"
          ],
          "rows": [
            [
              "Qwen-VD · Joint",
              "60.19",
              "70.07",
              "3.6 / 1.2",
              "3.339",
              "3.869",
              "0.918",
              "0.683",
              "0.395"
            ],
            [
              "Qwen-VD · Concat.",
              "86.43",
              "56.69",
              "4.5 / 0.8",
              "3.669",
              "3.895",
              "0.884",
              "0.694",
              "0.405"
            ],
            [
              "Editor + concat.",
              "91.17",
              "58.47",
              "4.8 / 1.1",
              "3.296",
              "3.739",
              "0.881",
              "0.749",
              "0.598"
            ],
            [
              "Full EDICT",
              "81.62",
              "83.45",
              "5.1 / 1.9",
              "3.795",
              "3.921",
              "0.917",
              "0.788",
              "0.609"
            ]
          ]
        }
      ]
    }
  },
  "mos": [
    {
      "task": "timbre",
      "system": "Qwen3-TTS-VD",
      "metric": "N-MOS",
      "mean": 4.07,
      "interval_half_width": 0.1
    },
    {
      "task": "timbre",
      "system": "Qwen3-TTS-VD",
      "metric": "Edit-MOS",
      "mean": 2.99,
      "interval_half_width": 0.11
    },
    {
      "task": "timbre",
      "system": "Qwen3-TTS-VD",
      "metric": "S-MOS",
      "mean": 2.5,
      "interval_half_width": 0.06
    },
    {
      "task": "timbre",
      "system": "Qwen3-TTS-Base",
      "metric": "N-MOS",
      "mean": 3.94,
      "interval_half_width": 0.11
    },
    {
      "task": "timbre",
      "system": "Qwen3-TTS-Base",
      "metric": "Edit-MOS",
      "mean": 2.01,
      "interval_half_width": 0.1
    },
    {
      "task": "timbre",
      "system": "Qwen3-TTS-Base",
      "metric": "S-MOS",
      "mean": 2.05,
      "interval_half_width": 0.06
    },
    {
      "task": "timbre",
      "system": "CosyVoice 2",
      "metric": "N-MOS",
      "mean": 3.76,
      "interval_half_width": 0.07
    },
    {
      "task": "timbre",
      "system": "CosyVoice 2",
      "metric": "Edit-MOS",
      "mean": 1.88,
      "interval_half_width": 0.09
    },
    {
      "task": "timbre",
      "system": "CosyVoice 2",
      "metric": "S-MOS",
      "mean": 1.56,
      "interval_half_width": 0.11
    },
    {
      "task": "timbre",
      "system": "EDICT",
      "metric": "N-MOS",
      "mean": 4.02,
      "interval_half_width": 0.09
    },
    {
      "task": "timbre",
      "system": "EDICT",
      "metric": "Edit-MOS",
      "mean": 3.94,
      "interval_half_width": 0.1
    },
    {
      "task": "timbre",
      "system": "EDICT",
      "metric": "S-MOS",
      "mean": 3.57,
      "interval_half_width": 0.1
    },
    {
      "task": "timbre",
      "system": "Seed-VC",
      "metric": "N-MOS",
      "mean": 3.58,
      "interval_half_width": 0.09
    },
    {
      "task": "timbre",
      "system": "Seed-VC",
      "metric": "Edit-MOS",
      "mean": null,
      "interval_half_width": null
    },
    {
      "task": "timbre",
      "system": "Seed-VC",
      "metric": "S-MOS",
      "mean": 4.03,
      "interval_half_width": 0.11
    },
    {
      "task": "intra",
      "system": "Concat.",
      "metric": "N-MOS",
      "mean": 3.96,
      "interval_half_width": 0.1
    },
    {
      "task": "intra",
      "system": "Concat.",
      "metric": "Instr-MOS",
      "mean": 4.24,
      "interval_half_width": 0.08
    },
    {
      "task": "intra",
      "system": "Concat.",
      "metric": "Trans-MOS",
      "mean": 2.08,
      "interval_half_width": 0.08
    },
    {
      "task": "intra",
      "system": "Joint",
      "metric": "N-MOS",
      "mean": 4.08,
      "interval_half_width": 0.07
    },
    {
      "task": "intra",
      "system": "Joint",
      "metric": "Instr-MOS",
      "mean": 2.5,
      "interval_half_width": 0.07
    },
    {
      "task": "intra",
      "system": "Joint",
      "metric": "Trans-MOS",
      "mean": 4.1,
      "interval_half_width": 0.09
    },
    {
      "task": "intra",
      "system": "TED-TTS adaptation",
      "metric": "N-MOS",
      "mean": 3.84,
      "interval_half_width": 0.08
    },
    {
      "task": "intra",
      "system": "TED-TTS adaptation",
      "metric": "Instr-MOS",
      "mean": 3.82,
      "interval_half_width": 0.08
    },
    {
      "task": "intra",
      "system": "TED-TTS adaptation",
      "metric": "Trans-MOS",
      "mean": 3.94,
      "interval_half_width": 0.11
    },
    {
      "task": "intra",
      "system": "EDICT",
      "metric": "N-MOS",
      "mean": 4.02,
      "interval_half_width": 0.09
    },
    {
      "task": "intra",
      "system": "EDICT",
      "metric": "Instr-MOS",
      "mean": 4.08,
      "interval_half_width": 0.11
    },
    {
      "task": "intra",
      "system": "EDICT",
      "metric": "Trans-MOS",
      "mean": 4.11,
      "interval_half_width": 0.07
    }
  ]
};
