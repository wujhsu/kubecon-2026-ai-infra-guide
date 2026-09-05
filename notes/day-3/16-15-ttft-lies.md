# Why Your TTFT Lies

- 时间 / 会场：2026-09-09 16:15–16:45 · Mandarin Hall II
- 对应教程：[分布式推理](../../content/tutorials/07-distributed-inference.md)、[可观测性](../../content/tutorials/11-observability-reliability.md)

## 现场记录

- 最小跨层指标集合：
- Prefill Queue 与 Compute：
- Decode Memory Bound：
- KV Transfer：
- GPU / Network Bottleneck：
- 指标 → 根因 → P:D / Batch / KV / RDMA 调参映射：
- 指标采集开销：

## 待提问题

1. 如何区分相关性和真正因果关系？
2. 哪几个指标最适合作为自动扩缩信号，哪些只适合诊断？

## 会前猜想
- 我认为端到端 TTFT 会把排队、Prefill、KV 传输和连接建立混在一起。

## 核心架构
- Request → Queue → Prefill → KV Transfer → Decode → Stream：

## 量化证据
- 输入/输出长度、Batch、P:D、缓存、网络和分位数：

## 适用边界
- 最小指标集在不同运行时和拓扑上的可移植性：

## 人物与项目
- 讲者 / 指标实现 / Dashboard：

## 会后行动
- [ ] 将每个指标映射到调参动作
- [ ] 标出相关性与因果证据
- [ ] 写出三句话总结
