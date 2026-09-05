# Advanced NCCL Tutorial: Beyond Collectives（备选）

- 时间 / 会场：2026-09-08 13:45–15:00 · Pearl Hall · English
- Sessionize：https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/session/1224567
- 对应教程：[GPU 通信与 NCCL](../../content/tutorials/05-gpu-communication.md)
- 冲突：主选 LWS；还与 Dynamo、Secure Agentic Workflows、14:30 HAMi 重叠

## 会前猜想
- 我认为它解决的问题：Collective 之外的低延迟通信与新容错能力。
- 最想验证：symmetric memory、GIN、DeepEP v2 分别减少哪段开销？

## 核心架构
- GPU / NVLink / PCIe / NIC / Fabric：
- NCCL API、插件与框架接入边界：

## 现场记录
- `ncclCommShrink` / `ncclCommGrow` / `ncclCommRevoke` 语义：
- 消息大小、拓扑和算法选择：
- 故障与死锁案例：

## 量化证据
- 硬件、规模、消息分布、基线、P50/P99：

## 适用边界
- 已发布 API、已集成、生产验证分别是：

## 待提问题
1. 拓扑改变或 rank 退出时，框架需要承担哪些状态同步？
2. 收益是否包含初始化、内存注册与失败检测？

## 人物与项目
- 讲者 / Repo / 文档：

## 会后行动
- [ ] 对照 NCCL 2.31.2 官方 API 核对笔记
- [ ] 重画通信与故障恢复时序
- [ ] 写出三句话总结
