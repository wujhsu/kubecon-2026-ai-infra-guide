# 8 Million Tasks Daily

- 时间 / 会场：2026-09-08 11:00–11:30 · Mandarin Hall I
- 对应教程：[Kubernetes 基础](../../content/tutorials/02-kubernetes-basics.md)、[AI 调度](../../content/tutorials/08-k8s-ai-scheduling.md)

## 会前关注

- 已知结果：每天 800 万任务、节省 1000+ CPU 节点、同步延迟从约 4 分钟降至 10 秒内。
- 必须补齐：流量形态、基线架构、成本口径与改造前后稳定性。

## 现场记录

- Informer Choke 的具体表现：
- Centralized Agent Service 的职责：
- VolcanoJob 元数据如何缩小：
- Kueue/Volcano 配额与抢占：
- 哪项优化贡献最大：

## 待提问题

1. 800 万任务中并发、任务时长和对象更新频率分别是多少？
2. 中央 Agent Service 成为单点或热点后如何分片与恢复？

## 会前猜想
- 我认为核心矛盾是短任务数量与控制面对象/事件成本。

## 核心架构
- Workflow → Central Agent Service → Kueue/Volcano → Pod：

## 量化证据
- 并发、任务时长、对象数、同步延迟、CPU 与成本基线：

## 适用边界
- 规模、故障域和中心服务瓶颈：

## 人物与项目
- 讲者 / Horizon Robotics / Argo / Kueue / Volcano：

## 会后行动
- [ ] 核对讲者数字与口径
- [ ] 重画控制器事件路径
- [ ] 写出三句话总结
