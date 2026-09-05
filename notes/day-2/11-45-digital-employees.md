# Scaling Digital Employees at CMB

- 时间 / 会场：2026-09-08 11:45–12:15 · Mandarin Hall I
- 对应教程：[Agent 基础设施](../../content/tutorials/09-agent-infra.md)、[安全与多租户](../../content/tutorials/10-security-multitenancy.md)

## 现场记录

- Agent-as-a-Service 模板：
- 微虚机沙箱边界：
- 身份与数据主权：
- 实时护栏与确定性策略：
- 预算控制指标：
- 审计保留内容：

## 待提问题

1. 哪些 Agent 行为必须人工确认，策略如何避免被 Prompt 绕过？
2. 工具重试和补偿怎样防止金融副作用重复发生？

## 会前猜想
- 我认为核心是 Agent-as-a-Service 的确定性边界与金融权限治理。

## 核心架构
- 用户 → Runtime → Guardrail → Sandbox → Tool → Audit：

## 量化证据
- Agent 数、工具调用量、冷启动、失败率、审计成本：

## 适用边界
- 金融特有控制与可泛化机制：

## 人物与项目
- 讲者 / 招商银行 / 相关开源项目：

## 会后行动
- [ ] 画身份与工具授权链
- [ ] 记录一个失败恢复案例
- [ ] 写出三句话总结
