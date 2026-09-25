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
    },
    "attributes": {
      "label": "Attribute accuracy",
      "title": "Edit Accuracy and attribute preservation",
      "source": "attribute_editing_results.tex",
      "context": "500 TimbreEdit-Bench requests. Gemini compares the source and generated audio without the target recording.",
      "note": "Up/Down accuracy measures ordinal direction, not exact edit magnitude. Category accuracy measures requested categorical targets. Preservation evaluates attributes that should remain unchanged.",
      "takeaway": "EDICT has stronger requested-edit accuracy; Qwen-VD better preserves unmentioned attributes. These are separate evaluation criteria.",
      "variants": [
        {
          "id": "structured",
          "label": "Structured instructions",
          "columns": [
            "System / configuration",
            "Up accuracy (%) ↑",
            "Down accuracy (%) ↑",
            "Category accuracy (%) ↑",
            "Preservation (%) ↑"
          ],
          "rows": [
            [
              "Qwen3-TTS-VD",
              "67.0",
              "64.3",
              "53.2",
              "83.3"
            ],
            [
              "Qwen3-TTS-Base",
              "62.3",
              "54.5",
              "46.4",
              "45.7"
            ],
            [
              "CosyVoice 2",
              "68.1",
              "65.5",
              "57.7",
              "68.2"
            ],
            [
              "EDICT",
              "70.8",
              "80.6",
              "89.3",
              "66.7"
            ]
          ]
        },
        {
          "id": "descriptive",
          "label": "Descriptive instructions",
          "columns": [
            "System / configuration",
            "Up accuracy (%) ↑",
            "Down accuracy (%) ↑",
            "Category accuracy (%) ↑",
            "Preservation (%) ↑"
          ],
          "rows": [
            [
              "Qwen3-TTS-VD",
              "60.0",
              "63.0",
              "49.8",
              "85.0"
            ],
            [
              "Qwen3-TTS-Base",
              "66.0",
              "54.5",
              "50.0",
              "45.6"
            ],
            [
              "CosyVoice 2",
              "72.2",
              "73.3",
              "69.0",
              "66.2"
            ],
            [
              "EDICT",
              "77.9",
              "79.1",
              "91.7",
              "70.1"
            ]
          ]
        }
      ]
    },
    "cache": {
      "label": "Cache ablation",
      "title": "KV cache reconstruction ablation",
      "source": "kv_cache_ablation.tex",
      "context": "IntraTTS-Bench, Qwen-VD. Full EDICT retains the first S = 4 and most recent K = 5 acoustic positions. Persistent and truncated caches reuse old KV states.",
      "note": "The context ablations remove either initial or recent acoustic inputs. All variants otherwise use the same backbone. Higher control and continuity can coincide with higher recognition errors.",
      "takeaway": "Reconstruction outperforms simply retaining or truncating old states. Removing initial context weakens speaker consistency; removing recent context sharply reduces transition quality.",
      "variants": [
        {
          "id": "all",
          "label": "Qwen-VD · S = 4, K = 5",
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
              "Persistent KV cache",
              "54.25",
              "54.02",
              "68.00",
              "0.918",
              "3.9 / 0.8",
              "3.555",
              "3.953"
            ],
            [
              "Truncated KV cache",
              "58.05",
              "56.70",
              "64.94",
              "0.892",
              "4.4 / 1.1",
              "3.278",
              "3.905"
            ],
            [
              "EDICT (full)",
              "82.30",
              "83.60",
              "82.00",
              "0.915",
              "5.1 / 1.8",
              "3.631",
              "3.930"
            ],
            [
              "Without initial context",
              "89.29",
              "89.00",
              "79.99",
              "0.863",
              "4.3 / 1.4",
              "3.585",
              "3.896"
            ],
            [
              "Without recent context",
              "81.15",
              "82.26",
              "55.32",
              "0.875",
              "4.2 / 1.1",
              "3.548",
              "3.830"
            ]
          ]
        }
      ]
    },
    "training": {
      "label": "Editor training",
      "title": "Timbre-editor training ablation",
      "source": "timbre_editor_posttraining.tex",
      "context": "TimbreEdit-Bench. Post-training starts from the 1M-pair SFT checkpoint. M is the number of candidates per condition; GRPO denotes the offline, clipped-ratio variant used in this work.",
      "note": "GRPO target-only uses M = 16. SIM-T is reported with both WavLM and ERes2Net. Quality and recognition metrics are retained to show the post-training trade-offs.",
      "takeaway": "Offline target-only optimization achieves the highest target similarity among these configurations, while quality and recognition-error changes are mixed.",
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
            "ERes2Net SIM-T ↑"
          ],
          "rows": [
            [
              "SFT (0.5M)",
              "3.9 / 1.5",
              "3.689",
              "3.895",
              "0.736",
              "0.498"
            ],
            [
              "SFT (1M)",
              "4.1 / 0.9",
              "3.936",
              "3.896",
              "0.757",
              "0.561"
            ],
            [
              "DPO (M = 4)",
              "5.1 / 1.5",
              "3.885",
              "3.962",
              "0.761",
              "0.552"
            ],
            [
              "DPO (M = 16)",
              "4.5 / 1.7",
              "3.786",
              "3.867",
              "0.778",
              "0.626"
            ],
            [
              "GRPO target-only",
              "4.1 / 1.7",
              "3.830",
              "3.942",
              "0.819",
              "0.653"
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
            "ERes2Net SIM-T ↑"
          ],
          "rows": [
            [
              "SFT (0.5M)",
              "4.2 / 1.5",
              "3.708",
              "3.885",
              "0.698",
              "0.481"
            ],
            [
              "SFT (1M)",
              "3.9 / 0.9",
              "3.666",
              "3.913",
              "0.693",
              "0.556"
            ],
            [
              "DPO (M = 4)",
              "4.6 / 1.4",
              "3.768",
              "3.909",
              "0.711",
              "0.543"
            ],
            [
              "DPO (M = 16)",
              "4.1 / 1.6",
              "3.724",
              "3.906",
              "0.726",
              "0.634"
            ],
            [
              "GRPO target-only",
              "4.0 / 1.1",
              "3.816",
              "3.963",
              "0.793",
              "0.648"
            ]
          ]
        }
      ]
    },
    "medtts": {
      "label": "MED-TTS",
      "title": "Supplementary evaluation on MED-TTS",
      "source": "medtts_overall.tex",
      "context": "500 MED-TTS examples. Results are separated by language and use emotion2vec+ large classification accuracy as a complementary emotion measure.",
      "note": "Emo2v: emotion classification accuracy. SIM-I: inter-segment speaker similarity. TCD is reported in the manuscript’s 10⁻³ TCD scale; lower is better. OVRL denotes DNSMOS OVRL. Recognition error is CER for Chinese and WER for English.",
      "takeaway": "EDICT improves emotion accuracy over Joint and TED-TTS and has the lowest TCD in both languages. Concat. retains the highest emotion-classification accuracy.",
      "variants": [
        {
          "id": "zh",
          "label": "Chinese",
          "columns": [
            "System / configuration",
            "CER (%) ↓",
            "Emo2v (%) ↑",
            "SIM-I ↑",
            "TCD (10⁻³) ↓",
            "OVRL ↑",
            "UTMOS ↑"
          ],
          "rows": [
            [
              "Concat.",
              "1.74",
              "85.56",
              "0.589",
              "0.488",
              "3.665",
              "3.528"
            ],
            [
              "Joint",
              "1.57",
              "61.48",
              "0.856",
              "0.425",
              "3.692",
              "3.763"
            ],
            [
              "TED-TTS",
              "2.68",
              "76.32",
              "0.843",
              "0.449",
              "3.698",
              "3.698"
            ],
            [
              "EDICT",
              "2.47",
              "79.96",
              "0.838",
              "0.392",
              "3.679",
              "3.721"
            ]
          ]
        },
        {
          "id": "en",
          "label": "English",
          "columns": [
            "System / configuration",
            "WER (%) ↓",
            "Emo2v (%) ↑",
            "SIM-I ↑",
            "TCD (10⁻³) ↓",
            "OVRL ↑",
            "UTMOS ↑"
          ],
          "rows": [
            [
              "Concat.",
              "1.18",
              "88.33",
              "0.667",
              "0.467",
              "3.799",
              "3.550"
            ],
            [
              "Joint",
              "0.30",
              "59.47",
              "0.929",
              "0.487",
              "3.754",
              "4.040"
            ],
            [
              "TED-TTS",
              "0.69",
              "80.91",
              "0.919",
              "0.463",
              "3.676",
              "3.875"
            ],
            [
              "EDICT",
              "1.09",
              "85.81",
              "0.932",
              "0.357",
              "3.739",
              "3.863"
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
