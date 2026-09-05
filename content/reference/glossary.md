---
title: "中英双语术语表"
shortTitle: "术语表"
order: 90
kind: reference
track: "速查"
level: "随时查阅"
minutes: 20
updated: "2026-09-05"
summary: "把论坛高频缩写翻译成可以直接复述的中文，并指出容易混淆的概念。"
sessions: []
sources:
  - "https://kubernetes.io/docs/reference/glossary/"
---

## 使用方法

不要逐项背诵。听到陌生词时先查“一句话解释”，再跳回对应教程补上下文。

## 核心术语

| 术语 | 英文全称 | 通俗解释 | 容易混淆 | 首见章节 | 关联词 |
|---|---|---|---|---|---|
| Accelerator | Hardware Accelerator | 专门加速某类计算的设备总称，如 GPU、NPU | 不等同于 GPU | 01 | GPU、NPU |
| AI Infra | AI Infrastructure | 让模型能训练、上线、扩缩、观测和治理的一整套基础设施 | 不只是购买 GPU | 00 | Platform、Runtime |
| Control Plane | Control Plane | 保存期望状态并决定资源如何布置的控制路径 | 不承载每个在线 Token 请求 | 00 | Data Plane、Controller |
| Data Plane | Data Plane | 真正承载请求、数据和计算结果的执行路径 | 不等于 Kubernetes 控制面 | 00 | Gateway、Runtime |
| CPU | Central Processing Unit | 擅长控制逻辑和分支的通用处理器 | 核心少不代表任何任务都慢 | 01 | GPU、NUMA |
| GPU | Graphics Processing Unit | 擅长大量相似并行计算的处理器 | 显存占满不等于计算满载 | 01 | CUDA、HBM |
| NPU | Neural Processing Unit | 面向神经网络运算的专用加速器类别 | 不是一种统一架构 | 01 | Accelerator、Backend |
| XPU | Cross-architecture Processing Unit | PyTorch 等生态中对某类非 CUDA 加速设备的命名 | 不代表所有异构设备共享同一实现 | 03 | Accelerator、Backend |
| CUDA | Compute Unified Device Architecture | NVIDIA GPU 的编程平台和软件栈 | 不是 GPU 硬件本身 | 01 | Kernel、Stream |
| Tensor | Tensor | 带形状和数据类型的多维数组 | 与数学意义上的张量并非总是完全同义 | 03 | Operator、Autograd |
| Operator | Operator | 矩阵乘、Softmax 等“要做什么”的语义操作 | 不同于具体 Kernel 实现 | 03 | Kernel、Dispatcher |
| Kernel | Compute Kernel | 在具体设备上执行某个计算的小程序 | 不是操作系统内核 | 03 | Operator、Triton |
| Stream | Execution Stream | 加速器上按序提交异步工作的队列 | 不等于网络流 | 03 | Event、Synchronization |
| FLOPS | Floating-point Operations Per Second | 每秒浮点运算数量，用来描述计算吞吐 | 峰值不等于应用实测 | 01 | TOPS、MFU |
| TOPS | Tera Operations Per Second | 每秒万亿次操作，常用于低精度或整数能力 | 不可脱离精度直接比较 | 01 | FLOPS、Precision |
| Arithmetic Intensity | Arithmetic Intensity | 每搬运一个字节完成多少运算 | 不是 GPU 利用率 | 01 | Roofline、Bandwidth |
| Roofline | Roofline Model | 用计算峰值和带宽上限判断性能瓶颈的模型 | 不是单个 Benchmark 分数 | 01 | Arithmetic Intensity |
| HBM | High Bandwidth Memory | GPU 附近的高带宽内存 | 是显存的一种实现，不是缓存 | 01 | VRAM、Bandwidth |
| VRAM | Video Random Access Memory | 加速器可直接使用的设备内存，俗称显存 | 容量与带宽是两件事 | 01 | HBM、KV Cache |
| Memory Bandwidth | Memory Bandwidth | 单位时间内存能搬运的数据量 | 不等于内存容量 | 01 | Decode、Roofline |
| PCIe | Peripheral Component Interconnect Express | 连接 CPU、GPU、NIC 等设备的通用总线 | 通常不同于 GPU 专用互联 | 01 | NVLink、NIC |
| NVLink | NVIDIA NVLink | NVIDIA GPU 之间的高速互联 | 不是跨数据中心网络 | 01 | PCIe、NCCL |
| NIC | Network Interface Card | 服务器连接网络的网卡 | 不等于 RDMA 协议能力 | 01 | RDMA、RoCE |
| RDMA | Remote Direct Memory Access | 减少远端 CPU 参与的直接内存访问能力 | InfiniBand 与 RoCE 是承载方式 | 01 | GPUDirect、NIC |
| GPUDirect RDMA | GPU Direct Remote Direct Memory Access | 让网卡更直接地访问 GPU 内存 | 不会消除网络物理上限 | 05 | RDMA、NCCL |
| InfiniBand | InfiniBand | 常用于 HPC/AI 集群的低延迟网络体系 | 不等于 RDMA 这个能力概念 | 01 | RoCE、Fabric |
| RoCE | RDMA over Converged Ethernet | 在以太网上承载 RDMA 的方式 | 不等于普通无损以太网配置自动完成 | 01 | RDMA、InfiniBand |
| NUMA | Non-Uniform Memory Access | CPU、内存和设备距离不同，访问代价也不同的拓扑 | 不只是多路 CPU 数量 | 01 | Affinity、Topology |
| Kubernetes | Kubernetes | 用声明式 API 管理容器工作负载的集群系统 | 不会自动优化模型算法 | 02 | Pod、Controller |
| Pod | Pod | Kubernetes 的最小调度单位，可含多个容器 | 不是轻量虚拟机 | 02 | Node、kubelet |
| Node | Node | 承载 Pod 的工作节点 | 不等于一个 Pod | 02 | kubelet、Scheduler |
| API Server | Kubernetes API Server | Kubernetes 控制面的统一 API 入口 | 不是业务 API 网关 | 02 | etcd、Controller |
| etcd | etcd | 保存 Kubernetes 期望与当前状态的分布式键值库 | 不适合存模型权重 | 02 | API Server、State |
| kubelet | kubelet | 每个节点上负责准备并运行 Pod 的代理 | 不负责全局选节点 | 02 | Scheduler、Node |
| Controller | Controller | 持续比较期望与现实并纠偏的控制程序 | 不等于一次性部署脚本 | 02 | Reconciliation、Operator |
| Reconciliation Loop | Reconciliation Loop | 持续观察、比较并缩小状态差异的循环 | 不等于轮询全部对象 | 02 | Controller、Informer |
| CRD | Custom Resource Definition | 给 Kubernetes 增加自定义 API 对象的定义 | CRD 自身不包含控制逻辑 | 02 | Operator、Controller |
| Operator | Operator Pattern | 用控制器管理特定领域应用生命周期的模式 | 不等于 PyTorch Operator | 02 | CRD、Controller |
| Scheduler | kube-scheduler | 为未绑定 Pod 过滤、打分并选择节点 | 不负责推理请求路由 | 02 | Affinity、DRA |
| Request | Resource Request | Pod 向调度器声明的保底资源需求 | 不等于实时使用量 | 02 | Limit、Quota |
| Limit | Resource Limit | 容器允许运行时使用的资源上限 | GPU 扩展资源语义可能不同 | 02 | Request、cgroup |
| Affinity | Affinity and Anti-affinity | 用规则表达 Pod/节点希望靠近或分开的关系 | 不保证设备内部拓扑最优 | 02 | Taint、Topology |
| Taint/Toleration | Taint and Toleration | 节点拒绝普通 Pod、特定 Pod 明确容忍的机制 | 不等于亲和性 | 02 | Affinity、Node |
| HPA | Horizontal Pod Autoscaler | 按指标增减 Pod 副本的控制器 | 默认 CPU 指标不适合直接代表 LLM 压力 | 07 | Autoscaling、Queue |
| Informer | Shared Informer | 缓存对象并接收 API 事件的客户端机制 | 缓存过大也会成为瓶颈 | 02 | Controller、Watch |
| PyTorch | PyTorch | 模型表达、自动微分、编译和分布式执行框架 | 不只用于训练 | 03 | Autograd、Inductor |
| Eager Mode | Eager Execution Mode | Python 运行到哪，张量操作就执行到哪 | 不等于没有计算图信息 | 03 | Graph、torch.compile |
| Autograd | Automatic Differentiation | 自动记录运算关系并按链式法则求梯度 | 不等于数值差分 | 03 | Backward、AOTAutograd |
| torch.compile | torch.compile | 捕获并优化 PyTorch 程序的入口 | 不是一个单独编译器 | 03 | TorchDynamo、Inductor |
| TorchDynamo | TorchDynamo | 从 Python 执行中捕获张量计算图的组件 | 不负责最终 GPU Kernel 全部工作 | 03 | Graph Break、Inductor |
| AOTAutograd | Ahead-of-Time Autograd | 提前整理前向与反向计算图以便编译 | 不等于关闭 Autograd | 03 | Autograd、Inductor |
| Inductor | TorchInductor | PyTorch 默认编译后端，做融合和代码生成 | 不等于 Triton 语言 | 03 | torch.compile、Triton |
| Triton | Triton Language | 用 Python 风格编写高性能 GPU Kernel 的语言与编译器 | 不同于 Triton Inference Server | 03 | Kernel、Inductor |
| Graph Break | Graph Break | 图捕获因动态行为等原因中断并回到普通执行 | 不一定是错误，但会影响性能 | 03 | TorchDynamo、Dynamic Shape |
| Mixed Precision | Mixed Precision Training | 在可接受误差下混用不同数值精度 | 不等于所有张量都改成 FP16 | 03 | FP16、BF16 |
| BF16 | Brain Floating Point 16 | 指数范围接近 FP32 的 16 位浮点格式 | 与 FP16 精度和范围不同 | 03 | FP16、Mixed Precision |
| DDP | Distributed Data Parallel | 多进程复制模型、切数据并同步梯度 | 不会切分完整模型状态 | 04 | Data Parallel、AllReduce |
| Data Parallel | Data Parallelism | 各设备处理不同数据分片 | 不同于 Tensor Parallel | 04 | DDP、FSDP |
| Tensor Parallel | Tensor Parallelism | 把一个算子的张量计算切到多设备 | 不是 FSDP 参数状态切分 | 04 | Megatron、Collective |
| Pipeline Parallel | Pipeline Parallelism | 把不同模型层放到不同阶段执行 | 会产生流水线空泡 | 04 | Microbatch、Bubble |
| Expert Parallel | Expert Parallelism | 把 MoE 专家分布到不同设备 | 常伴随 All-to-All | 04 | MoE、Router |
| Sequence Parallel | Sequence Parallelism | 沿序列维度切分部分计算与激活 | 不等于 Pipeline Parallel | 04 | Tensor Parallel、MoE |
| FSDP | Fully Sharded Data Parallel | 切分参数、梯度和优化器状态的数据并行 | 不等同于张量并行 | 04 | FSDP2、AllGather |
| FSDP2 | Fully Sharded Data Parallel 2 | PyTorch 以参数维度组合切分的新一代 FSDP 接口 | 接口仍应以当前文档为准 | 04 | FSDP、DTensor |
| Megatron | Megatron-LM | 大模型多维并行训练框架与技术体系 | 不只指张量并行 | 04 | TP、PP、EP |
| MoE | Mixture of Experts | 每个 Token 只激活少量专家的稀疏模型 | 参数量大不代表每次全计算 | 04 | Expert Parallel、All-to-All |
| Collective | Collective Communication | 多个进程共同参与并规定最终数据分布的通信 | 不同于点对点 Send/Recv | 05 | NCCL、Process Group |
| Broadcast | Broadcast | 从一个成员把同一数据发给全部成员 | 不做归约计算 | 05 | Collective、AllReduce |
| AllReduce | All-Reduce | 归约各成员数据并把完整结果交给每个成员 | 不是只集中到一个节点 | 05 | DDP、Ring |
| AllGather | All-Gather | 收集各成员分片，让每个成员得到完整集合 | 不执行求和 | 05 | FSDP、ReduceScatter |
| ReduceScatter | Reduce-Scatter | 先归约数据，再把结果分片给各成员 | 不是 AllReduce 的别名 | 05 | FSDP、AllGather |
| All-to-All | All-to-All | 每个成员向所有其他成员发送不同分片 | MoE 中容易形成通信热点 | 05 | MoE、Expert Parallel |
| NCCL | NVIDIA Collective Communications Library | NVIDIA GPU 集合通信库 | 不是网卡或网络协议 | 05 | Collective、NVLink |
| Rank | Process Rank | 通信组内进程的编号和身份 | 不等于物理 GPU 永久编号 | 05 | World Size、Process Group |
| Checkpoint | Checkpoint | 保存模型与训练状态，用于恢复或继续 | 不同于 KV Cache | 04 | RTO、Object Storage |
| Dataset | Dataset | 训练或评测所使用的数据集合 | 不等于模型权重 | 04 | DataLoader、Object Storage |
| Model Weights | Model Weights | 模型学习得到的参数文件 | 不包含每个请求的 KV Cache | 06 | Checkpoint、Cold Start |
| Object Storage | Object Storage | 通过对象键保存大文件的数据服务 | 不适合低延迟细粒度共享内存 | 04 | Dataset、Checkpoint |
| LLM | Large Language Model | 以大量参数建模并生成语言 Token 的模型 | 不等于完整 Agent | 06 | Token、Agent |
| Token | Token | Tokenizer 切分后模型处理的离散单元 | 一个字或单词不总等于一个 Token | 06 | Tokenizer、Context |
| Prefill | Prefill Phase | 一次处理输入 Token 并建立 KV Cache 的阶段 | 与逐 Token Decode 不同 | 06 | TTFT、KV Cache |
| Decode | Decode Phase | 基于已有状态逐步生成新 Token 的阶段 | 不等于解码压缩文件 | 06 | TPOT、Memory Bandwidth |
| KV Cache | Key-Value Cache | 保存注意力历史状态，避免 Decode 重算旧 Token | 不是模型权重缓存 | 06 | Prefix Caching、Offload |
| Continuous Batching | Continuous Batching | 每个生成步动态加入和移除请求的批处理 | 不是固定静态 Batch | 06 | Scheduler、Throughput |
| Prefix Caching | Prefix Caching | 复用共享提示前缀已经算好的 KV 状态 | 不等于浏览器缓存 | 06 | KV Cache、Cache-aware Routing |
| TTFT | Time to First Token | 从请求开始到首个 Token 返回的时间 | 不代表完整回答时间 | 06 | Prefill、Queueing |
| TPOT | Time per Output Token | 首个 Token 后相邻输出 Token 的平均间隔 | 不同于 TTFT | 06 | ITL、Decode |
| ITL | Inter-token Latency | 连续输出 Token 之间的延迟 | 有时口径与 TPOT 略有差异 | 06 | TPOT、Tail Latency |
| Throughput | Throughput | 单位时间完成的请求或 Token 数 | 高吞吐不保证低延迟 | 06 | Latency、Batch |
| Tail Latency | Tail Latency | 最慢一小部分请求的延迟，如 P99 | 不等于平均延迟 | 06 | P95、P99 |
| P50/P95/P99 | Percentiles | 50%、95%、99% 请求不超过的延迟分位点 | 不是平均值 | 06 | Tail Latency、SLO |
| Cold Start | Cold Start | 新副本从启动到能服务请求的准备期 | 不只包含容器启动 | 06 | Model Loading、Autoscaling |
| Model Loading | Model Loading | 从存储读取权重并放入 CPU/GPU 内存 | 不等于模型初始化代码结束 | 06 | Cold Start、Object Storage |
| vLLM | vLLM | 高性能 LLM 推理与服务运行时 | 不替代 Kubernetes | 07 | PagedAttention、KV Cache |
| SGLang | SGLang | 面向 LLM 与多模态模型的高性能服务框架 | 与 vLLM 能力交叠但实现不同 | 07 | Runtime、Radix Cache |
| P/D Disaggregation | Prefill-Decode Disaggregation | 把 Prefill 与 Decode 放到独立工作池 | 不保证任何场景都更快 | 07 | KV Transfer、Routing |
| Cache-aware Routing | Cache-aware Routing | 优先把请求送到已有相关缓存的副本 | 不只是最少连接路由 | 07 | Prefix Caching、Session Affinity |
| Offload | Memory Offloading | 把暂不用的数据移到 CPU 内存或存储 | 省显存但增加传输延迟 | 06 | KV Cache、Object Storage |
| LRU | Least Recently Used | 优先淘汰最久未访问缓存项的策略 | 不考虑访问频率全貌 | 07 | ARC、Eviction |
| ARC | Adaptive Replacement Cache | 在近期性和频繁性之间自适应的缓存策略 | 不等同于 LRU | 07 | LRU、KV Cache |
| DRA | Dynamic Resource Allocation | Kubernetes 对复杂设备进行声明式申请和分配的机制 | 不是队列系统 | 08 | ResourceClaim、Driver |
| ResourceClaim | ResourceClaim | Pod 对具体设备属性和生命周期的声明 | 不等于整数资源 Request | 08 | DRA、DeviceClass |
| Device Plugin | Kubernetes Device Plugin | 把设备以扩展资源暴露给 kubelet 的旧有机制 | 与 DRA 的声明模型不同 | 08 | DRA、kubelet |
| Gang Scheduling | Gang Scheduling | 一组任务同时获得足够资源，否则一起等待 | 不是提高单个 Pod 优先级 | 08 | PodGroup、Volcano |
| PodGroup | PodGroup | 表达一组 Pod 最小可运行规模的对象概念 | 不是原生 Pod 副本数 | 08 | Gang Scheduling、LWS |
| Kueue | Kueue | Kubernetes 工作负载准入、配额和队列系统 | 不替代 kube-scheduler | 08 | Queue、Admission |
| Volcano | Volcano | 面向批处理与 AI 的 Kubernetes 调度平台 | 不只是一个队列 | 08 | Gang Scheduling、Scheduler |
| LWS | LeaderWorkerSet | 管理 Leader 与 Worker 组成的多 Pod 工作负载 | 不等于 StatefulSet | 08 | PodGroup、Replica |
| Karmada | Kubernetes Armada | 多 Kubernetes 集群的策略与工作负载编排系统 | 不会改变跨地域物理网络 | 08 | Federation、Placement |
| HAMi | Heterogeneous AI Computing Virtualization Middleware | GPU 共享、调度与监控项目 | 不保证任意切分都无性能代价 | 08 | GPU Sharing、MIG |
| Agent | AI Agent | 让模型循环观察、决策并调用工具的系统 | 不等于单次 LLM 调用 | 09 | Runtime、MCP |
| Agent Runtime | Agent Runtime | 管理 Agent 状态、工具、预算和生命周期的平台 | 不只是模型 API 包装 | 09 | Workflow、Sandbox |
| MCP | Model Context Protocol | Agent 发现和调用工具的开放协议 | 不负责授权与沙箱 | 09 | Tool Gateway、Identity |
| Workflow | Workflow | 预先定义步骤、依赖和重试的执行流程 | 与模型动态决策不同 | 09 | Argo、Agent |
| Sandbox | Sandbox | 限制不可信代码文件、网络、系统调用和资源的执行环境 | 不等于完整业务授权 | 09 | Kata、seccomp |
| OIDC | OpenID Connect | 基于 OAuth 2.0 的身份认证协议 | 认证不等于授权 | 10 | Identity、Token |
| ServiceAccount | Kubernetes Service Account | Pod 调用 Kubernetes API 时使用的工作负载身份 | 不应共享长期高权限凭据 | 10 | RBAC、OIDC |
| RBAC | Role-Based Access Control | 按角色控制 API 操作权限的机制 | 不负责内核隔离 | 10 | Authorization、ServiceAccount |
| NetworkPolicy | Network Policy | 约束 Pod 网络流量方向和对象的策略 | 是否生效取决于网络实现 | 10 | Egress、Zero Trust |
| seccomp | Secure Computing Mode | 过滤 Linux 进程可调用系统调用的机制 | 不等于独立内核 | 10 | Sandbox、Capabilities |
| Kata Containers | Kata Containers | 用轻量虚拟机提供容器体验和独立 Guest Kernel | 不等于机密计算全部能力 | 10 | Hypervisor、Sandbox |
| Confidential Computing | Confidential Computing | 借助可信执行环境保护使用中的数据 | 不修复应用漏洞 | 10 | TDX、SEV-SNP |
| IMDS | Instance Metadata Service | 云主机获取实例信息与临时凭据的服务 | 不可信代码不应任意访问 | 10 | SSRF、Identity |
| Audit Log | Audit Log | 记录谁在何时对什么执行了什么动作 | 记录不能自动阻止攻击 | 10 | Trace、Compliance |
| Metrics | Metrics | 按时间聚合的数值信号 | 不能单独还原一次请求 | 11 | Logs、Traces |
| Logs | Logs | 带上下文的离散事件记录 | 不天然具有跨服务因果关系 | 11 | Metrics、Trace ID |
| Traces | Distributed Traces | 还原一次请求跨组件路径和耗时 | 采样会遗漏部分请求 | 11 | Span、OpenTelemetry |
| Profiles | Profiles | 展示代码或 Kernel 时间花在哪里 | 不等于请求级 Trace | 11 | Flame Graph、Kernel |
| OpenTelemetry | OpenTelemetry | 统一生成、采集和传输遥测信号的标准生态 | 不等于某个监控后端 | 11 | SemConv、OTLP |
| RED | Rate Errors Duration | 从请求视角观察速率、错误和耗时的方法 | 对 LLM 还需 Token 阶段指标 | 11 | USE、SLO |
| USE | Utilization Saturation Errors | 从资源视角观察利用率、饱和度和错误的方法 | 高利用率不等于高有效产出 | 11 | RED、GPU |
| RTO | Recovery Time Objective | 故障后目标恢复时间 | 不等于允许丢失的数据量 | 11 | RPO、Checkpoint |
| RPO | Recovery Point Objective | 故障后允许丢失的状态或数据范围 | 不等于恢复花费时间 | 11 | RTO、Checkpoint |
| MFU | Model FLOPs Utilization | 实际模型计算量相对硬件理论峰值的利用比例 | 不等于 GPU busy 百分比 | 11 | FLOPS、Efficiency |

## 三组必须分清的词

### 调度、编排、路由

- **调度**决定工作负载放在哪台机器、哪张设备上。
- **编排**管理它从创建、更新到销毁的完整生命周期。
- **路由**决定一次在线请求进入哪个可用副本。

### 延迟、吞吐、利用率

- **延迟**回答一个请求等多久。
- **吞吐**回答单位时间完成多少工作。
- **利用率**描述资源忙碌程度，但高利用率不一定等于高有效产出。

### Checkpoint 与 KV Cache

Checkpoint 保存训练状态，用于失败后恢复；KV Cache 保存推理中的注意力历史，用于减少重复计算。二者都叫“缓存/保存”，生命周期和目标完全不同。
