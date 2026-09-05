# Evolving Argo Workflows for AI

- 时间 / 会场：2026-09-08 16:15–16:45 · 5B + C
- 对应教程：[Kubernetes 基础](../../content/tutorials/02-kubernetes-basics.md)、[Agent 基础设施](../../content/tutorials/09-agent-infra.md)

## 现场记录

- 自动驾驶 / 微调 / Agent Coding 三类工作流差异：
- Controller 并发与队列调优：
- 对象存储卷和分支级隔离：
- 失败重试与幂等：
- 哪些步骤确定、哪些由 Agent 决定：

## 待提问题

1. 每个 Workflow 对 API Server 和 Controller 的平均状态更新量是多少？
2. Agent 步骤产生外部副作用时如何设计重试？

## 会前猜想
- 我认为工作流负责确定边界，Agent 只应在受控步骤内决策。

## 核心架构
- Workflow Controller → Steps → Artifact Store → Retry/Compensation：

## 量化证据
- Workflow/Pod 数、对象更新率、同步延迟、控制面资源：

## 适用边界
- Argo、Kueue、Scheduler 与业务 Runtime 分工：

## 人物与项目
- 讲者 / Argo Workflows / 插件：

## 会后行动
- [ ] 画状态与产物流向
- [ ] 标出非幂等步骤
- [ ] 写出三句话总结
