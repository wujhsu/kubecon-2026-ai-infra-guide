# Cloud-Native Inference Plane Behind Huawei Celia

- 时间 / 会场：2026-09-09 11:00–11:30 · Mandarin Hall I
- 对应教程：[推理基础](../../content/tutorials/06-llm-inference.md)、[分布式推理](../../content/tutorials/07-distributed-inference.md)

## 现场记录

- 流量、模型和加速器规模：
- P/D 计算与带宽不对称：
- PodGroup / SubGroup 调度：
- Token Router：
- Prefill / Decode Autoscaler 指标：
- −40% TTFT、+50% Throughput 的基线和分位数：
- 每百万 Token 成本变化：

## 待提问题

1. 指标是否包含排队、KV 传输和冷启动？
2. P/D 独立扩容时如何保持会话连续并避免某一阶段过量？

## 会前猜想
- 我认为核心是 P/D 工作池、Token 路由和不同阶段扩缩指标。

## 核心架构
- Gateway → Token Router → Prefill → KV Transfer → Decode：

## 量化证据
- 模型、长度、并发、卡型、网络、TTFT/TPOT 分位数：

## 适用边界
- 短请求、小规模或低带宽网络下的代价：

## 人物与项目
- 讲者 / Huawei Celia / 相关开源组件：

## 会后行动
- [ ] 复算性能百分比基线
- [ ] 画 P/D 故障恢复链
- [ ] 写出三句话总结
