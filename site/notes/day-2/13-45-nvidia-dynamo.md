# NVIDIA Dynamo on Kubernetes（备选）

- 时间 / 会场：2026-09-08 13:45–14:15 · Grand Ballroom II + III · English
- Sessionize：https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/session/1224503
- 对应教程：[分布式推理系统](../../content/tutorials/07-distributed-inference.md)
- 冲突：主选 LWS；同时段 NCCL、Secure Agentic Workflows

## 会前猜想
- 我认为它解决的问题：把缓存、路由、成组副本与故障恢复组合成推理平台。
- 最想验证：普通 Deployment/HPA 具体在哪些场景失效？

## 核心架构
- Gateway → Router → P/D Pool → KV 传输：
- Kubernetes 控制面与 Token 数据面边界：

## 现场记录
- 缓存争用、RBG、会话连续性：
- 扩缩、更新、部分故障：

## 量化证据
- 模型、输入/输出长度、并发、网络、TTFT/TPOT：

## 适用边界
- 最小值得引入 Dynamo 的规模和团队能力：

## 待提问题
1. 路由评分怎样平衡缓存命中与等待 Token？
2. Decode 副本失败时，流式会话和 KV 怎样恢复？

## 人物与项目
- 讲者 / Repo / 文档：

## 会后行动
- [ ] 与 vLLM/SGLang 和 LWS 分工对照
- [ ] 核对生产数字口径
- [ ] 写出三句话总结
