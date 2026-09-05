# Pathless runc Security（备选）

- 时间 / 会场：2026-09-09 11:00–11:30 · Mandarin Hall II · 中文
- Sessionize：https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/session/1224844
- 对应教程：[安全与多租户](../../content/tutorials/10-security-multitenancy.md)
- 冲突：主选 Huawei Celia 推理平面

## 会前猜想
- 我认为它解决的问题：用文件描述符和现代挂载 API 减少路径重解析攻击。
- 最想验证：ProcFS、符号链接与 TOCTOU 的真实攻击链。

## 核心架构
- 不可信路径 → 解析 → mount / fd-based setup：

## 现场记录
- 旧流程、攻击窗口、新流程：
- 内核版本、兼容与回退：

## 量化证据
- 性能、代码复杂度、测试覆盖、受影响版本：

## 适用边界
- 它减少的威胁与不能替代的授权/沙箱：

## 待提问题
1. 哪些内核能力是硬前提？
2. 兼容旧环境时是否重新引入路径攻击面？

## 人物与项目
- 讲者 / CVE / PR / 文档：

## 会后行动
- [ ] 复述一条攻击路径
- [ ] 核对上游 runc 设计文档
- [ ] 写出三句话总结
