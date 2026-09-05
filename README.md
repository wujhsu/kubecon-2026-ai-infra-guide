# KubeCon 2026 AI Infra 初学者预习站

[![CI and Pages](https://github.com/wujhsu/kubecon-2026-ai-infra-guide/actions/workflows/pages.yml/badge.svg)](https://github.com/wujhsu/kubecon-2026-ai-infra-guide/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-0f766e.svg)](LICENSE)

面向 KubeCon + CloudNativeCon + OpenInfra Summit + PyTorch Conference China 2026 参会者的中文 AI Infra 预习资料。内容从一次请求如何到达 GPU 开始，逐步覆盖硬件、Kubernetes、PyTorch、分布式训练、GPU 通信、LLM 推理、AI 调度、Agent、安全与可观测性。

**在线阅读：<https://wujhsu.github.io/kubecon-2026-ai-infra-guide/>**

> 这是非官方社区项目，与 Linux Foundation、CNCF、OpenInfra Foundation、PyTorch Foundation 或议程讲者无隶属关系。论坛议程和易变技术信息冻结于 **2026-09-05**；临近参会时请以[官方议程](https://www.lfopensource.cn/kubecon-cloudnativecon-openinfra-summit-pytorch-conference-china/program/schedule/)和 Sessionize 为准。

![请求数据面与 Kubernetes 控制面协作示意图](content/assets/concepts/01-ai-infra-two-planes.webp)

## 适合谁

- 会使用 Linux 和 Docker，但还没有系统学习 AI Infra；
- 希望在三天论坛前建立一张完整知识地图；
- 没有 NVIDIA GPU，希望练习能在 Mac、CPU 或纯浏览器环境完成；
- 想把现场笔记与会后行动放进同一套结构中。

## 你会获得什么

| 内容 | 规模 | 用途 |
|---|---:|---|
| 递进教程 | 12 篇，615 分钟 | 约 10 小时 15 分钟的完整预习路径 |
| 双语术语 | 134 个 | 理解缩写、易混概念和关联词 |
| 议程路线 | 14 场主选 + 10 场备选 | 根据时间冲突安排三天听会路线 |
| 场次笔记 | 24 份 | 记录架构、瓶颈、证据、边界和行动 |
| 概念插画 | 8 张 | 用直觉图补充 Mermaid 精确关系图 |
| 离线工具 | 2 个 | KV Cache 显存估算与 TTFT/TPOT 延迟演示 |

每篇教程都包括学习目标、一句话直觉、生活类比、原理图、逐层解释、完整案例、10–20 分钟练习、参考答案、常见误区、论坛映射、听会问题、5 道自测题和延伸阅读。

## 快速开始

### 在线阅读

直接访问 GitHub Pages：

<https://wujhsu.github.io/kubecon-2026-ai-infra-guide/>

### 下载后离线阅读

```bash
git clone https://github.com/wujhsu/kubecon-2026-ai-infra-guide.git
cd kubecon-2026-ai-infra-guide
python3 -m http.server 4173 --directory site
```

然后打开 <http://127.0.0.1:4173/>。按 `Ctrl+C` 停止服务器。服务器只读取本地 `site/`，启动后断开互联网仍可使用。

如果 `4173` 端口已被占用，可以替换成其他端口，例如：

```bash
python3 -m http.server 8080 --directory site
```

也可以直接用浏览器打开 [`site/index.html`](site/index.html)。部分浏览器会限制 `file://` 页面加载本地脚本；若搜索、Mermaid 或互动工具无法运行，请使用上面的静态服务器方式。

## 推荐学习路线

1. 先读[学习地图](content/tutorials/00-learning-map.md)，区分请求数据面与 Kubernetes 控制面。
2. 按教程编号顺序学习，每完成一篇就做练习和自测。
3. 用[术语表](content/reference/glossary.md)处理听会前遇到的缩写。
4. 根据[三天议程映射](content/reference/schedule-map.md)选择主选和备选场次。
5. 复制或直接填写 [`notes/`](notes/) 中的对应场次模板。
6. 每天结束后完成每日复盘，论坛结束后整理[会后行动](notes/post-conference-actions.md)。

## 项目结构

```text
content/
  tutorials/            # 12 篇教程的 Markdown 单一内容源
  reference/            # 术语表、议程映射、会场速查
  assets/concepts/      # 8 张概念插画
notes/                  # 三天议程笔记、复盘与会后行动
sources/                # 官方来源、版本和议程快照
src-static/             # 本地 CSS、JavaScript 与图标
scripts/                # 构建和校验脚本
site/                   # 可直接分发的离线静态站点
```

请不要直接修改 `site/` 中生成的 HTML。内容修改应进入 `content/`、`notes/`、`sources/` 或 `src-static/`，然后重新构建。

## 本地开发

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

`npm run dev` 启动前会自动从 Markdown 重新生成站点，终端会显示开发地址。

只重新生成静态学习站：

```bash
npm run guide:build
```

执行本地质量检查：

```bash
npm run verify
npm run lint
npm run build
```

联网核对项目版本、Sessionize 议程和外部资料链接：

```bash
npm run verify:online
```

`verify:online` 会受到上游限流或网络状态影响；阅读站点本身不依赖公网。

## 内容原则

- 优先引用官方文档、版本说明、KEP、项目仓库和论坛讲者摘要；
- 对版本、新 API、生产数字和讲者结论就近注明来源类型；
- 插画只建立直觉，不代替 Mermaid、公式、表格和官方定义；
- 明确区分官方事实、讲者摘要与教学推导；
- 对可能变化的信息标注最后核对日期和适用版本。

完整参考书目见 [`sources/official-sources.md`](sources/official-sources.md)。

## 参与贡献

欢迎提交术语解释、错别字、失效链接、议程变化、技术勘误和更好的初学者案例。提交前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)，并确保构建与校验通过。

发现敏感安全问题时，请不要提交公开 Issue，处理方式见 [SECURITY.md](SECURITY.md)。

## 许可证与声明

本项目代码、教程、笔记模板和原创插画采用 [MIT License](LICENSE)。引用或改编第三方概念、项目名和商标时，其权利归各自所有者；外部链接内容受对应站点条款约束。

本资料用于会前学习和现场记录，不构成厂商选型、性能承诺或生产部署建议。互动计算器是教学模型，不是性能基准。
