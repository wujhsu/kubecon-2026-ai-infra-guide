# Secure Agentic Workflows on Kubernetes（备选）

- 时间 / 会场：2026-09-08 13:45–14:15 · Mandarin Hall I · English
- Sessionize：https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/session/1177779
- 对应教程：[Agent 基础设施](../../content/tutorials/09-agent-infra.md)、[安全与多租户](../../content/tutorials/10-security-multitenancy.md)
- 冲突：主选 LWS；同时段 NCCL、Dynamo

## 会前猜想
- 我认为它解决的问题：金融场景中跨 Agent、MCP 工具与工作负载身份的边界。
- 最想验证：身份如何从用户传到单次工具调用？

## 核心架构
- Agent Runtime → SPIFFE/SPIRE → MCP Gateway → Tool：
- 确定性工作流与模型决策边界：

## 现场记录
- 短期身份、最小权限、审批与审计：
- 代码执行和网络出口：

## 量化证据
- 启动、调用延迟、策略开销、故障与规模：

## 适用边界
- 哪些机制是合规要求，哪些是通用工程选择：

## 待提问题
1. 工具调用超时后怎样避免重复副作用？
2. MCP Server 被攻陷后，Gateway 能限制到什么程度？

## 人物与项目
- 讲者 / Repo / 文档：

## 会后行动
- [ ] 画身份与授权传递链
- [ ] 列出未被覆盖的威胁面
- [ ] 写出三句话总结
