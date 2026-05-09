export interface FeatureModule {
  title: string;
  englishTitle: string;
  href: string;
  description: string;
  status: 'interactive' | 'mock-report' | 'concept';
  signal: string;
}

export const featureModules: FeatureModule[] = [
  {
    title: '我需要什么',
    englishTitle: 'Wish Pool',
    href: '/wish-pool',
    description: '愿望不是愿望，是未来任务的坐标。提交愿望后计算 Need Score，并生成残差卡。',
    status: 'interactive',
    signal: '愿望增加'
  },
  {
    title: '我多余什么',
    englishTitle: 'Reverse Wish Pool',
    href: '/reverse-wish-pool',
    description: '把闲置经验、流程和素材作为潜在供给，等待被真实需求接住。',
    status: 'interactive',
    signal: '潜在供给'
  },
  {
    title: '我失败了什么',
    englishTitle: 'Garbage Station',
    href: '/garbage-station',
    description: '垃圾不是垃圾，是未分类的残差。失败、错题、跑偏输出会先脱敏再分类。',
    status: 'interactive',
    signal: '残差投喂'
  },
  {
    title: '我能接住什么',
    englishTitle: 'Cognitive Fingerprint',
    href: '/cognitive-fingerprint',
    description: '用自有的认知指纹描述你擅长提出、压缩和连接的残差类型。',
    status: 'mock-report',
    signal: '能力映射'
  },
  {
    title: '残差卡',
    englishTitle: 'Residual Cards',
    href: '/residual-cards',
    description: '显式展示 C + D = 1、当前 D、目标 D、预计 ΔD、复用和审核状态。',
    status: 'mock-report',
    signal: '压缩潜力'
  },
  {
    title: 'Jelly Core',
    englishTitle: 'Jelly Core',
    href: '/jelly-core',
    description: '认知水母主界面，用触手、发光点和指标呈现系统状态变化。',
    status: 'interactive',
    signal: '生命体征'
  },
  {
    title: '水母智能体架构',
    englishTitle: 'Jelly Agent Architecture',
    href: '/jelly',
    description: '把水母的神经网、触手、刺胞、透明身体、微光、消化和生命周期工程化为智能体器官。',
    status: 'mock-report',
    signal: '架构微光'
  },
  {
    title: '技能池',
    englishTitle: 'Skill Memory Pool',
    href: '/skill-memory-pool',
    description: '展示技能胶囊、缓存命中记录、技能版本、失败案例和节省成本估计。',
    status: 'mock-report',
    signal: '缓存命中'
  },
  {
    title: '结晶商店',
    englishTitle: 'Jelly Crystal Store',
    href: '/crystal-store',
    description: '把高频残差、答案程序、验证器和失败边界沉淀为可调用、可分叉、可反哺模型的数据结晶。',
    status: 'mock-report',
    signal: '数据结晶'
  },
  {
    title: '复调版本',
    englishTitle: 'Polyphonic Versioning',
    href: '/polyphony',
    description: '让白皮书、技能、缓存、UI、Agent 规则和世界模型在多声部 DAG 中并行演化。',
    status: 'mock-report',
    signal: '多声部合流'
  },
  {
    title: '审核池',
    englishTitle: 'Review Pool',
    href: '/review-pool',
    description: '把 novelty、usefulness、reusability、evidenceStrength 与 risk 转为审核建议。',
    status: 'mock-report',
    signal: '审核通过'
  },
  {
    title: '贡献账本',
    englishTitle: 'Contribution Ledger',
    href: '/contribution-ledger',
    description: '展示谁提出愿望、谁投喂、谁审核、谁测试、谁让技能升级。',
    status: 'mock-report',
    signal: '贡献发光'
  },
  {
    title: '想法公证处',
    englishTitle: 'Idea Notary',
    href: '/idea-notary',
    description: '公证处不判断价值，只证明历史。记录愿望、灵感与残差的时间戳。',
    status: 'mock-report',
    signal: '历史证明'
  },
  {
    title: '偏见收容所',
    englishTitle: 'Bias Shelter',
    href: '/bias-shelter',
    description: '系统免疫器官，不处理单个任务，只检测系统病。',
    status: 'mock-report',
    signal: '偏见报警'
  },
  {
    title: '人类安置层',
    englishTitle: 'Human Transition Layer',
    href: '/human-transition',
    description: '不能用降低 D_task 的方式，制造更大的 D_human。',
    status: 'mock-report',
    signal: '尊严保护'
  },



  {
    title: '生态连接层',
    englishTitle: 'Ecosystem Gateway',
    href: '/ecosystem',
    description: '连接用户、团队、组织、技能、共享缓存、贡献账本和公共知识资产。',
    status: 'mock-report',
    signal: '共享缓存'
  },
  {
    title: '世界体验接口',
    englishTitle: 'World Experience Gateway',
    href: '/worlds',
    description: '连接游戏、模拟器、动漫世界、虚拟场景和真实体验反馈，生成体验证明与世界残差。',
    status: 'mock-report',
    signal: '体验证明'
  },
  {
    title: '连接层',
    englishTitle: 'Integration Gateway',
    href: '/integrations',
    description: '模型 Provider 与外部 App Connector 的官方 API/OAuth/mock 连接层。',
    status: 'mock-report',
    signal: '安全连接'
  },
  {
    title: '成长中心',
    englishTitle: 'Growth Center',
    href: '/growth-center',
    description: '等级、成就、每日补给、日常/周常任务与赛季目标的认知生命体成长记录。',
    status: 'interactive',
    signal: '有效成长'
  },
  {
    title: '认知大陆',
    englishTitle: 'Cognitive Map',
    href: '/cognitive-map',
    description: '把技能池、缓存和残差堆积可视化为可探索的认知海域地图。',
    status: 'mock-report',
    signal: '海域探索'
  },
  {
    title: '共鸣工坊',
    englishTitle: 'Resonance Workshop',
    href: '/resonance-workshop',
    description: '低门槛 DIY 水母、空间、身份展示和功能界面，外观不影响能力。',
    status: 'interactive',
    signal: '安静创作'
  },
  {
    title: '幻化工坊',
    englishTitle: 'Avatar Morphing',
    href: '/avatar-morphing',
    description: '保留认知水母母体，同时允许原创风格幻化与身份投影。',
    status: 'interactive',
    signal: '外观自由'
  },
  {
    title: '认知遗嘱',
    englishTitle: 'Cognitive Will',
    href: '/cognitive-will',
    description: '一个人的想法、技能和贡献在离开系统后，如何闭环。',
    status: 'concept',
    signal: '闭环'
  }
];

export const primaryEntryModules = featureModules.slice(0, 4);
