# Kata Containers for the Agent Era（备选）

- 时间 / 会场：2026-09-09 14:30–15:00 · Pearl Hall · English
- Sessionize：https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/session/1220661
- 对应教程：[安全与多租户](../../content/tutorials/10-security-multitenancy.md)
- 冲突：主选端到端推理可观测性；同时段 veRL

## 会前猜想
- 我认为它解决的问题：为不可信 Agent 代码提供独立内核和跨平台沙箱。
- 最想验证：Kata 4.x 的启动、GPU、镜像与观测成本。

## 核心架构
- Pod → Kata Runtime → Guest Kernel → Hypervisor：
- 身份、网络、MCP Gateway 在沙箱外的位置：

## 现场记录
- Hypervisor、镜像、设备直通：
- TDX / SEV-SNP / 远程证明：

## 量化证据
- 冷启动、内存开销、密度、测试环境：

## 适用边界
- 普通容器、Kata、机密容器分别适用：

## 待提问题
1. GPU 工作负载的设备隔离与启动成本如何测量？
2. Guest 内的遥测怎样可信地传出？

## 人物与项目
- 讲者 / Kata Repo / RuntimeClass：

## 会后行动
- [ ] 画威胁模型而非只画组件
- [ ] 核对最新稳定版本
- [ ] 写出三句话总结
