# EDICT anonymous research demo

直接打开 `index.html` 即可。纯静态 HTML/CSS/JavaScript，无构建依赖、外部字体或 CDN。正文使用英文，音频案例支持中英文。

## 当前页面结构

研究标题 → 联合控制试听 → Abstract → Method → 音色编辑试听 → 局部控制试听 → 主实验结果。

- 统一使用白底、细分隔线、深色正文和少量蓝色强调；移除重复的首屏示意图、标签、案例编号和论文入口。
- 28 组案例、156 个音频位置保留。每个任务展示一个案例，通过案例、类别和语言控件切换；默认显示 3 组案例、17 个音频位置。
- Main experimental comparisons 包含三组主实验、六张条件表，全部默认展开，每组可独立折叠。没有结果标签页或条件下拉菜单。
- 两张 MOS 图保留指标切换，显示名称统一为 **Edit Accuracy** 和 **Instruction Following**。Edit-MOS、Instr-MOS 数据键保持不变，仍是五分制主观评价，没有重新定义数值。
- 网页不展示作者、机构、邮箱、个人或仓库链接、Citation 区块，不提供论文或附件下载入口。论文副本已移出网页目录。
- 不在页面展示消融和额外实验；原始实验数据与绘图资源保留用于追溯。

## 试听区与对比设置

| 任务 | 案例数量 | 每组音频 | 总位置 |
| --- | ---: | --- | ---: |
| Joint control | 2 个案例 × 2 种语言 = 4 | 原声、编辑后参考、Joint、Concat.、Editor + concat.、Full EDICT | 24 |
| Timbre editing | 3 类 × 2 个案例 × 2 种语言 = 12 | 原声、目标参考、Qwen-VD、Qwen-Base、CosyVoice 2、EDICT | 72 |
| Local control | 3 类 × 2 个案例 × 2 种语言 = 12 | 共享参考、Concat.、Joint、TED-TTS、EDICT | 60 |

音色编辑覆盖单属性（亮度、粗糙度）、组合编辑、双向年龄印象变化。局部控制覆盖情绪、语速和停顿/重音；联合控制包含音色编辑叠加情绪或语速变化。

### 建议先准备的 34 个音频

先完成每个任务的第一个中英文案例，共 6 组：

1. Joint：第一个中文与英文案例，6 × 2 = 12 个。
2. Voice / single：第一个中文与英文案例，6 × 2 = 12 个。
3. Delivery / emotion：第一个中文与英文案例，5 × 2 = 10 个。

然后补第二个案例及其他类别。可以选择既有代表性又能观察取舍的样本，不必将每组都选成最有利的案例。

### 对比的解释

- **音色编辑**：四个 instruction-conditioned 系统使用相同源音频、文本与编辑请求；目标录音仅供评价/对照听。目标参考 VC（FreeVC、Seed-VC）获得不同输入，不混入这组试听比较，结果表中单独报告。
- **局部控制**：四种方法使用相同 Qwen-VD backbone、参考声音、文本与分段指令。试听应包含完整 utterance，重点听切换处。
- **联合控制**：Joint 与 Concat. 获得原参考及编辑请求；Editor + concat. 与 Full EDICT 获得同一编辑后参考。对比可以区分音色编辑与 cache reconstruction 的作用。
- 请按相同条件准备对比样本，并适当保持播放音量一致。参考录音不必与合成文本相同。

当前所有文本都是**拟定的示例脚本**，并非已选出的 benchmark 样本。填入真实音频时，应同步更新文本和指令。页面未使用虚构音频、试听结论或播放时长。

## 填入音频

集中修改 `demo-data.js`。每个语言/类别现在是包含两个案例的数组：

```js
// 第一个英文联合控制案例
EDICT_DEMOS.joint.en[0].audio.edict
// 第一个英文单属性编辑案例
EDICT_DEMOS.voice.single.en[0].audio.qwenBase
// 第二个中文语速案例
EDICT_DEMOS.delivery.pace.zh[1].audio.edict
```

直接在该案例的 `audio` 字段中填写相对路径，例如：

```js
"audio": {
  "source": "assets/audio/joint/en/01/source.wav",
  "reference": "assets/audio/joint/en/01/reference.wav",
  "edict": "assets/audio/joint/en/01/edict.wav",
  "joint": "assets/audio/joint/en/01/joint.wav",
  "concat": "assets/audio/joint/en/01/concat.wav",
  "editorConcat": "assets/audio/joint/en/01/editorConcat.wav"
}
```

完整的 **156 项配置位置和建议路径**见 `audio-manifest.csv`。

- 空字符串显示 `Audio forthcoming`；有效路径显示原生播放器。支持浏览器可播放的 WAV/MP3 等格式。
- 音频互斥播放；切换案例类别或语言会暂停当前播放。
- 加载失败显示 `Audio unavailable`。
- Joint / Delivery 的 `boundaries` 可填真实片段结束时刻（秒），例如 `[3.85, 6.72]`。只在当前案例的完整 EDICT 输出播放时高亮片段；留空不会虚构同步。
- `id` 必须保持唯一，作为片段同步和页面定位的稳定标识。
- `baseline` 对应 Qwen3-TTS-VD，`qwenBase` 对应 Qwen3-TTS-Base，`cosy` 对应 CosyVoice 2；`target` 仅作目标音色评价参考。

## MOS 图及统计口径

数据来源：项目内的 `figures/human_evaluation/mos_results.csv`。
该目录下 `human_evaluation_bars.pdf` 与 `EDICT_ICLR/figures/subjective_evaluation.pdf` 的 SHA-256 完全一致，确认数据对应当前论文图。

页面使用点和区间展示，横轴为 1–5 分。19 名听众，音色编辑每系统 10 项，局部控制每系统 12 项。均值为 item-level listener averages 的平均值；论文对音频条目进行 10,000 次 bootstrap，95% CI 用对称误差条显示，半宽取均值到两个端点距离的较大值。

网页直接保留 CSV 中的均值与 `interval_half_width`，不根据图片估读、不重新计算原始评分、也不将半宽误写为标准差。Seed-VC 的 Edit-MOS 为 N/A，保持为空，不按零分绘制。

- `assets/data/mos_results.csv`：原始聚合数据副本。
- `assets/charts/mos-*.svg`：桌面矢量图；`*-compact.svg` 为手机版。
- `assets/charts/mos-overview.pdf`：全部六个 MOS 图的矢量版。
- `scripts/plot_web_results.py`：可复现绘图脚本（需要 matplotlib、numpy）。

## 主实验与保留的数据

| 结果类别 | 可切换条件 |
| --- | --- |
| Timbre editing | Structured / Descriptive / Target-reference VC（独立子集） |
| Local control | Qwen-VD / CosyVoice 2 |
| Joint control | Qwen-VD |
| Attribute accuracy | Structured / Descriptive；包括未编辑属性保留率 |
| Cache ablation | Persistent / Truncated / Full / 去掉初始上下文 / 去掉近期上下文 |
| Editor training | Structured / Descriptive；SFT、DPO、offline GRPO |
| MED-TTS | Chinese / English |

网页只展示上表前三类主实验，六张条件表默认全部展开、按实验分组折叠；其余数据作为原始研究资料保留。保留完整主表的内容质量与识别误差列，以及双说话人编码器结果。横向滚动表格只在表格内部发生。蓝色高亮标识 EDICT 配置，不表示所有列最优。

`assets/data/results.json` 提供全部数值与说明；`assets/data/sources/` 保存对应 LaTeX 数值来源。构建方式：

```sh
python3 scripts/build_results.py /path/to/EDICT_ICLR
python3 scripts/plot_web_results.py
```

第一步会同时生成浏览器可在 `file://` 下加载的 `results-data.js`，无需运行服务器或 fetch JSON。更新论文结果后执行两步即可同步表格与图。

## 文件结构

```text
index.html             学术正文、参考图、试听与结果容器
styles.css             原始蓝白设计基础样式
academic.css           学术版布局与响应式规则
demo-data.js           28 组案例、文案、音频路径、分段时刻
app.js                 单案例切换、互斥播放、分段同步
results-data.js        从论文表格生成的结果与 MOS 数据
sections.js            默认展开的结果分组、MOS 图切换、图像放大
scripts/               表格提取与可复现绘图脚本
assets/audio/          真实音频（待填入）
assets/figures/        论文原图及 PDF
assets/charts/         本次重绘的 SVG、PNG、PDF
assets/data/           数值、原始 MOS CSV 和 LaTeX 表格副本
```

保持匿名展示：不要添加署名、机构、联系方式、外部身份链接或论文入口，也不要将论文 PDF 放回网页目录。

当前版本已通过页面结构、资源引用、脚本语法、六张展开的主实验表格与源数据逐格一致性、MOS 指标命名，以及全部 28 组案例生成内容的检查；并检查了目录中的个人路径、联系方式和资源作者元数据。浏览器安全策略阻止本地页面预览，本轮无法进行浏览器交互和响应式视觉验收；真实音频的内容与听感待加入后确认。

本次只更新本地页面，未发布到外网。原始研究论文未修改；原网页附带的副本移至页面目录之外保管。
