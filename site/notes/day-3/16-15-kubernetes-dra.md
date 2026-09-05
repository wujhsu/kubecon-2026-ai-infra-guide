# Kubernetes DRA Architecture（备选）

- 时间 / 会场：2026-09-09 16:15–16:45 · Pearl Hall · 中文
- Sessionize：https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/session/1223308
- 对应教程：[Kubernetes AI 调度](../../content/tutorials/08-k8s-ai-scheduling.md)
- 冲突：主选 TTFT；同时段 Volcano、Agent Security

## 会前猜想
- 我认为它解决的问题：复杂设备属性、Claim、状态与拓扑的声明式分配。
- 最想验证：1.36/1.37 API 稳定性和千设备规模路径。

## 核心架构
- Pod → ResourceClaim → Scheduler → DRA Driver → kubelet：

## 现场记录
- DeviceClass、状态、选择与准备：
- IMEX、拓扑、故障与回收：

## 量化证据
- 设备数、Claim 数、调度延迟、API 负载：

## 适用边界
- 与 Device Plugin、Kueue、Volcano 的分工：

## 待提问题
1. 设备健康变化后，已分配 Claim 怎样处理？
2. 驱动状态过大时怎样避免控制面瓶颈？

## 人物与项目
- 讲者 / KEP / SIG Node：

## 会后行动
- [ ] 核对 K8s 1.37 官方 DRA 文档
- [ ] 重画分配时序
- [ ] 写出三句话总结
