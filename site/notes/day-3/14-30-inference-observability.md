# End-to-End Observability for LLM Inference

- 时间 / 会场：2026-09-09 14:30–15:00 · Mandarin Hall II
- 对应教程：[可观测性与可靠性](../../content/tutorials/11-observability-reliability.md)

## 现场记录

- Gateway → Engine → Runtime → GPU 的关联 ID：
- OpenTelemetry GenAI 字段：
- Streaming Trace 怎样结束和采样：
- P99 Spike 的根因路径：
- Busy-but-idle GPU 的根因：
- KV Cache OOM 的提前信号：
- MTTR 从小时到分钟的基线：

## 待提问题

1. 高基数 Token、用户和模型属性如何控制成本与隐私？
2. 哪些配置和 Dashboard 已开源可复用？

## 会前猜想
- 我认为重点不是更多图表，而是把 Token 请求与具体 GPU 因果关联。

## 核心架构
- Gateway Span → Engine/P-D Spans → Runtime → GPU/NIC Telemetry：

## 量化证据
- 采样率、属性基数、遥测开销、MTTR 前后基线：

## 适用边界
- 稳定语义约定、实验字段和厂商私有指标：

## 人物与项目
- 讲者 / OpenTelemetry / Collector / GPU Exporter：

## 会后行动
- [ ] 对照 SemConv 1.44 核对字段
- [ ] 重画一个事故因果链
- [ ] 写出三句话总结
