# Residual Synaptic Pruning / 微光剪枝

## 1. Why Pruning?

突触会生长，也必须剪枝。
否则系统会无限膨胀，变成垃圾山。

没有剪枝，训练候选池会把重复、低质、过期、风险升高、撤回授权、无法复现或不再降低 D 的材料继续保留在活跃路径中。微光剪枝让系统知道什么该保留，什么该合并，什么该休眠，什么该堆肥，什么必须隔离或遗忘。

## 2. Pruning Actions

1. Keep / 保留
2. Merge / 合并
3. Downgrade / 降级
4. Dormant / 休眠
5. Compost / 堆肥
6. Quarantine / 隔离
7. Forget / 遗忘

## 3. Principle

文明不是记住一切，而是知道什么该传承，什么该堆肥，什么该安葬，什么必须遗忘。

微光剪枝的目标：
不让真正能降低 D 的微光，被噪音淹没。
