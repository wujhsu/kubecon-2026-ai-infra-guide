# veRL for Ultra-Large-Scale MoE（备选）

- 时间 / 会场：2026-09-09 14:30–15:00 · Mandarin Hall I · 中文
- Sessionize：https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/session/1222557
- 对应教程：[分布式训练](../../content/tutorials/04-distributed-training.md)
- 冲突：主选端到端推理可观测性；同时段 Kata

## 会前猜想
- 我认为它解决的问题：MoE 强化学习中的并行组合、负载不均与训练/推理协作。
- 最想验证：优化来自算法、编排、通信还是 Kernel？

## 核心架构
- Rollout → Reward → Trainer → 权重同步：
- TP / PP / EP / SP 组合：

## 现场记录
- Token 路由与 All-to-All：
- 异步执行、一致性、容错：

## 量化证据
- 模型、卡型/数量、网络、MFU、吞吐、基线：

## 适用边界
- Dense 模型、小规模或低速网络是否适用：

## 待提问题
1. 最慢专家和长尾样本怎样处理？
2. 权重版本不同步对训练稳定性有什么影响？

## 人物与项目
- 讲者 / veRL / 依赖项目：

## 会后行动
- [ ] 画并行维度和通信类型
- [ ] 核对数字是否端到端
- [ ] 写出三句话总结
