# Meta 100k-GPU Training Through Failures

- 时间 / 会场：2026-09-09 11:45–12:15 · Mandarin Hall I
- 对应教程：[分布式训练](../../content/tutorials/04-distributed-training.md)、[NCCL](../../content/tutorials/05-gpu-communication.md)、[可靠性](../../content/tutorials/11-observability-reliability.md)

## 现场记录

- 实际故障频率与主要故障类型：
- torchcomms / MCCL / NCCL 分工：
- `ncclCommShrink` / `ncclCommGrow` / `ncclCommRevoke`：
- 通信域变化后的训练语义：
- Peer Memory / Local Disk / Distributed FS Checkpoint：
- 恢复时间、丢失步数和额外成本：

## 待提问题

1. 缩减成员后，全局 Batch 和优化器语义如何保持？
2. 哪类故障仍必须整组重启？

## 会前猜想
- 我认为目标是把故障检测、通信域变化和状态恢复拆开优化。

## 核心架构
- Failure Detector → Comm Revoke/Shrink/Grow → Checkpoint Restore：

## 量化证据
- GPU 数、故障频率、检测时间、RTO、RPO、Checkpoint 开销：

## 适用边界
- 可继续训练的故障与必须重启的故障：

## 人物与项目
- 讲者 / torchcomms / NCCL / Checkpoint 系统：

## 会后行动
- [ ] 对照 NCCL 2.31.2 核对 API
- [ ] 比较同伴内存、本地盘、分布式存储
- [ ] 写出三句话总结
