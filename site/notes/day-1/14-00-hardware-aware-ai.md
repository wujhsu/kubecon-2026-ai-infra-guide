# Hardware-Aware AI: Building PyTorch Workloads Across Accelerators

- 时间 / 会场：2026-09-07 14:00–16:00 · Pearl Hall
- 对应教程：[AI 计算硬件](../../content/tutorials/01-ai-hardware.md)、[PyTorch 技术栈](../../content/tutorials/03-pytorch-stack.md)

## 会前猜想

- 问题：新加速器反复适配算子、编译器、推理引擎，形成碎片化软件栈。
- 重点验证：统一接口能统一到什么程度，哪些硬件差异仍会漏出来？

## 现场记录

- 框架级适配：
- 算子与编译器协同：
- 数值精度与测试：
- 性能调优方法：
- 已进入 PyTorch Upstream 的部分：
- 仍依赖厂商私有栈的部分：

## 待提问题

1. 新后端达到“可用”和达到“性能可比”，各自最大的门槛是什么？
2. 缺少算子时的回退策略与可观测性如何设计？

## 会后行动

- [ ] 画出一条算子从 PyTorch 到硬件的调用链
- [ ] 记录至少一个真实迁移案例和测试条件

## 核心架构
- 模型 API → Operator → Compiler → Kernel → Runtime → Accelerator：

## 量化证据
- 硬件、精度、形状、预热、基线与误差：

## 适用边界
- 已上游能力、厂商扩展与仍不支持部分：

## 人物与项目
- 讲者、团队、Repo、RFC：
