# Serverless Training-as-a-Service

- 时间 / 会场：2026-09-08 17:00–17:30 · Grand Ballroom II + III
- 对应教程：[分布式训练](../../content/tutorials/04-distributed-training.md)

## 现场记录

- Twinkle 原子组件边界：
- 算法语义与 GPU 编排怎样解耦：
- FSDP2 / Megatron 后端：
- 多租户 LoRA Pool 隔离：
- 8+ 并发任务的模型、卡型和基线：

## 待提问题

1. Serverless 指控制面体验、计费模型还是实际 Scale-to-Zero？
2. 训练与推理权重版本怎样保持一致？

## 会前猜想
- 我认为 Serverless 主要是任务抽象与资源按需，而非自动意味着零冷启动。

## 核心架构
- API → Atomic Components → Rollout/Reward/Trainer → Model Registry：

## 量化证据
- 模型、GPU、并发、启动、吞吐、成本与基线：

## 适用边界
- Scale-to-zero、长任务状态与多租户隔离：

## 人物与项目
- 讲者 / Twinkle / FSDP2 / Megatron：

## 会后行动
- [ ] 区分产品命名与系统语义
- [ ] 画权重版本发布链
- [ ] 写出三句话总结
