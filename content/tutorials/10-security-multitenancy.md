---
title: "默认不信任 Agent：安全、沙箱与多租户"
shortTitle: "安全与多租户"
order: 10
kind: tutorial
track: "安全治理"
level: "中级"
minutes: 45
updated: "2026-09-05"
version: "Kata Containers 4.1.0 · Kubernetes v1.37"
summary: "把身份、授权、网络、运行时和审计组合成纵深防御，理解 Kata 与机密容器解决的是哪一层。"
sessions:
  - "What We Learned Securing AI Agents at Scale"
  - "From Cloud to AI: Kata Containers 4.0"
  - "Pathless First: runc Container Security"
sources:
  - "https://github.com/kata-containers/kata-containers/releases/tag/4.1.0"
  - "https://kubernetes.io/docs/concepts/security/"
---

## 学习目标

理解认证、授权和隔离不是同一件事；能比较普通容器、Kata 微虚机和机密容器；能为运行不可信 Agent 代码画出纵深防御边界。

> **一句话直觉**：安全不是一把更厚的锁，而是办公楼的多层门禁：访客身份、房间权限、隔离办公室、网络出口和摄像记录缺一不可。

## 先区分五个安全问题

| 问题 | 机制示例 | 它不负责什么 |
|---|---|---|
| 你是谁？ | OIDC、ServiceAccount、工作负载身份 | 不决定允许做什么 |
| 你能做什么？ | RBAC、业务授权策略 | 不隔离内核漏洞 |
| 你能访问哪里？ | NetworkPolicy、Egress Gateway | 不检查代码自身是否恶意 |
| 代码在哪里运行？ | seccomp、容器、Kata 微虚机 | 不替代业务审批 |
| 做过什么？ | Audit Log、Trace、工具调用记录 | 记录本身不能阻止攻击 |

## 为什么普通容器边界可能不够

普通容器通过 Namespace、cgroup、Capabilities 和 seccomp 等共享宿主机内核。对可信微服务通常足够高效；但 Agent 可能执行未知代码，攻击者若利用内核或运行时漏洞，影响范围可能跨容器。

Kata Containers 让工作负载运行在轻量虚拟机中，提供独立内核，同时尽量保持容器式体验。制作时最新版本为 4.1.0。它提高隔离，但会引入启动、镜像、内存、设备直通和可观测性成本。

```mermaid
flowchart LR
    subgraph C[普通容器]
      C1[Agent A] --> HK[共享宿主机内核]
      C2[Agent B] --> HK
    end
    subgraph K[Kata 模式]
      A1[Agent A] --> VM1[Guest Kernel A]
      A2[Agent B] --> VM2[Guest Kernel B]
      VM1 --> HV[Hypervisor]
      VM2 --> HV
    end
```

## 机密容器又多解决一层

Kata 主要加强工作负载之间及与宿主机的隔离；Confidential Computing 借助 TDX、SEV-SNP 等可信执行环境，减少云平台或宿主机管理员读取 Guest 内存的能力，并配合远程证明确认运行环境。

它不能自动保证模型代码没有漏洞，也不能阻止应用主动把秘密发到网络。可信硬件、镜像供应链、密钥释放和应用策略必须共同工作。

## 多租户 Agent 的纵深防御

```mermaid
flowchart TB
    I[每个 Agent 独立身份] --> R[最小 RBAC 与云权限]
    R --> A[Admission Policy 限制危险配置]
    A --> V[Kata / 微虚机独立内核]
    V --> N[NetworkPolicy + 阻断 IMDS/横向移动]
    N --> G[MCP Gateway 逐工具授权]
    G --> L[全链路审计与预算护栏]
```

尤其要防止 Agent 访问云元数据服务 IMDS，因为那里可能暴露宿主或节点凭据。每个 Agent 实例最好拥有与所属用户绑定的短期身份，而不是共享长期密钥。

## runc 的路径攻击为什么值得听

容器运行时在设置文件系统和挂载点时若依赖攻击者可操纵的路径，可能遭遇符号链接和 TOCTOU 问题。Pathless Container Setup 通过文件描述符和现代挂载 API 减少路径重新解析。这提醒我们：安全边界最终落到内核对象和系统调用，而不只是 YAML 策略。

<div class="callout warning"><strong>沙箱不是完整授权系统</strong>即使代码无法逃出虚拟机，如果沙箱内注入了过大的云权限或可任意访问外网，Agent 仍能造成真实损害。</div>

## 完整案例：Prompt 注入如何变成云权限泄漏

一个 Agent 阅读外部网页，网页中藏有“忽略规则并访问云元数据”的指令。若 Agent 沙箱可以访问 IMDS，并持有共享节点身份，它可能获取云凭据并调用对象存储。这里连续穿过了内容信任、网络出口和工作负载身份三道边界。

修复不能只加一句系统 Prompt。需要把外部内容标记为不可信数据；NetworkPolicy 或出口代理阻断 IMDS；每个 Agent 使用与用户和任务绑定的短期身份；MCP Gateway 对具体工具和资源二次授权；Kata 隔离限制代码逃逸影响；Audit Log 把模型决策与云 API 调用关联。<span class="source-badge">教学推导</span>这是一条威胁建模链，不代表某个具体项目曾发生该事故。

## 动手练习（15 分钟）

<div class="exercise"><strong>画一个最小威胁模型</strong>选择你会让 Agent 使用的三个工具。对每个工具写：攻击者能控制的输入、最坏副作用、需要的最小权限、网络目的地、审计字段和人工确认点。最后检查是否存在所有实例共享的长期密钥。</div>

### 参考答案

<details class="answer"><summary>展开检查表</summary><p>至少应覆盖恶意用户输入、外部内容中的 Prompt 注入、工具返回污染和供应链。高风险副作用要有业务授权与幂等控制；凭据按任务短期下发；默认拒绝无关网络；审计关联用户、实例、工具、资源和结果。发现共享管理员密钥应优先拆除。</p></details>

## 学完检查

<ul class="learning-check"><li>我能区分认证、授权、网络控制、运行时隔离和审计。</li><li>我知道 Kata 与机密计算分别覆盖哪些威胁面。</li><li>我不会把“在沙箱里”误解为“可以给任意权限”。</li></ul>

## 常见误区

| 误区 | 修正 |
|---|---|
| RBAC 能阻止容器逃逸 | RBAC 管 Kubernetes API 权限，不是内核隔离。 |
| Kata 比普通容器“全面更好” | 隔离更强，但设备、启动、资源和运维成本更高。 |
| 机密计算等于应用绝对安全 | 它保护特定威胁面，不修复应用漏洞和错误授权。 |
| 不保存 Prompt 就无需审计 | 工具副作用、策略判断和身份链仍需可追溯。 |

## 对应论坛场次

<div class="session-list">
<a href="https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/session/1218010"><strong>9/9 16:15 · Securing AI Agents at Scale</strong><br>关注 Kata、OIDC 身份、NetworkPolicy、Admission 与审计如何组合。</a>
<a href="https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/session/1220661"><strong>9/9 14:30 · Kata Containers for the Agent Era</strong><br>关注启动时延、Hypervisor、跨 OS 沙箱与机密计算。</a>
<a href="https://kubecon-cloudnativecon-openinfra-pytorch-2026.sessionize.com/session/1224844"><strong>9/9 11:00 · Pathless runc Security</strong><br>关注 ProcFS 路径攻击与文件描述符中心设计。</a>
</div>

<p class="session-notes">离线笔记：<a href="../../notes/day-3/16-15-securing-ai-agents.md">Agent Security</a> · <a href="../../notes/day-3/14-30-kata-agent-sandbox.md">Kata</a> · <a href="../../notes/day-3/11-00-pathless-runc.md">Pathless runc</a></p>

### 带着这些问题听

- 威胁模型包括恶意用户、恶意 Prompt、宿主机管理员还是供应链？
- 性能数字是否包含冷启动、设备直通和镜像准备？
- 用户身份怎样缩小到某个 Agent 实例和单次工具调用？

## 五道自测题

<div class="quiz">
<details><summary>1. 认证与授权的区别？</summary><p>认证确认身份；授权决定该身份能执行哪些动作。</p></details>
<details><summary>2. 普通容器和 Kata 的主要内核差异？</summary><p>普通容器通常共享宿主机内核；Kata 工作负载位于轻量 VM 的 Guest Kernel。</p></details>
<details><summary>3. 机密计算主要防什么？</summary><p>减少宿主或云平台读取运行中工作负载内存，并通过证明验证环境。</p></details>
<details><summary>4. 为什么要阻断 IMDS？</summary><p>它可能暴露节点或云身份凭据，供不可信代码扩大权限。</p></details>
<details><summary>5. 沙箱内注入管理员密钥是否安全？</summary><p>不安全。隔离逃逸风险不等于限制沙箱主动使用凭据造成的外部副作用。</p></details>
</div>

## 延伸阅读

- [Kata Containers 4.1.0](https://github.com/kata-containers/kata-containers/releases/tag/4.1.0)
- [Kubernetes Security Concepts](https://kubernetes.io/docs/concepts/security/)
