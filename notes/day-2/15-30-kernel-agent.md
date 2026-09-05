# KernelAgent

- 时间 / 会场：2026-09-08 15:30–16:00 · Grand Ballroom II + III
- 对应教程：[PyTorch 技术栈](../../content/tutorials/03-pytorch-stack.md)

## 现场记录

- 正确性验证：
- 硬件性能信号：
- Agent 分工和闭环：
- 2.02x / 1.56x 的具体基线：
- 89% Roofline 的计算方法：
- 未能优化的任务类型：

## 待提问题

1. 怎样避免针对 KernelBench 形状过拟合？
2. 生成 Kernel 的安全、编译成本和长期维护由谁承担？

## 会前猜想
- 我认为收益必须同时通过正确性、单 Kernel 和端到端三层验证。

## 核心架构
- Spec → Candidate Kernel → Compile/Test → Hardware Feedback → Refine：

## 量化证据
- GPU、形状、精度、编译预算、正确率、P50/P95：

## 适用边界
- Benchmark 任务与真实模型覆盖：

## 人物与项目
- 讲者 / KernelAgent / Triton / KernelBench：

## 会后行动
- [ ] 复算 Roofline 口径
- [ ] 记录失败样本而非只记最佳值
- [ ] 写出三句话总结
