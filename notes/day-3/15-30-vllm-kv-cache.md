# vLLM KV Cache Management

- 时间 / 会场：2026-09-09 15:30–16:00 · Mandarin Hall I
- 对应教程：[推理基础](../../content/tutorials/06-llm-inference.md)、[分布式推理](../../content/tutorials/07-distributed-inference.md)

## 现场记录

- Prefix Block Hash 和命中条件：
- LRU、CPU Offload、ARC 分工：
- Offload 传输与重算的临界点：
- Prefix Cache Hit Rate 的统计范围：
- 语义压缩、优先级调度、跨会话共享 Roadmap：
- 当前稳定能力与未来设想的边界：

## 待提问题

1. 如何避免不同租户共享敏感前缀或产生侧信道？
2. 缓存命中率提升是否同时改善 P99 TTFT？

## 会前猜想
- 我认为命中率必须和节省时间、容量成本及租户隔离一起看。

## 核心架构
- Prefix Hash → GPU Blocks → LRU/ARC → CPU Offload → Router：

## 量化证据
- vLLM 版本、模型、长度、命中率、传输、TTFT/P99：

## 适用边界
- 当前稳定能力、实验能力与 Roadmap：

## 人物与项目
- 讲者 / vLLM Repo / 相关 PR：

## 会后行动
- [ ] 核对 vLLM 0.28 文档
- [ ] 比较复用与重算成本
- [ ] 写出三句话总结
