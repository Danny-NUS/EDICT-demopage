/* Selected qualitative examples. PCM audio preserved; display wording maintained separately. */
window.EDICT_DEMOS = {
  "joint": {
    "en": [
      {
        "id": "joint_en_01",
        "title": "Sadness → hope",
        "text": "The rain kept falling, mirroring the tears in my heart. But then I saw a rainbow breaking through the clouds!",
        "tags": [
          "Perceived gender & breathiness",
          "Synthesis reference",
          "Two expressions"
        ],
        "listen": "Compare the voice with the synthesis reference and listen for the shift from sadness to hope at “But then”.",
        "audio": {
          "source": "assets/audio/joint_en_01_source_reference.wav",
          "target": "assets/audio/joint_en_01_synthesis_reference.wav",
          "edict": "assets/audio/joint_en_01_edict.wav"
        },
        "durations": {
          "source": 7.52,
          "target": 5.36,
          "edict": 7.04
        },
        "segments": [
          {
            "text": "The rain kept falling, mirroring the tears in my heart.",
            "instruction": "Speak with sadness and grief.",
            "style": "Sad & grieving"
          },
          {
            "text": "But then I saw a rainbow breaking through the clouds!",
            "instruction": "Suddenly become hopeful and uplifting!",
            "style": "Hopeful & uplifting"
          }
        ],
        "boundaries": [
          4.0,
          7.04
        ],
        "edit": "Turn this voice into a noticeably breathy female persona, shifting away from the original male's deep chest resonance to adopt a shallow head resonance, and increasing the initially slight breathiness to a noticeable level.",
        "referenceMode": "supplied-target"
      },
      {
        "id": "joint_en_02",
        "title": "Nervous whisper → panic → relief",
        "text": "Don't move. I can hear it getting closer, the footsteps echoing through the empty hallway, the lights flickering on and off, and there's something scratching at the door! Just the wind.",
        "tags": [
          "Perceived gender & resonance",
          "Synthesis reference",
          "Three expressions"
        ],
        "listen": "Listen for a nervous whisper, rising panic through the longer middle segment, and relief on “Just the wind”, while comparing the voice with the synthesis reference.",
        "audio": {
          "source": "assets/audio/joint_en_02_source_reference.wav",
          "target": "assets/audio/joint_en_02_synthesis_reference.wav",
          "edict": "assets/audio/joint_en_02_edict.wav"
        },
        "durations": {
          "source": 6.16,
          "target": 4.72,
          "edict": 9.76
        },
        "segments": [
          {
            "text": "Don't move.",
            "instruction": "Whisper nervously.",
            "style": "Nervous whisper"
          },
          {
            "text": "I can hear it getting closer, the footsteps echoing through the empty hallway, the lights flickering on and off, and there's something scratching at the door!",
            "instruction": "Speak with rising panic and fear!",
            "style": "Rising panic"
          },
          {
            "text": "Just the wind.",
            "instruction": "Breathe a sigh of relief.",
            "style": "Relief"
          }
        ],
        "boundaries": [
          0.96,
          8.56,
          9.76
        ],
        "edit": "Turn this voice into a young girl's voice that features a dark, mid-pitched tone, shallow head resonance, a moderate texture, and a slightly breathy quality.",
        "referenceMode": "supplied-target"
      },
      {
        "id": "joint_en_03",
        "title": "A game in four expressions",
        "text": "And here we are, the final minute of the championship game, tied at ninety-eight. He drives to the left, crosses over, spins back to the right, the defender loses his footing! HE SHOOTS! HE SCORES! BUZZER BEATER! UNBELIEVABLE! What a moment. What a game.",
        "tags": [
          "Perceived gender & pitch",
          "Synthesis reference",
          "Four expressions"
        ],
        "listen": "Follow the buildup from calm anticipation to the scoring moment and the quiet closing, while comparing the voice with the synthesis reference.",
        "audio": {
          "source": "assets/audio/joint_en_03_source_reference.wav",
          "target": "assets/audio/joint_en_03_synthesis_reference.wav",
          "edict": "assets/audio/joint_en_03_edict.wav"
        },
        "durations": {
          "source": 4.72,
          "target": 3.76,
          "edict": 17.36
        },
        "segments": [
          {
            "text": "And here we are, the final minute of the championship game, tied at ninety-eight.",
            "instruction": "Speak with calm anticipation.",
            "style": "Calm anticipation"
          },
          {
            "text": "He drives to the left, crosses over, spins back to the right, the defender loses his footing!",
            "instruction": "Speak faster with building tension!",
            "style": "Building tension"
          },
          {
            "text": "HE SHOOTS! HE SCORES! BUZZER BEATER! UNBELIEVABLE!",
            "instruction": "Explode with excitement!",
            "style": "Explosive excitement"
          },
          {
            "text": "What a moment. What a game.",
            "instruction": "Speak with quiet reverence.",
            "style": "Quiet reverence"
          }
        ],
        "boundaries": [
          5.12,
          10.64,
          15.04,
          17.36
        ],
        "edit": "Turn this voice into a young adult female speaking with a high pitch, moderate brightness, moderate roughness, and just slight nasality.",
        "referenceMode": "supplied-target"
      }
    ],
    "zh": [
      {
        "id": "joint_zh_01",
        "title": "成熟男声 · 伤感 → 兴奋",
        "text": "今天的天空灰蒙蒙的，心里也跟着沉重起来。但是！刚刚收到录取通知书了！太开心了！",
        "tags": [
          "Male voice",
          "Synthesis reference",
          "Two expressions"
        ],
        "listen": "Compare the voice with the synthesis reference and listen for the shift from sadness to excitement at “但是”.",
        "audio": {
          "source": "assets/audio/joint_zh_01_source_reference.wav",
          "target": "assets/audio/joint_zh_01_synthesis_reference.wav",
          "edict": "assets/audio/joint_zh_01_edict.wav"
        },
        "durations": {
          "source": 5.68,
          "target": 2.8,
          "edict": 9.6
        },
        "segments": [
          {
            "text": "今天的天空灰蒙蒙的，心里也跟着沉重起来。",
            "instruction": "用伤感的语气说话。",
            "style": "伤感"
          },
          {
            "text": "但是！刚刚收到录取通知书了！太开心了！",
            "instruction": "突然变得开心和兴奋！",
            "style": "开心 · 兴奋"
          }
        ],
        "boundaries": [
          5.28,
          9.6
        ],
        "edit": "把这条声音转变成成熟年长男性的嗓音，音域降至中等，整体音色变得暗沉且轻薄纤细，并将明显的鼻音减弱为轻微。",
        "referenceMode": "supplied-target",
        "instructionDisplay": "concise"
      },
      {
        "id": "joint_zh_02",
        "title": "成熟女声 · 克制 → 愤怒",
        "text": "今天的会议一切正常，大家都很配合。但是后来他居然当众否定了我所有的方案！",
        "tags": [
          "Female voice",
          "Synthesis reference",
          "Two expressions"
        ],
        "listen": "Compare the voice with the synthesis reference and listen for the change from restrained narration to anger at “但是后来”.",
        "audio": {
          "source": "assets/audio/joint_zh_02_source_reference.wav",
          "target": "assets/audio/joint_zh_02_synthesis_reference.wav",
          "edict": "assets/audio/joint_zh_02_edict.wav"
        },
        "durations": {
          "source": 7.12,
          "target": 7.84,
          "edict": 7.52
        },
        "segments": [
          {
            "text": "今天的会议一切正常，大家都很配合。",
            "instruction": "平静地叙述。",
            "style": "平静"
          },
          {
            "text": "但是后来他居然当众否定了我所有的方案！",
            "instruction": "变得非常愤怒！",
            "style": "愤怒"
          }
        ],
        "boundaries": [
          4.0,
          7.52
        ],
        "edit": "把这条声音改成成熟年长女性的嗓音，音调提至高音域，共鸣调至均衡，声音质地变得适中，同时带上轻微气声，并将鼻音减弱到轻微程度。",
        "referenceMode": "supplied-target",
        "instructionDisplay": "concise"
      },
      {
        "id": "joint_zh_03",
        "title": "成熟女声 · 低沉 → 紧张 → 释然",
        "text": "夜深了。走廊尽头传来一阵急促的脚步声，越来越近，越来越近，我屏住呼吸不敢出声，手心全是冷汗！原来是猫。",
        "tags": [
          "Female voice",
          "Synthesis reference",
          "Three expressions"
        ],
        "listen": "Compare the voice with the synthesis reference and follow the shift from a subdued opening to rising fear and relief at “原来是猫”.",
        "audio": {
          "source": "assets/audio/joint_zh_03_source_reference.wav",
          "target": "assets/audio/joint_zh_03_synthesis_reference.wav",
          "edict": "assets/audio/joint_zh_03_edict.wav"
        },
        "durations": {
          "source": 7.92,
          "target": 1.26,
          "edict": 11.52
        },
        "segments": [
          {
            "text": "夜深了。",
            "instruction": "用低沉神秘的语气。",
            "style": "神秘 · 低沉"
          },
          {
            "text": "走廊尽头传来一阵急促的脚步声，越来越近，越来越近，我屏住呼吸不敢出声，手心全是冷汗！",
            "instruction": "用紧张悬疑的语气，语速加快！",
            "style": "紧张 · 加速"
          },
          {
            "text": "原来是猫。",
            "instruction": "用如释重负的语气，慢慢放松。",
            "style": "释然 · 放松"
          }
        ],
        "boundaries": [
          1.68,
          9.84,
          11.52
        ],
        "edit": "把这条原音变成那种暗沉且厚薄适中的成熟女声，共鸣往下走变成偏胸腔深共鸣，音质带点粗糙沙哑感，同时加上轻微气声和明显鼻音。",
        "referenceMode": "supplied-target",
        "instructionDisplay": "concise"
      }
    ]
  },
  "voice": {
    "en": [
      {
        "id": "timbre_en_01",
        "title": "Vocal weight and resonance",
        "text": "The meeting materials are in the shared folder and can be downloaded as needed. This is material group 434.",
        "tags": [
          "Perceived gender",
          "Vocal weight",
          "Resonance"
        ],
        "listen": "How closely each output follows the edit instruction.",
        "audio": {
          "source": "assets/audio/timbre_en_01_source_reference.wav",
          "target": "assets/audio/timbre_en_01_target_reference.wav",
          "edict": "assets/audio/timbre_en_01_edict.wav",
          "qwen_vd": "assets/audio/timbre_en_01_qwen3_tts_vd.wav",
          "qwen_base": "assets/audio/timbre_en_01_qwen3_tts_base.wav",
          "cosyvoice2": "assets/audio/timbre_en_01_cosyvoice2.wav"
        },
        "durations": {
          "source": 8.88,
          "target": 7.76,
          "edict": 8.37125,
          "qwen_vd": 8.72,
          "qwen_base": 6.488542,
          "cosyvoice2": 7.52
        },
        "edit": "Turn this male voice into a female one, thickening its medium build into a full, thick sound and shifting its deep chest resonance into a shallower head resonance."
      },
      {
        "id": "timbre_en_02",
        "title": "Higher pitch, breathiness and nasality",
        "text": "This guide explains the routine maintenance steps and important notes for the device.",
        "tags": [
          "Perceived gender",
          "Pitch & texture",
          "Breathiness & nasality"
        ],
        "listen": "How closely each output follows the edit instruction.",
        "audio": {
          "source": "assets/audio/timbre_en_02_source_reference.wav",
          "target": "assets/audio/timbre_en_02_target_reference.wav",
          "edict": "assets/audio/timbre_en_02_edict.wav",
          "qwen_vd": "assets/audio/timbre_en_02_qwen3_tts_vd.wav",
          "qwen_base": "assets/audio/timbre_en_02_qwen3_tts_base.wav",
          "cosyvoice2": "assets/audio/timbre_en_02_cosyvoice2.wav"
        },
        "durations": {
          "source": 6.72,
          "target": 4.88,
          "edict": 4.550167,
          "qwen_vd": 5.920042,
          "qwen_base": 4.88,
          "cosyvoice2": 4.96
        },
        "edit": "Transform this male audio into a female's voice by raising the mid-range pitch to a high pitch, reducing the thick, hoarse texture to a moderate thickness and moderate roughness, and replacing the clear, slightly nasal tone with obvious breathiness and obvious nasality."
      }
    ],
    "zh": [
      {
        "id": "timbre_zh_01",
        "title": "音色转换与质感调整",
        "text": "这份说明主要介绍设备的日常维护步骤和注意事项。这是第602组材料。",
        "tags": [
          "Perceived gender",
          "Brightness & weight",
          "Roughness & nasality"
        ],
        "listen": "How closely each output follows the edit instruction.",
        "audio": {
          "source": "assets/audio/timbre_zh_01_source_reference.wav",
          "target": "assets/audio/timbre_zh_01_target_reference.wav",
          "edict": "assets/audio/timbre_zh_01_edict.wav",
          "qwen_vd": "assets/audio/timbre_zh_01_qwen3_tts_vd.wav",
          "qwen_base": "assets/audio/timbre_zh_01_qwen3_tts_base.wav",
          "cosyvoice2": "assets/audio/timbre_zh_01_cosyvoice2.wav"
        },
        "durations": {
          "source": 8.16,
          "target": 6.56,
          "edict": 6.59125,
          "qwen_vd": 7.6,
          "qwen_base": 5.52,
          "cosyvoice2": 20.8
        },
        "edit": "把这条明亮且厚重饱满的男声改成女声，让音色变得明暗适中、厚薄适中，把原本适中的质地变得粗糙沙哑，并从无鼻音转为轻微鼻音。"
      },
      {
        "id": "timbre_zh_02",
        "title": "成人声线与沙哑质感",
        "text": "如果路面比较湿滑，请放慢脚步并注意观察周围情况。",
        "tags": [
          "Age impression",
          "Pitch & roughness",
          "Clear oral tone"
        ],
        "listen": "How closely each output follows the edit instruction.",
        "audio": {
          "source": "assets/audio/timbre_zh_02_source_reference.wav",
          "target": "assets/audio/timbre_zh_02_target_reference.wav",
          "edict": "assets/audio/timbre_zh_02_edict.wav",
          "qwen_vd": "assets/audio/timbre_zh_02_qwen3_tts_vd.wav",
          "qwen_base": "assets/audio/timbre_zh_02_qwen3_tts_base.wav",
          "cosyvoice2": "assets/audio/timbre_zh_02_cosyvoice2.wav"
        },
        "durations": {
          "source": 6.32,
          "target": 5.52,
          "edict": 7.618042,
          "qwen_vd": 5.04,
          "qwen_base": 9.28,
          "cosyvoice2": 12.48
        },
        "edit": "请把这条高音域、质地适中且带轻微气声和轻微鼻音的儿童少年音，转变成低沉音域的成人声线，发声要口腔化无鼻音、清澈无气声，并带有粗糙沙哑的质感。"
      }
    ]
  },
  "delivery": {
    "en": [
      {
        "id": "local_en_01",
        "title": "Calm narration → urgent warning",
        "text": "The weather is quite pleasant today, nothing unusual. Wait, there's a tornado warning! Everyone take cover now!",
        "tags": [],
        "listen": "Listen to the change at “Wait”: the pace and urgency should increase while the voice remains connected.",
        "audio": {
          "edict": "assets/audio/local_en_01_edict.wav",
          "joint": "assets/audio/local_en_01_joint.wav",
          "concat": "assets/audio/local_en_01_concat.wav",
          "ted_tts": "assets/audio/local_en_01_ted_tts.wav"
        },
        "durations": {
          "edict": 6.64,
          "joint": 8.72,
          "concat": 8.72,
          "ted_tts": 8.16
        },
        "segments": [
          {
            "text": "The weather is quite pleasant today, nothing unusual.",
            "instruction": "Speak calmly and slowly.",
            "style": "Calm & slow"
          },
          {
            "text": "Wait, there's a tornado warning! Everyone take cover now!",
            "instruction": "Switch to an urgent, fast-paced tone!",
            "style": "Urgent & fast"
          }
        ],
        "boundaries": [],
        "globalInstruction": "Speak in a middle-aged man's voice."
      },
      {
        "id": "local_en_02",
        "title": "Sadness → hope",
        "text": "The rain kept falling, mirroring the tears in my heart. But then I saw a rainbow breaking through the clouds!",
        "tags": [],
        "listen": "Listen for the shift from sadness to hope at “But then” and whether the voice remains consistent across the change.",
        "audio": {
          "edict": "assets/audio/local_en_02_edict.wav",
          "joint": "assets/audio/local_en_02_joint.wav",
          "concat": "assets/audio/local_en_02_concat.wav",
          "ted_tts": "assets/audio/local_en_02_ted_tts.wav"
        },
        "durations": {
          "edict": 7.52,
          "joint": 7.68,
          "concat": 7.44,
          "ted_tts": 7.28
        },
        "segments": [
          {
            "text": "The rain kept falling, mirroring the tears in my heart.",
            "instruction": "Speak with sadness and grief.",
            "style": "Sad & grieving"
          },
          {
            "text": "But then I saw a rainbow breaking through the clouds!",
            "instruction": "Suddenly become hopeful and uplifting!",
            "style": "Hopeful & uplifting"
          }
        ],
        "boundaries": [],
        "globalInstruction": "Speak in a young woman's voice."
      }
    ],
    "zh": [
      {
        "id": "local_zh_01",
        "title": "神秘 → 紧张 → 释然",
        "text": "夜深了。走廊尽头传来一阵急促的脚步声，越来越近，越来越近，我屏住呼吸不敢出声，手心全是冷汗！原来是猫。",
        "tags": [],
        "listen": "Listen for rising tension through the long middle segment and a relaxed return on “原来是猫”.",
        "audio": {
          "edict": "assets/audio/local_zh_01_edict.wav",
          "joint": "assets/audio/local_zh_01_joint.wav",
          "concat": "assets/audio/local_zh_01_concat.wav",
          "ted_tts": "assets/audio/local_zh_01_ted_tts.wav"
        },
        "durations": {
          "edict": 11.6,
          "joint": 12.4,
          "concat": 10.96,
          "ted_tts": 11.28
        },
        "segments": [
          {
            "text": "夜深了。",
            "instruction": "用低沉神秘的语气。",
            "style": "神秘 · 低沉"
          },
          {
            "text": "走廊尽头传来一阵急促的脚步声，越来越近，越来越近，我屏住呼吸不敢出声，手心全是冷汗！",
            "instruction": "用紧张悬疑的语气，语速加快！",
            "style": "紧张 · 加速"
          },
          {
            "text": "原来是猫。",
            "instruction": "用如释重负的语气，慢慢放松。",
            "style": "释然 · 放松"
          }
        ],
        "boundaries": [],
        "globalInstruction": "用一位沉稳的男性声音说话。"
      },
      {
        "id": "local_zh_02",
        "title": "平静叙述 → 愤怒表达",
        "text": "今天的会议一切正常，大家都很配合。但是后来他居然当众否定了我所有的方案！",
        "tags": [],
        "listen": "Listen for the emotional change on “但是后来” and whether the same voice is maintained across the switch.",
        "audio": {
          "edict": "assets/audio/local_zh_02_edict.wav",
          "joint": "assets/audio/local_zh_02_joint.wav",
          "concat": "assets/audio/local_zh_02_concat.wav",
          "ted_tts": "assets/audio/local_zh_02_ted_tts.wav"
        },
        "durations": {
          "edict": 8.72,
          "joint": 6.24,
          "concat": 7.84,
          "ted_tts": 8.48
        },
        "segments": [
          {
            "text": "今天的会议一切正常，大家都很配合。",
            "instruction": "平静地叙述。",
            "style": "平静"
          },
          {
            "text": "但是后来他居然当众否定了我所有的方案！",
            "instruction": "变得非常愤怒！",
            "style": "愤怒"
          }
        ],
        "boundaries": [],
        "globalInstruction": "用一位中年男性的声音说话。"
      }
    ]
  }
};
