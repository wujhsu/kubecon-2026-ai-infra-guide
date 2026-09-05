# LeaderWorkerSet 与分离式 LLM Serving

- 时间 / 会场：2026-09-08 13:45–14:15 · 5B + C
- 对应教程：[分布式推理](../../content/tutorials/07-distributed-inference.md)、[AI 调度](../../content/tutorials/08-k8s-ai-scheduling.md)

## 现场记录

- Deployment 不够用的具体失败案例：
- LWS 的 Leader / Worker 生命周期：
- PodGroup 与 Volcano、scheduler-plugins、YuniKorn：
- DisaggregatedSet 如何关联 P/D：
- 更新、扩缩和部分故障语义：

## 待提问题

1. 什么规模以下仍应优先使用 Deployment？
2. 部分成员调度失败时，已占用资源多久后释放？

## 会前猜想
- 我认为核心是把多 Pod 推理副本作为一个可调谐整体。

## 核心架构
- LWS → PodGroup → Scheduler → Leader/Workers：

## 量化证据
- 副本规模、调度/更新耗时、半组占用与恢复时间：

## 适用边界
- Deployment、StatefulSet 与 LWS 的选择条件：

## 人物与项目
- 讲者 / LWS / scheduler-plugins / Volcano / YuniKorn：

## 会后行动
- [ ] 对照 LWS 0.10 文档核对对象
- [ ] 重画部分故障状态机
- [ ] 写出三句话总结
