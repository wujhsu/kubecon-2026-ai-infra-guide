# Tiered KVCache Storage for Agent Scenarios

- 时间 / 会场：2026-09-09 13:45–14:15 · Grand Ballroom II + III
- 对应教程：[推理基础](../../content/tutorials/06-llm-inference.md)、[分布式推理](../../content/tutorials/07-distributed-inference.md)

## 现场记录

- Agent / Coding / Chat 的访问分布：
- “复用率超过 90%”的统计口径：
- GPU / CPU / Storage 层次与传输成本：
- 容量预测和保留窗口：
- 动态淘汰策略与基线：
- 多租户缓存隔离：

## 待提问题

1. 预测失误时的最坏延迟和回退路径是什么？
2. 语义相似但 Token 前缀不完全相同的缓存如何处理正确性？

## 会前猜想
- 我认为分层缓存的收益取决于复用分布能否覆盖传输和管理开销。

## 核心架构
- GPU KV → CPU KV → Storage → Cache-aware Router：

## 量化证据
- 命中口径、层级容量、带宽、迁移延迟、P99 与基线：

## 适用边界
- Agent、Coding、Chat 的复用差异和多租户隔离：

## 人物与项目
- 讲者 / KV Cache 项目 / 存储后端：

## 会后行动
- [ ] 把命中收益换算成毫秒
- [ ] 记录预测失败路径
- [ ] 写出三句话总结
