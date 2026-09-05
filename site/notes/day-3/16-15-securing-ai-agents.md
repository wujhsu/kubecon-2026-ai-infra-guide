# Securing AI Agents at Scale（备选）

- 时间 / 会场：2026-09-09 16:15–16:45 · Grand Ballroom II + III · 中文
- Sessionize：https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/session/1218010
- 对应教程：[Agent 基础设施](../../content/tutorials/09-agent-infra.md)、[安全与多租户](../../content/tutorials/10-security-multitenancy.md)
- 冲突：主选 TTFT；同时段 DRA、Volcano

## 会前猜想
- 我认为它解决的问题：多租户 Agent 的身份、网络、沙箱、Admission 与审计组合。
- 最想验证：真实威胁模型和已发生的失败模式。

## 核心架构
- User Identity → Agent Pod → Kata → MCP Gateway → Tool：

## 现场记录
- OIDC、RBAC、NetworkPolicy、Admission：
- 短期凭据、IMDS、防横向移动：

## 量化证据
- 租户/实例规模、冷启动、策略开销、事故数据：

## 适用边界
- 防住的攻击者与明确不覆盖的威胁：

## 待提问题
1. 用户身份怎样缩到单个 Agent 实例和工具调用？
2. 沙箱内进程被攻陷后，最坏可访问什么？

## 人物与项目
- 讲者 / Kata / OIDC / Policy 项目：

## 会后行动
- [ ] 用 STRIDE 或攻击树重画威胁
- [ ] 核对控制是否默认拒绝
- [ ] 写出三句话总结
