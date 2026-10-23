import faqs from '@data/faqs.json';
import features from '@data/features.json';
import pricing from '@data/pricing.json';

/**
 * 中文文案表。本文件定义了全站唯一的文案结构（见 `./index.ts` 中的 `Copy`），
 * 组件与视图中不写死任何面向用户的文字。
 *
 * 路径均为未本地化路径（如 `/products`，而非 `/zh/products`）；调用方通过
 * `@utils/locale` 的 `localePath()` 处理语言前缀。
 */
export const zh = {
  site: {
    /** 页面未单独设置时的默认 <meta name="description">。 */
    description:
      '写一些我想写的东西，你可能会找到关于编程、云原生、飞行、文学等随机内容。',
    /** 每个页面结构化数据（JSON-LD）中 WebSite.description 的值。 */
    descriptionShort: '随便一点，想写点啥就写点啥吧！',
    ogTitle: '星陨的博客：编程、云原生、飞行与文学',
    ogDescription:
      '写一些我想写的东西，你可能会找到关于编程、云原生、飞行、文学等随机内容。欢迎来逛逛，也欢迎留言交流。',
  },

  layout: {
    skipToContent: '跳到主要内容',
    changeLanguage: '切换语言',
    toggleNavigation: '展开导航',
    darkTheme: '切换为暗色主题',
    lightTheme: '切换为浅色主题',
    toggleTheme: '切换主题',
  },

  nav: {
    /** `@data/navigation` 中 navLinks 各 id 对应的标签。 */
    labels: {
      home: '首页',
      products: '产品',
      services: '服务',
      blog: '博客',
      contact: '联系',
    },
    footer: {
      /** `@data/navigation` 中 footerSections 各 id 对应的标题与链接文字。 */
      sectionTitles: {
        ecosystem: '生态',
        company: '关于',
      },
      links: {
        documentation: '文档',
        tools: '工具与设备',
        services: '建筑服务',
        about: '关于我们',
        blog: '博客',
        careers: '加入我们',
        customers: '客户',
      },
      hiringBadge: '我们在招人！',
      stayUpToDate: '保持联系',
      stayUpToDateContent: '订阅更新，第一时间收到新文章。',
      craftedBy: '保留所有权利。',
      newsletterDemoMessage:
        '谢谢！（演示表单——接入邮件服务后才能收集真实订阅。）',
    },
    /** 可选 mega menu（`@data/mega_link`）的文案。 */
    megaMenu: {
      services: {
        guides: {
          title: '探索建议与说明',
          description: '深入了解各类文章、教程与背后的思考',
        },
        integrations: {
          title: '发现集成',
          description: '提升你的工作流，与你喜爱的工具无缝衔接',
        },
        experts: {
          title: '专家服务',
          description: '在工具之外，获得更专业的支持与服务',
        },
        tools: {
          title: '前沿工具',
          description: '更聪明、更快地构建：体验新一代效率工具',
        },
        plans: {
          title: '简单方案',
          description: '清晰透明、以价值为导向的方案，帮你提升效率',
        },
        community: {
          title: '社区交流',
          description: '与其他读者一起学习、分享、连接',
        },
      },
      successStories: '成果故事',
      successStory: {
        description: '看看大家如何在这里获得启发与帮助。',
        imageAlt: '一位微笑者的肖像',
      },
      learnMore: '了解更多',
    },
  },

  forms: {
    email: '邮箱',
    emailAddress: '邮箱地址',
    emailPlaceholder: '输入你的邮箱',
    emailInvalid: '请输入有效的邮箱地址，方便我们回复你',
    subscribe: '订阅',
    phone: '手机号',
    password: '密码',
    confirmPassword: '确认密码',
    forgotPassword: '忘记密码？',
    passwordHint: '至少 8 个字符',
    passwordMismatch: '两次输入的密码不一致',
    rememberMe: '记住我',
    acceptTerms: '我接受',
    termsAndConditions: '条款与条件',
    or: '或',
    demoFallbackMessage: '演示表单——尚未接入后端，不会发送任何数据。',
  },

  auth: {
    logIn: '登录',
    signIn: '登录',
    signUp: '注册',
    signInWithGoogle: '使用 Google 登录',
    signUpWithGoogle: '使用 Google 注册',
    noAccountYet: '还没有账号？',
    signUpHere: '立即注册',
    alreadyHaveAccount: '已经有账号了？',
    signInHere: '去登录',
    forgotPasswordTitle: '忘记密码？',
    rememberYourPassword: '想起密码了？',
    resetPassword: '重置密码',
    credentialsDemoNotice:
      '演示表单——接入真实认证服务之前，请勿收集任何凭据。',
    recoveryDemoNotice: '演示表单——密码找回尚未接入后端。',
    signInDemoMessage: '演示表单——登录尚未接入后端。',
    registerDemoMessage: '演示表单——注册尚未接入后端。',
    recoverDemoMessage: '演示表单——密码找回尚未接入后端。',
  },

  share: {
    share: '分享',
    shareOn: (platform: string) => `分享到 ${platform}`,
    copied: '已复制',
    copyLink: '复制链接',
  },

  banner: {
    dismiss: '关闭',
    region: '信息横幅',
  },

  blog: {
    readMore: '阅读全文',
    minRead: (minutes: number) => `${minutes} 分钟阅读`,
    relatedArticles: '相关文章',
    wasHelpful: '这篇文章对你有帮助吗？',
    yes: '有帮助',
    no: '没有',
    ogSection: '博客',
  },

  insights: {
    readMore: '阅读更多',
    tableOfContents: '目录：',
    ogSection: '随想',
  },

  products: {
    ogSection: '产品',
    tabs: '标签页',
  },

  notFound: {
    title: '页面不存在',
    subTitle: '哎呀，你要找的页面不见了！',
    content: '别让这点小插曲打乱节奏，回到首页继续逛逛吧。',
    goHome: '回到首页',
    goBack: '返回上一页',
  },

  home: {
    banner: '阅读最新文章',
    hero: {
      title:
        '欢迎来到 <span class="text-yellow-500 dark:text-yellow-400">星陨的博客</span>',
      subTitle: '写一些我想写的东西：编程、云原生、飞行、文学，想到什么写什么。',
      primaryBtn: '开始阅读',
      secondaryBtn: '联系我',
      rating: '<span class="font-bold">100+</span> 篇',
      reviews: '累计写下的文章与随想',
      imageAlt: '堆叠摆放的工具产品盒，里面装着各种工具',
    },
    clients: {
      title: '友情链接',
      subTitle: '一些常来常往的伙伴。',
    },
    featuresGeneral: {
      title: '关于这个小站',
      subTitle:
        '这里记录编程、云原生、飞行与文学——想写就写，不定期更新。希望其中的某几篇恰好对你有用。',
      imageAlt: '悬浮的产品盒',
    },
    featuresNavs: {
      title:
        '把 <span class="text-yellow-500 dark:text-yellow-400">想到的</span> 都写下来',
      tabs: {
        tools: {
          heading: '持续写作',
          content:
            '把学到的、想到的写下来：技术心得、踩坑记录、读书笔记。不定期更新，但每次都认真。',
          alt: '草地上的黄色重型机械',
        },
        dashboard: {
          heading: '云原生笔记',
          content:
            '记录容器、Kubernetes、可观测性等云原生技术的实践与思考。',
          alt: '仪表盘界面的截图或示意图',
        },
        features: {
          heading: '飞行与随想',
          content: '关于飞行、阅读与生活的零散记录，以及一些不成体系的随想。',
          alt: '航拍视角的城市与工地',
        },
      },
    },
    testimonials: {
      title: '读者的话',
      subTitle: '来自读者的一些反馈与鼓励。',
      quotes: [
        {
          content:
            '内容扎实、更新克制，是我常来的博客。编程和云原生的文章尤其有帮助，能看到真实踩过的坑。',
          author: '李婉',
          role: '后端工程师',
        },
      ],
      statistics: [
        {
          count: '100+',
          description: '篇原创文章与随笔',
        },
        {
          count: '12.8k',
          description: '次累计阅读',
        },
        {
          count: '4',
          description: '个主要专栏：编程、云原生、飞行、文学',
        },
        {
          count: '∞',
          description: '继续写下去的理由',
        },
      ],
    },
    faqTitle: '常见<br />问题',
    heroAlt: {
      title: '一起交流',
      subTitle: '感谢你的阅读，欢迎随时通过邮件或留言与我交流。',
      btn: '联系我',
    },
  },

  services: {
    title: '服务',
    metaDescription:
      '我们与专业机构合作，为你提供工具与施工领域的咨询服务与完整解决方案，覆盖从咨询到项目完成的全过程。',
    ogTitle: '专业咨询服务 | 星陨的博客',
    intro: {
      title: '让专业与你的想法相遇',
      subTitle:
        '我们在工具与施工行业提供全面的解决方案与出色的服务。经验丰富的团队会从项目构想阶段开始，通过一系列专业服务支持你直到项目完成。',
      cta: '预约咨询',
    },
    articles: {
      guidance: {
        title: '提供专业指导',
        subTitle:
          '接手一个建筑项目可能会让人不知所措。凭借专业的咨询服务，我们会在每个阶段为你提供指导，帮助你做出明智的决策。无论你是 DIY 爱好者还是熟练的承包商，我们的专家都能就产品选择、项目范围以及当地法规合规性提供量身定制的建议。',
        imageAlts: ['蓝图与显示施工计划的平板电脑。', '在办公室工作的人'],
      },
      craftsmanship: {
        title: '让设计成为现实',
        subTitle:
          '我们技艺娴熟的工匠为每个施工项目带来精度与卓越。从小型安装到大型结构工程，我们提供可靠的施工服务，把你的计划变成看得见的成果。我们使用高质量的工具和材料，确保施工与安全达到最高标准。',
        imageAlts: ['施工现场的前后对比'],
        cta: '了解更多',
      },
      oversight: {
        title: '以专业监管推进项目',
        subTitle:
          '有效的项目管理是任何一次成功建造的核心。我们提供周密的规划与稳健的管理服务，让你的项目按时、按预算推进。把工作流协调、资源分配与干系人沟通这些复杂事务交给我们，你专注于自己的构想即可。',
        imageAlts: ['正在统筹项目的施工人员', '受管控施工现场的航拍图'],
      },
      maintenance: {
        title: '保障长期性能',
        subTitle:
          '我们对项目的承诺不会在完工时结束。我们提供持续的维护与支持服务，确保你的建筑经久耐用。从定期检查到紧急协助，响应迅速的团队随时为你提供顺畅支持。',
        imageAlts: ['身穿橙色与黑色背心、戴着白色头盔、手持黄色电动工具的人'],
      },
      bespoke: {
        title: '为独特挑战定制策略',
        subTitle:
          '对于规模较大的企业客户，我们提供针对特定行业挑战量身定制的解决方案。通过理解你的独特需求，我们为你设计定制化策略，目标是优化运营、提升效率并推动业务向前。',
        imageAlts: ['正在施工中的建筑结构', '施工中的棕灰色建筑'],
        cta: '阅读更多',
      },
    },
    stats: {
      title: '用数据说话',
      subTitle:
        '我们对质量与可靠性的承诺体现在承担的每一个项目里。我们致力于提供行业领先的服务，让你的建筑项目经得起时间考验。',
      mainStatTitle: '96%',
      mainStatSubTitle: '的客户认为与我们的合作体验格外出色',
      stats: [
        { stat: '99.8%', description: '项目完成率' },
        { stat: '5,000+', description: '成功安装案例' },
        { stat: '85%', description: '客户数量逐年增长' },
      ],
    },
  },

  contact: {
    title: '联系',
    metaDescription:
      '有疑问，或想聊聊你的项目？欢迎联系，我们一起来把想法变成方案。',
    ogTitle: '联系我们 | 星陨的博客',
    heading: '联系我们',
    subTitle: '有疑问，或想聊聊你的项目？欢迎联系，我们一起来把想法变成方案。',
    formTitle: '填写下面的表单',
    formSubTitle: '我们会在 1–2 个工作日内回复你。',
    firstName: '名字',
    lastName: '姓氏',
    details: '详情',
    send: '发送消息',
    demoMessage: '感谢！（演示表单——接入表单服务后才能收到真实消息。）',
    knowledgeHeading: '知识库',
    knowledgeContent: '浏览全部知识库文章。',
    knowledgeLink: '查看指南与教程',
    faqHeading: '常见问题',
    faqContent: '在常见问题中快速找到清晰答案。',
    faqLink: '查看 FAQ',
    officeHeading: '工作室',
    officeContent: '暂时没有实体地址，我们线上见！',
    emailHeading: '通过邮件联系',
    emailContent: '更喜欢文字交流？写信给我：',
  },

  blogIndex: {
    title: '博客',
    metaDescription:
      '星陨的博客：记录编程、云原生、飞行与文学等想写的内容，不定期更新。',
    ogTitle: '博客 | 星陨的博客',
    heading: '欢迎来到星陨的博客',
    subTitle:
      '记录编程、云原生、飞行与文学。想到什么写什么，希望其中的某几篇恰好对你有用。',
    insightsHeading: '随想',
    insightsSubTitle: '短一些的记录与随想。',
    noPosts: '还没有文章，敬请期待。',
    noInsights: '还没有随想，敬请期待。',
  },

  productsIndex: {
    title: '产品',
    metaDescription: '看看这些精心挑选的工具，专业与爱好者都适用。',
    ogTitle: '产品 | 星陨的博客',
    heading: '产品',
    subTitle:
      '每一件都经过精心挑选与打磨，只为让你在需要的时候，手边就有趁手的工具。',
    customerStories: '客户故事',
    testimonials: {
      title: '听听客户怎么说',
      quotes: [
        {
          content:
            '"自从用上了这些工具，我们工地上的效率一路上涨。耐用性和精度都无可挑剔。和真正懂行业日常需求的团队合作，感觉就是不一样。"',
          author: 'Jason Clark',
          role: '工地领班 | TopBuild',
          avatarAlt: '头像图片说明',
        },
        {
          content:
            '"作为一名室内设计师，我一直在寻找能帮我实现创意的高质量材料和工具。这套混装螺丝是项目中的救星，品质与多样性的结合恰到好处。出色的客户支持更是锦上添花！"',
          author: 'Maria Gonzalez',
          role: '室内设计师 | Creative Spaces',
          avatarAlt: '头像图片说明',
        },
        {
          content:
            '"我做职业木工超过 15 年了，可以真诚地说，这些螺栓和螺母是我用过最好的之一。咬合牢固，每个连接点都让我充满信心。服务同样无可挑剔——他们真的在意你的项目。"',
          author: 'Richard Kim',
          role: '资深木匠 | WoodWright',
          avatarAlt: '头像图片说明',
        },
      ],
    },
    stats: {
      title: '为什么选择我们？',
      subTitle:
        '把想法变成看得见的成果。无论你是刚开始画草图，还是正投入一个完整的项目，这些工具都能帮你更有信心地建造。',
      benefits: [
        '坚固可靠的工具，经久耐用。',
        '面向现代需求的创新解决方案。',
        '以你项目成功为目标的客户支持。',
      ],
    },
  },

  /** 各语言专属的 JSON 数据（保持与数据文件同步）。 */
  data: { faqs, features, pricing },
};