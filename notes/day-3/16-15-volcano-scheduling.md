# Volcano Unified Scheduling（备选）

- 时间 / 会场：2026-09-09 16:15–16:45 · 5B + C · 中文
- Sessionize：https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/session/1222060
- 对应教程：[Kubernetes AI 调度](../../content/tutorials/08-k8s-ai-scheduling.md)
- 冲突：主选 TTFT；同时段 DRA、Agent Security

## 会前猜想
- 我认为它解决的问题：训练、推理和 Agent 工作负载的队列、成组与拓扑调度。
- 最想验证：统一平台的核心对象与边界。

## 核心架构
- Queue / PodGroup → Scheduler Plugins → Nodes / Devices：

## 现场记录
- Gang、抢占、公平与 GPU 共享：
- 与 Kueue、LWS、DRA 的集成：

## 量化证据
- 规模、调度延迟、利用率、尾延迟和基线：

## 适用边界
- 哪些功能来自 Volcano，哪些来自驱动或业务控制器：

## 待提问题
1. 部分成员失败或被抢占时，整组如何回收？
2. 在线推理 SLO 与离线训练公平怎样共同表达？

## 人物与项目
- 讲者 / Volcano Repo / Plugin：

## 会后行动
- [ ] 画出与默认调度器的调用边界
- [ ] 核对性能数字口径
- [ ] 写出三句话总结
