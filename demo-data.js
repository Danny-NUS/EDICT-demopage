/* Proposed demo scripts. Audio remains intentionally empty until real examples are selected.
   Update each script, instruction and audio together. boundaries contains real segment end times in seconds. */
window.EDICT_DEMOS = {
  "joint": {
    "en": [
      {
        "title": "From quiet to wonder",
        "edit": "Make the voice brighter, keeping the other voice attributes unchanged.",
        "tags": [
          "Brightness ↑",
          "Shared voice anchor"
        ],
        "segments": [
          {
            "style": "Calm",
            "instruction": "Calm, steady narration",
            "text": "In a quiet village, the wind moved through the trees.",
            "tone": "calm"
          },
          {
            "style": "Excited",
            "instruction": "Excited, energetic emphasis",
            "text": "And suddenly, a bright light filled the sky!",
            "tone": "excited"
          },
          {
            "style": "Gentle",
            "instruction": "Soft, gentle ending",
            "text": "Then everything became still.",
            "tone": "gentle"
          }
        ],
        "audio": {
          "source": "",
          "reference": "",
          "edict": "",
          "joint": "",
          "concat": "",
          "editorConcat": ""
        },
        "boundaries": [],
        "id": "joint-en-01"
      },
      {
        "title": "A fuller voice across changing pace",
        "edit": "Lower the pitch register and increase vocal weight. Keep the other voice attributes unchanged.",
        "tags": [
          "Pitch register ↓",
          "Vocal weight ↑"
        ],
        "segments": [
          {
            "style": "Measured",
            "instruction": "Begin slowly and evenly",
            "text": "The train had stopped just beyond the bend.",
            "tone": "calm"
          },
          {
            "style": "Urgent",
            "instruction": "Speed up with urgent emphasis",
            "text": "We need to find the conductor and get everyone off this carriage!",
            "tone": "excited"
          },
          {
            "style": "Reassuring",
            "instruction": "Slow down with a reassuring tone",
            "text": "Take your time. We are all going to be fine.",
            "tone": "gentle"
          }
        ],
        "audio": {
          "source": "",
          "reference": "",
          "edict": "",
          "joint": "",
          "concat": "",
          "editorConcat": ""
        },
        "boundaries": [],
        "id": "joint-en-02"
      }
    ],
    "zh": [
      {
        "title": "从宁静到惊叹",
        "edit": "让声音更明亮，其他音色属性保持不变。",
        "tags": [
          "明亮度 ↑",
          "共享音色锚点"
        ],
        "segments": [
          {
            "style": "平静",
            "instruction": "平静、稳定地叙述",
            "text": "安静的村庄里，微风轻轻吹过树梢。",
            "tone": "calm"
          },
          {
            "style": "兴奋",
            "instruction": "兴奋、有活力地强调",
            "text": "突然，一道明亮的光照亮了整个天空！",
            "tone": "excited"
          },
          {
            "style": "轻柔",
            "instruction": "轻声、温柔地收尾",
            "text": "随后，一切又归于宁静。",
            "tone": "gentle"
          }
        ],
        "audio": {
          "source": "",
          "reference": "",
          "edict": "",
          "joint": "",
          "concat": "",
          "editorConcat": ""
        },
        "boundaries": [],
        "id": "joint-zh-01"
      },
      {
        "title": "低沉厚实的声音与变化的语速",
        "edit": "降低音高音区，增加声音厚度，其他音色属性保持不变。",
        "tags": [
          "音高音区 ↓",
          "声音厚度 ↑"
        ],
        "segments": [
          {
            "style": "平稳",
            "instruction": "缓慢、平稳地开始",
            "text": "列车停在了弯道外不远的地方。",
            "tone": "calm"
          },
          {
            "style": "急切",
            "instruction": "加快语速，急切地强调",
            "text": "我们得找到列车员，赶快让大家离开这节车厢！",
            "tone": "excited"
          },
          {
            "style": "安抚",
            "instruction": "放慢语速，用安抚的语气",
            "text": "别着急，慢慢来。我们都会没事的。",
            "tone": "gentle"
          }
        ],
        "audio": {
          "source": "",
          "reference": "",
          "edict": "",
          "joint": "",
          "concat": "",
          "editorConcat": ""
        },
        "boundaries": [],
        "id": "joint-zh-02"
      }
    ]
  },
  "voice": {
    "single": {
      "en": [
        {
          "title": "A brighter voice",
          "edit": "Make the voice brighter. Keep its other voice attributes unchanged.",
          "tags": [
            "Brightness ↑",
            "Other attributes: keep"
          ],
          "text": "Beyond the window, the city was waking up to a brand new day.",
          "listen": "Listen for a brighter voice quality, while checking whether the other voice characteristics stay consistent.",
          "audio": {
            "source": "",
            "baseline": "",
            "edict": "",
            "target": "",
            "qwenBase": "",
            "cosy": ""
          },
          "id": "voice-single-en-01"
        },
        {
          "title": "A smoother voice",
          "edit": "Reduce the roughness of the voice. Keep the other voice attributes unchanged.",
          "tags": [
            "Roughness ↓",
            "Other attributes: keep"
          ],
          "text": "The old bookshop stood at the end of a narrow, sunlit street.",
          "listen": "Compare roughness before and after editing, and listen for unintended changes in other voice qualities.",
          "audio": {
            "source": "",
            "baseline": "",
            "qwenBase": "",
            "cosy": "",
            "edict": "",
            "target": ""
          },
          "id": "voice-single-en-02"
        }
      ],
      "zh": [
        {
          "title": "更明亮的声音",
          "edit": "让声音更明亮，其他音色属性保持不变。",
          "tags": [
            "明亮度 ↑",
            "其他属性保持不变"
          ],
          "text": "窗外的城市正在慢慢苏醒，迎接崭新的一天。",
          "listen": "听声音是否更明亮，同时留意其他音色特征是否保持稳定。",
          "audio": {
            "source": "",
            "baseline": "",
            "edict": "",
            "target": "",
            "qwenBase": "",
            "cosy": ""
          },
          "id": "voice-single-zh-01"
        },
        {
          "title": "更平滑的声音",
          "edit": "减轻声音的粗糙感，其他音色属性保持不变。",
          "tags": [
            "粗糙度 ↓",
            "其他属性保持不变"
          ],
          "text": "那家老书店坐落在一条洒满阳光的狭窄街道尽头。",
          "listen": "对照粗糙感是否减轻，并注意其他声音特征是否发生了非预期变化。",
          "audio": {
            "source": "",
            "baseline": "",
            "qwenBase": "",
            "cosy": "",
            "edict": "",
            "target": ""
          },
          "id": "voice-single-zh-02"
        }
      ]
    },
    "composed": {
      "en": [
        {
          "title": "Lower and fuller",
          "edit": "Lower the pitch register and make the voice thicker. Keep the other voice attributes unchanged.",
          "tags": [
            "Pitch register ↓",
            "Vocal weight ↑"
          ],
          "text": "Beyond the window, the city was waking up to a brand new day.",
          "listen": "Listen for both requested changes: a lower pitch register and a fuller voice. Also compare the unedited attributes.",
          "audio": {
            "source": "",
            "baseline": "",
            "edict": "",
            "target": "",
            "qwenBase": "",
            "cosy": ""
          },
          "id": "voice-composed-en-01"
        },
        {
          "title": "Darker and breathier",
          "edit": "Make the voice darker and more breathy. Keep the other voice attributes unchanged.",
          "tags": [
            "Brightness ↓",
            "Breathiness ↑"
          ],
          "text": "The last light faded slowly over the water as we turned for home.",
          "listen": "Check both requested changes: darker timbre and greater breathiness. Compare unedited voice qualities as well.",
          "audio": {
            "source": "",
            "baseline": "",
            "qwenBase": "",
            "cosy": "",
            "edict": "",
            "target": ""
          },
          "id": "voice-composed-en-02"
        }
      ],
      "zh": [
        {
          "title": "更低沉、更厚实",
          "edit": "降低音高音区，让声音更厚实，其他音色属性保持不变。",
          "tags": [
            "音高音区 ↓",
            "声音厚度 ↑"
          ],
          "text": "窗外的城市正在慢慢苏醒，迎接崭新的一天。",
          "listen": "听音高音区是否降低、声音是否更厚实，同时比较未指定修改的音色属性。",
          "audio": {
            "source": "",
            "baseline": "",
            "edict": "",
            "target": "",
            "qwenBase": "",
            "cosy": ""
          },
          "id": "voice-composed-zh-01"
        },
        {
          "title": "更暗、更有气声",
          "edit": "降低声音明亮度，增加气声感，其他音色属性保持不变。",
          "tags": [
            "明亮度 ↓",
            "气声感 ↑"
          ],
          "text": "水面上的最后一缕亮光慢慢消失，我们转身踏上了归途。",
          "listen": "同时听明亮度降低与气声增强这两个变化，并比较未编辑的声音属性。",
          "audio": {
            "source": "",
            "baseline": "",
            "qwenBase": "",
            "cosy": "",
            "edict": "",
            "target": ""
          },
          "id": "voice-composed-zh-02"
        }
      ]
    },
    "category": {
      "en": [
        {
          "title": "A more mature impression",
          "edit": "Change the voice from a young-adult impression to a mature impression. Keep the other voice attributes unchanged.",
          "tags": [
            "Young adult → Mature",
            "Other attributes: keep"
          ],
          "text": "Beyond the window, the city was waking up to a brand new day.",
          "listen": "Listen for the perceived age change. Age impression describes a perceptual voice quality, rather than the speaker's actual age.",
          "audio": {
            "source": "",
            "baseline": "",
            "edict": "",
            "target": "",
            "qwenBase": "",
            "cosy": ""
          },
          "id": "voice-category-en-01"
        },
        {
          "title": "A younger adult impression",
          "edit": "Change the voice from a mature impression to a young-adult impression. Keep the other voice attributes unchanged.",
          "tags": [
            "Mature → Young adult",
            "Other attributes: keep"
          ],
          "text": "I still remember the first morning we spent in this little town.",
          "listen": "Compare perceived age in the reverse editing direction, separately from naturalness and speaker similarity.",
          "audio": {
            "source": "",
            "baseline": "",
            "qwenBase": "",
            "cosy": "",
            "edict": "",
            "target": ""
          },
          "id": "voice-category-en-02"
        }
      ],
      "zh": [
        {
          "title": "更成熟的声音印象",
          "edit": "将声音的年龄印象从青年改为成熟，其他音色属性保持不变。",
          "tags": [
            "青年 → 成熟",
            "其他属性保持不变"
          ],
          "text": "窗外的城市正在慢慢苏醒，迎接崭新的一天。",
          "listen": "听声音的感知年龄是否变化。这里的年龄印象指听感上的声音特征，并非说话人的真实年龄。",
          "audio": {
            "source": "",
            "baseline": "",
            "edict": "",
            "target": "",
            "qwenBase": "",
            "cosy": ""
          },
          "id": "voice-category-zh-01"
        },
        {
          "title": "更年轻的成人声音印象",
          "edit": "将声音的年龄印象从成熟改为青年，其他音色属性保持不变。",
          "tags": [
            "成熟 → 青年",
            "其他属性保持不变"
          ],
          "text": "我还记得我们在这座小城度过的第一个早晨。",
          "listen": "比较反向编辑后的年龄印象，并将它与自然度和说话人相似度分别判断。",
          "audio": {
            "source": "",
            "baseline": "",
            "qwenBase": "",
            "cosy": "",
            "edict": "",
            "target": ""
          },
          "id": "voice-category-zh-02"
        }
      ]
    }
  },
  "delivery": {
    "emotion": {
      "en": [
        {
          "title": "From concern to relief",
          "segments": [
            {
              "style": "Worried",
              "instruction": "Tense, worried delivery",
              "text": "I looked everywhere, but the little dog was nowhere to be found.",
              "tone": "calm"
            },
            {
              "style": "Joyful",
              "instruction": "Sudden joy and excitement",
              "text": "Wait, there he is, running straight towards us!",
              "tone": "excited"
            },
            {
              "style": "Relieved",
              "instruction": "Gentle, relieved ending",
              "text": "Come here, little one. You're finally home.",
              "tone": "gentle"
            }
          ],
          "audio": {
            "source": "",
            "concat": "",
            "joint": "",
            "ted": "",
            "edict": ""
          },
          "boundaries": [],
          "id": "delivery-emotion-en-01"
        },
        {
          "title": "Curiosity, surprise and reflection",
          "segments": [
            {
              "style": "Curious",
              "instruction": "Ask with gentle curiosity",
              "text": "I wonder what could be inside that little wooden box.",
              "tone": "calm"
            },
            {
              "style": "Surprised",
              "instruction": "React with clear surprise",
              "text": "It is the letter we thought we had lost years ago!",
              "tone": "excited"
            },
            {
              "style": "Reflective",
              "instruction": "Finish quietly and thoughtfully",
              "text": "Some things find their way back to us, after all.",
              "tone": "gentle"
            }
          ],
          "audio": {
            "source": "",
            "concat": "",
            "joint": "",
            "ted": "",
            "edict": ""
          },
          "boundaries": [],
          "id": "delivery-emotion-en-02"
        }
      ],
      "zh": [
        {
          "title": "从担忧到释然",
          "segments": [
            {
              "style": "担忧",
              "instruction": "紧张、担心的语气",
              "text": "我找遍了所有地方，还是没有看到那只小狗。",
              "tone": "calm"
            },
            {
              "style": "惊喜",
              "instruction": "突然转为开心和激动",
              "text": "等一下，它在那里，正朝我们跑过来呢！",
              "tone": "excited"
            },
            {
              "style": "释然",
              "instruction": "温柔、松了一口气",
              "text": "过来吧，小家伙。你终于回家了。",
              "tone": "gentle"
            }
          ],
          "audio": {
            "source": "",
            "concat": "",
            "joint": "",
            "ted": "",
            "edict": ""
          },
          "boundaries": [],
          "id": "delivery-emotion-zh-01"
        },
        {
          "title": "好奇、惊讶与沉思",
          "segments": [
            {
              "style": "好奇",
              "instruction": "带着轻柔的好奇心发问",
              "text": "我很好奇，那个小木盒里究竟藏着什么。",
              "tone": "calm"
            },
            {
              "style": "惊讶",
              "instruction": "表现出明显的惊讶",
              "text": "竟然是我们以为早就丢失的那封信！",
              "tone": "excited"
            },
            {
              "style": "沉思",
              "instruction": "安静、若有所思地结束",
              "text": "原来有些东西，终究还是会回到我们身边。",
              "tone": "gentle"
            }
          ],
          "audio": {
            "source": "",
            "concat": "",
            "joint": "",
            "ted": "",
            "edict": ""
          },
          "boundaries": [],
          "id": "delivery-emotion-zh-02"
        }
      ]
    },
    "pace": {
      "en": [
        {
          "title": "Slow, quick, then slow",
          "segments": [
            {
              "style": "Slow",
              "instruction": "Speak slowly and evenly",
              "text": "Take a moment. Look around, and breathe in the morning air.",
              "tone": "calm"
            },
            {
              "style": "Fast",
              "instruction": "Increase the speaking rate",
              "text": "Now grab your bag, find your keys, and hurry to the station!",
              "tone": "excited"
            },
            {
              "style": "Slow",
              "instruction": "Return to a slow pace",
              "text": "We made it. There is still a little time to spare.",
              "tone": "gentle"
            }
          ],
          "audio": {
            "source": "",
            "concat": "",
            "joint": "",
            "ted": "",
            "edict": ""
          },
          "boundaries": [],
          "id": "delivery-pace-en-01"
        },
        {
          "title": "Quick instructions, a slow detail, a quick finish",
          "segments": [
            {
              "style": "Fast",
              "instruction": "Speak quickly and clearly",
              "text": "Turn left, cross the bridge, and follow the road to the square.",
              "tone": "calm"
            },
            {
              "style": "Slow",
              "instruction": "Slow down noticeably",
              "text": "There, beneath the clock, you will see a small blue door.",
              "tone": "excited"
            },
            {
              "style": "Fast",
              "instruction": "Resume a fast speaking rate",
              "text": "Knock twice, leave the parcel, and come straight back!",
              "tone": "gentle"
            }
          ],
          "audio": {
            "source": "",
            "concat": "",
            "joint": "",
            "ted": "",
            "edict": ""
          },
          "boundaries": [],
          "id": "delivery-pace-en-02"
        }
      ],
      "zh": [
        {
          "title": "慢、快、再放慢",
          "segments": [
            {
              "style": "慢速",
              "instruction": "缓慢、平稳地说",
              "text": "先停一会儿，看看周围，呼吸清晨的空气。",
              "tone": "calm"
            },
            {
              "style": "快速",
              "instruction": "明显加快语速",
              "text": "现在拿上包，找到钥匙，赶快出发去车站！",
              "tone": "excited"
            },
            {
              "style": "放慢",
              "instruction": "恢复缓慢的语速",
              "text": "我们赶上了，还可以稍微休息一下。",
              "tone": "gentle"
            }
          ],
          "audio": {
            "source": "",
            "concat": "",
            "joint": "",
            "ted": "",
            "edict": ""
          },
          "boundaries": [],
          "id": "delivery-pace-zh-01"
        },
        {
          "title": "快速指引、慢速细节与快速收尾",
          "segments": [
            {
              "style": "快速",
              "instruction": "快速、清晰地说",
              "text": "左转，过桥，沿着这条路走到广场。",
              "tone": "calm"
            },
            {
              "style": "慢速",
              "instruction": "明显放慢语速",
              "text": "在那里，钟楼下面，有一扇小小的蓝色门。",
              "tone": "excited"
            },
            {
              "style": "快速",
              "instruction": "恢复快速语速",
              "text": "敲两下门，放下包裹，然后马上回来！",
              "tone": "gentle"
            }
          ],
          "audio": {
            "source": "",
            "concat": "",
            "joint": "",
            "ted": "",
            "edict": ""
          },
          "boundaries": [],
          "id": "delivery-pace-zh-02"
        }
      ]
    },
    "emphasis": {
      "en": [
        {
          "title": "A pause that changes the moment",
          "segments": [
            {
              "style": "Measured",
              "instruction": "Pause after the first clause",
              "text": "When the room fell silent, she opened the envelope.",
              "tone": "calm"
            },
            {
              "style": "Emphatic",
              "instruction": "Strongly emphasize 'you'",
              "text": "The person we have chosen is you!",
              "tone": "excited"
            },
            {
              "style": "Soft",
              "instruction": "Softer, with a brief pause",
              "text": "For a moment, nobody said a word.",
              "tone": "gentle"
            }
          ],
          "audio": {
            "source": "",
            "concat": "",
            "joint": "",
            "ted": "",
            "edict": ""
          },
          "boundaries": [],
          "id": "delivery-emphasis-en-01"
        },
        {
          "title": "Changing contrastive emphasis",
          "segments": [
            {
              "style": "Contrast",
              "instruction": "Emphasize today, rather than tomorrow",
              "text": "We need to finish this today, not tomorrow.",
              "tone": "calm"
            },
            {
              "style": "Pause",
              "instruction": "Pause after the word listen",
              "text": "Listen, there is one thing I want you to remember.",
              "tone": "excited"
            },
            {
              "style": "Emphasis",
              "instruction": "Emphasize together",
              "text": "Whatever happens next, we will face it together.",
              "tone": "gentle"
            }
          ],
          "audio": {
            "source": "",
            "concat": "",
            "joint": "",
            "ted": "",
            "edict": ""
          },
          "boundaries": [],
          "id": "delivery-emphasis-en-02"
        }
      ],
      "zh": [
        {
          "title": "用停顿与重音推进叙事",
          "segments": [
            {
              "style": "停顿",
              "instruction": "在第一个分句后停顿",
              "text": "房间里安静下来以后，她打开了那个信封。",
              "tone": "calm"
            },
            {
              "style": "重音",
              "instruction": "重读“你”",
              "text": "我们最终选中的那个人，就是你！",
              "tone": "excited"
            },
            {
              "style": "轻声",
              "instruction": "轻声说，带短暂停顿",
              "text": "一时间，谁都没有说话。",
              "tone": "gentle"
            }
          ],
          "audio": {
            "source": "",
            "concat": "",
            "joint": "",
            "ted": "",
            "edict": ""
          },
          "boundaries": [],
          "id": "delivery-emphasis-zh-01"
        },
        {
          "title": "变化的对比重音",
          "segments": [
            {
              "style": "对比重音",
              "instruction": "重读“今天”，与“明天”形成对比",
              "text": "我们需要今天完成这件事，不是明天。",
              "tone": "calm"
            },
            {
              "style": "停顿",
              "instruction": "在“听着”之后停顿",
              "text": "听着，有一件事我希望你记住。",
              "tone": "excited"
            },
            {
              "style": "强调",
              "instruction": "重读“一起”",
              "text": "不管接下来发生什么，我们都会一起面对。",
              "tone": "gentle"
            }
          ],
          "audio": {
            "source": "",
            "concat": "",
            "joint": "",
            "ted": "",
            "edict": ""
          },
          "boundaries": [],
          "id": "delivery-emphasis-zh-02"
        }
      ]
    }
  }
};
