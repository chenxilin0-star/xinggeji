const app = getApp();

// 16种MBTI类型完整数据
const MBTI_DATA = {
  INTJ: {
    code: 'INTJ', name: '建筑师', tagline: '独立思考的远见者',
    group: '分析师', groupColor: '#F5A623',
    rarity: '2%', description: '富有想象力的战略家，凡事都有计划。独立、果断，对自己和能力要求极高。',
    keywords: ['战略思维', '独立自主', '追求卓越', '理性分析', '远见卓识'],
    strengths: [
      { name: '战略规划', desc: '善于制定长远目标并坚定执行' },
      { name: '独立自主', desc: '不依赖他人，有自己的判断' },
      { name: '追求卓越', desc: '对质量有极高要求，精益求精' },
      { name: '意志坚定', desc: '一旦决定就全力以赴' }
    ],
    blindSpots: [
      { name: '过于理性', desc: '可能忽视情感因素和他人的感受' },
      { name: '完美主义', desc: '对自己和他人要求过高' },
      { name: '不善社交', desc: '可能显得冷漠和疏远' },
      { name: '傲慢', desc: '可能轻视能力不如自己的人' }
    ],
    famousPeople: ['埃隆·马斯克', '马克·扎克伯格', '尼古拉·特斯拉', '克里斯托弗·诺兰'],
    advice: {
      love: '寻找能刺激你思维的伴侣，保持独立空间，学会表达情感',
      career: '适合战略咨询、数据科学、架构师、投资分析',
      social: '尝试更开放地表达情感，学会倾听他人'
    }
  },
  INTP: {
    code: 'INTP', name: '逻辑学家', tagline: '富有创新精神的发明家',
    group: '分析师', groupColor: '#F5A623',
    rarity: '3%', description: '富有创造力的发明家，对知识有着永不满足的渴望。喜欢从独特角度分析问题。',
    keywords: ['逻辑分析', '创新思维', '求知若渴', '独立思考', '抽象推理'],
    strengths: [
      { name: '分析能力', desc: '善于拆解复杂问题并找到规律' },
      { name: '创造力', desc: '能从独特角度提出解决方案' },
      { name: '客观公正', desc: '不受偏见影响，追求真理' },
      { name: '适应力强', desc: '能快速学习新知识和技能' }
    ],
    blindSpots: [
      { name: '行动迟缓', desc: '想太多，可能迟迟不行动' },
      { name: '情感疏离', desc: '可能难以理解他人的情感需求' },
      { name: '不切实际', desc: '想法可能过于理论化' },
      { name: '社交困难', desc: '可能不擅长日常社交互动' }
    ],
    famousPeople: ['爱因斯坦', '比尔·盖茨', '亚伯拉罕·林肯', '玛丽·居里'],
    advice: {
      love: '需要智力相当的伴侣，给彼此足够的独处空间',
      career: '适合科学研究、软件开发、哲学、数据分析',
      social: '学会在合适的时机展现情感，关注他人需求'
    }
  },
  ENTJ: {
    code: 'ENTJ', name: '指挥官', tagline: '大胆果敢的领导者',
    group: '分析师', groupColor: '#F5A623',
    rarity: '2%', description: '大胆、富有想象力且意志强大的领导者，总能找到或创造解决方案。',
    keywords: ['领导力', '果断决策', '战略视野', '高效执行', '目标导向'],
    strengths: [
      { name: '领导力', desc: '天生的组织者和决策者' },
      { name: '高效执行', desc: '能快速将计划转化为行动' },
      { name: '战略思维', desc: '善于把握全局和长远规划' },
      { name: '自信果断', desc: '在压力下也能做出坚定决策' }
    ],
    blindSpots: [
      { name: '控制欲强', desc: '可能过于主导他人' },
      { name: '忽视情感', desc: '可能把效率置于感受之上' },
      { name: '过于直接', desc: '批评可能过于尖锐' },
      { name: '好胜心强', desc: '可能把一切变成竞争' }
    ],
    famousPeople: ['史蒂夫·乔布斯', '拿破仑', '朱莉娅·罗伯茨', '撒切尔夫人'],
    advice: {
      love: '需要独立且有能力的伴侣，学会在关系中放权',
      career: '适合企业管理、创业、法律、政治',
      social: '学会倾听，给他人表达和参与的空间'
    }
  },
  ENTP: {
    code: 'ENTP', name: '辩论家', tagline: '聪明好奇的思想斗士',
    group: '分析师', groupColor: '#F5A623',
    rarity: '3%', description: '聪明好奇的思想者，不会放弃任何智力挑战的机会。喜欢打破常规，挑战现状。',
    keywords: ['思维敏捷', '善于辩论', '创新求变', '好奇心强', '灵活变通'],
    strengths: [
      { name: '思维敏捷', desc: '能快速理解新概念并找到关联' },
      { name: '善于表达', desc: '能清晰阐述复杂想法' },
      { name: '创新能力', desc: '总能想到别人想不到的点子' },
      { name: '精力充沛', desc: '对新事物充满热情和动力' }
    ],
    blindSpots: [
      { name: '过于好辩', desc: '可能为了赢而争论不休' },
      { name: '不够专注', desc: '兴趣广泛但容易半途而废' },
      { name: '忽视细节', desc: '可能遗漏重要的执行细节' },
      { name: '挑战权威', desc: '可能不必要地挑战规则' }
    ],
    famousPeople: ['本杰明·富兰克林', '马克·吐温', '托马斯·爱迪生', '小罗伯特·唐尼'],
    advice: {
      love: '需要能跟上你思维节奏的伴侣，学会认真倾听',
      career: '适合创业、营销、咨询、产品经理',
      social: '学会在合适场合收敛锋芒，关注他人感受'
    }
  },
  INFJ: {
    code: 'INFJ', name: '提倡者', tagline: '安静而神秘的理想主义者',
    group: '外交官', groupColor: '#2ECC71',
    rarity: '1%', description: '最稀有的人格类型。安静而神秘，同时鼓舞人心且不知疲倦的理想主义者。',
    keywords: ['洞察力强', '理想主义', '富有同理心', '坚定信念', '有远见'],
    strengths: [
      { name: '深刻洞察', desc: '能看透事物的本质和人的内心' },
      { name: '理想驱动', desc: '为有意义的事业坚持不懈' },
      { name: '同理心强', desc: '能深刻理解他人的情感和需求' },
      { name: '有决断力', desc: '基于信念做出坚定选择' }
    ],
    blindSpots: [
      { name: '过于理想化', desc: '可能对现实期望过高' },
      { name: '容易倦怠', desc: '为他人付出太多而忽略自己' },
      { name: '过于私密', desc: '可能难以向他人敞开心扉' },
      { name: '完美主义', desc: '追求"全有或全无"的极端' }
    ],
    famousPeople: ['甘地', '特蕾莎修女', '陀思妥耶夫斯基', '马丁·路德·金'],
    advice: {
      love: '寻找价值观一致的伴侣，学会表达自己的需求',
      career: '适合心理咨询、写作、教育、社会工作',
      social: '学会设定边界，保护自己的情感能量'
    }
  },
  INFP: {
    code: 'INFP', name: '调停者', tagline: '诗意善良的利他主义者',
    group: '外交官', groupColor: '#2ECC71',
    rarity: '4%', description: '真正的理想主义者，总是在寻找哪怕一丁点善意。富有诗意、善良的利他主义者。',
    keywords: ['理想主义', '富有创意', '善良温和', '追求真善美', '内心丰富'],
    strengths: [
      { name: '共情能力', desc: '能深刻理解和感受他人的情感' },
      { name: '创造力', desc: '在艺术和文字方面有独特天赋' },
      { name: '热情真诚', desc: '对自己认同的事物全力以赴' },
      { name: '开放包容', desc: '接受不同的观点和可能性' }
    ],
    blindSpots: [
      { name: '过于理想', desc: '可能对现实世界感到失望' },
      { name: '自我封闭', desc: '可能过度沉浸于内心世界' },
      { name: '不切实际', desc: '可能忽视现实约束' },
      { name: '难以批评', desc: '可能因不想伤害他人而回避冲突' }
    ],
    famousPeople: ['莎士比亚', '托尔金', '威廉·莎士比亚', '奥黛丽·赫本'],
    advice: {
      love: '需要深度精神连接的伴侣，不要为了取悦对方而迷失自己',
      career: '适合写作、艺术设计、心理咨询、社会工作',
      social: '学会在保护内心的同时勇敢表达自己'
    }
  },
  ENFJ: {
    code: 'ENFJ', name: '主人公', tagline: '富有魅力的领导者',
    group: '外交官', groupColor: '#2ECC71',
    rarity: '2%', description: '富有魅力的领导者，能够吸引听众，鼓舞人心。有强烈的利他主义精神。',
    keywords: ['领导魅力', '善于激励', '利他主义', '社交达人', '组织能力'],
    strengths: [
      { name: '领导力', desc: '能激励和引导他人共同前进' },
      { name: '同理心', desc: '能感知他人的情感和需求' },
      { name: '组织能力', desc: '善于协调团队和资源' },
      { name: '值得信赖', desc: '言出必行，让人愿意追随' }
    ],
    blindSpots: [
      { name: '过度付出', desc: '可能忽略自己的需求' },
      { name: '过于理想', desc: '对他人期望可能过高' },
      { name: '自责倾向', desc: '把别人的问题归咎于自己' },
      { name: '优柔寡断', desc: '可能因顾及所有人而难以决策' }
    ],
    famousPeople: ['奥巴马', '奥普拉·温弗瑞', '孔子', '曼德拉'],
    advice: {
      love: '你是天生的关系维护者，但也要学会接受对方的照顾',
      career: '适合教育、管理、媒体、公益组织',
      social: '学会说"不"，给自己留出恢复能量的时间'
    }
  },
  ENFP: {
    code: 'ENFP', name: '竞选者', tagline: '热情创造力强的自由精灵',
    group: '外交官', groupColor: '#2ECC71',
    rarity: '8%', description: '真正的自由精灵——热情、有创造力、社交能力强的乐观主义者。',
    keywords: ['热情洋溢', '创意无限', '好奇心强', '善于社交', '乐观积极'],
    strengths: [
      { name: '热情感染力', desc: '能用热情感染周围的每一个人' },
      { name: '创造力', desc: '总有新鲜有趣的点子' },
      { name: '社交能力', desc: '善于与各种人建立联系' },
      { name: '适应力强', desc: '能灵活应对各种变化' }
    ],
    blindSpots: [
      { name: '注意力分散', desc: '兴趣广泛但难以专注' },
      { name: '过于理想', desc: '可能忽视现实限制' },
      { name: '情绪化', desc: '可能对他人的评价过于敏感' },
      { name: '难以收尾', desc: '开始很多但完成很少' }
    ],
    famousPeople: ['罗宾·威廉姆斯', 'Walt Disney', '奥斯卡·王尔德', '马克·吐温'],
    advice: {
      love: '你渴望灵魂伴侣般的连接，学会在激情之外建立稳定的基础',
      career: '适合创意行业、营销、心理咨询、教育培训',
      social: '学会深耕少数几段关系，而非广撒网'
    }
  },
  ISTJ: {
    code: 'ISTJ', name: '物流师', tagline: '务实可靠的责任担当者',
    group: '哨兵', groupColor: '#3498DB',
    rarity: '11%', description: '实际且注重事实的个人，其可靠性无可置疑。是最常见的人格类型之一。',
    keywords: ['严谨可靠', '注重细节', '责任心强', '遵守规则', '条理分明'],
    strengths: [
      { name: '诚实可靠', desc: '说到做到，值得信赖' },
      { name: '注重细节', desc: '善于发现和处理细节问题' },
      { name: '责任心强', desc: '对工作和义务认真负责' },
      { name: '耐心坚韧', desc: '能坚持不懈地完成任务' }
    ],
    blindSpots: [
      { name: '过于固执', desc: '可能抗拒新方法和新想法' },
      { name: '缺乏灵活性', desc: '可能过于拘泥于规则' },
      { name: '情感表达少', desc: '可能不善于表达关爱' },
      { name: '批评直接', desc: '可能过于直白地指出问题' }
    ],
    famousPeople: ['乔治·华盛顿', '安吉拉·默克尔', '沃伦·巴菲特', '诸葛亮'],
    advice: {
      love: '你是可靠的伴侣，但要学会用言语和行动表达爱意',
      career: '适合会计、审计、项目管理、行政管理',
      social: '尝试接受不同的做事方式，学会灵活变通'
    }
  },
  ISFJ: {
    code: 'ISFJ', name: '守卫者', tagline: '非常专注且温暖的守护者',
    group: '哨兵', groupColor: '#3498DB',
    rarity: '12%', description: '非常专注且温暖的守护者，时刻准备着保护所爱的人。极具奉献精神。',
    keywords: ['温暖体贴', '忠诚可靠', '默默奉献', '观察敏锐', '谦逊低调'],
    strengths: [
      { name: '忠诚可靠', desc: '对关心的人始终如一' },
      { name: '细心体贴', desc: '能注意到他人的需求和感受' },
      { name: '耐心十足', desc: '能持续做好重复性工作' },
      { name: '观察力强', desc: '善于发现他人忽略的细节' }
    ],
    blindSpots: [
      { name: '过度付出', desc: '可能忽略自己的需求' },
      { name: '害怕改变', desc: '可能抗拒新事物和变化' },
      { name: '过于敏感', desc: '可能对批评反应过度' },
      { name: '不善拒绝', desc: '可能因为不想伤害他人而委屈自己' }
    ],
    famousPeople: ['碧昂丝', '凯特王妃', '安妮·海瑟薇', '周杰伦'],
    advice: {
      love: '你是理想的伴侣，但也要学会表达自己的需求',
      career: '适合护理、教育、行政管理、客户服务',
      social: '学会设定健康的边界，勇敢说"不"'
    }
  },
  ESTJ: {
    code: 'ESTJ', name: '总经理', tagline: '务实高效的管理者',
    group: '哨兵', groupColor: '#3498DB',
    rarity: '9%', description: '出色的管理者，在管理事物或人方面无与伦比。传统和秩序的维护者。',
    keywords: ['组织能力', '执行力强', '务实高效', '领导才能', '传统守序'],
    strengths: [
      { name: '组织能力', desc: '善于安排任务和资源' },
      { name: '执行力', desc: '说到做到，高效完成任务' },
      { name: '忠诚可靠', desc: '对家庭和组织忠心耿耿' },
      { name: '意志坚定', desc: '在压力下也能坚持立场' }
    ],
    blindSpots: [
      { name: '过于刻板', desc: '可能过于拘泥于规则和传统' },
      { name: '控制欲', desc: '可能不善于放权和信任他人' },
      { name: '情感忽视', desc: '可能忽视他人的情感需求' },
      { name: '不善变通', desc: '面对突发情况可能反应迟钝' }
    ],
    famousPeople: ['亨利·福特', '索尼亚·索托马约尔', '科林·鲍威尔', '朱迪·丹奇'],
    advice: {
      love: '你是稳定的伴侣，但要学会表达温柔和感受',
      career: '适合项目管理、行政管理、法律、军事',
      social: '学会接受不同的工作方式，培养倾听能力'
    }
  },
  ESFJ: {
    code: 'ESFJ', name: '执政官', tagline: '关心他人的社交达人',
    group: '哨兵', groupColor: '#3498DB',
    rarity: '12%', description: '极其关心他人的人，善于社交、受欢迎的人，总是热心帮助他人。',
    keywords: ['社交达人', '热心助人', '团队合作', '重视和谐', '组织能力'],
    strengths: [
      { name: '热心助人', desc: '总是乐于伸出援手帮助他人' },
      { name: '社交能力', desc: '善于营造和谐的社交氛围' },
      { name: '忠诚可靠', desc: '对朋友和家人尽心尽力' },
      { name: '善于合作', desc: '能很好地协调团队关系' }
    ],
    blindSpots: [
      { name: '过度在意评价', desc: '可能过于在意他人看法' },
      { name: '难以接受批评', desc: '可能对批评反应过于激烈' },
      { name: '过度付出', desc: '可能为他人牺牲太多' },
      { name: '从众心理', desc: '可能过于遵循社会期望' }
    ],
    famousPeople: ['泰勒·斯威夫特', '休·杰克曼', '詹妮弗·加纳', '比尔·克林顿'],
    advice: {
      love: '你是体贴的伴侣，但也要让对方有机会照顾你',
      career: '适合人力资源管理、教育、医疗、客户关系',
      social: '学会为自己而活，不必迎合所有人'
    }
  },
  ISTP: {
    code: 'ISTP', name: '鉴赏家', tagline: '大胆实际的实验家',
    group: '探险家', groupColor: '#9B59B6',
    rarity: '5%', description: '大胆而实际的实验家，精通各种工具。喜欢用双手探索世界。',
    keywords: ['动手能力强', '冷静理性', '灵活变通', '独立自主', '善于观察'],
    strengths: [
      { name: '动手能力', desc: '善于操作工具和解决实际问题' },
      { name: '冷静理性', desc: '在危机中保持冷静' },
      { name: '灵活变通', desc: '能快速适应新环境' },
      { name: '解决问题', desc: '善于找到高效的解决方案' }
    ],
    blindSpots: [
      { name: '情感疏离', desc: '可能不善于表达感情' },
      { name: '难以承诺', desc: '可能不愿做长期规划' },
      { name: '冒险倾向', desc: '可能为了刺激而忽视风险' },
      { name: '过于独立', desc: '可能拒绝他人的帮助' }
    ],
    famousPeople: ['迈克尔·乔丹', '克林特·伊斯特伍德', '李小龙', '贝尔·格里尔斯'],
    advice: {
      love: '你需要保持独立空间的伴侣，学会用行动表达爱',
      career: '适合工程、技术维修、飞行员、外科医生',
      social: '学会在关系中投入更多情感和承诺'
    }
  },
  ISFP: {
    code: 'ISFP', name: '探险家', tagline: '灵活有魅力的艺术家',
    group: '探险家', groupColor: '#9B59B6',
    rarity: '6%', description: '灵活有魅力的艺术家，时刻准备着探索和体验新事物。热爱生活中的美。',
    keywords: ['艺术感知', '自由随性', '温和友善', '活在当下', '审美独到'],
    strengths: [
      { name: '艺术天赋', desc: '对美有独特的感知和表达能力' },
      { name: '温柔善良', desc: '对身边的人充满善意' },
      { name: '活在当下', desc: '善于享受生活中的每一刻' },
      { name: '适应力强', desc: '能随遇而安，灵活应变' }
    ],
    blindSpots: [
      { name: '过于敏感', desc: '可能对他人的评价过于在意' },
      { name: '逃避冲突', desc: '可能回避必要的正面沟通' },
      { name: '缺乏规划', desc: '可能不做长远打算' },
      { name: '自我怀疑', desc: '可能低估自己的能力' }
    ],
    famousPeople: ['鲍勃·迪伦', '迈克尔·杰克逊', '芙烈达·卡罗', '大卫·鲍伊'],
    advice: {
      love: '你渴望深层连接，但需要学会用语言表达感受',
      career: '适合艺术设计、音乐、摄影、室内设计',
      social: '学会在保持真实的同时，勇敢展示自己的才华'
    }
  },
  ESTP: {
    code: 'ESTP', name: '企业家', tagline: '精力充沛的行动派',
    group: '探险家', groupColor: '#9B59B6',
    rarity: '4%', description: '聪明、精力充沛且善于观察的人，真正享受冒险生活。天生的行动派。',
    keywords: ['行动力强', '善于社交', '冒险精神', '观察敏锐', '实用主义'],
    strengths: [
      { name: '行动力', desc: '善于快速做出决策并采取行动' },
      { name: '社交能力', desc: '能轻松与各种人打成一片' },
      { name: '观察力', desc: '善于观察和解读周围环境' },
      { name: '适应力', desc: '能在变化中迅速找到机会' }
    ],
    blindSpots: [
      { name: '冲动行事', desc: '可能不经过深思熟虑就行动' },
      { name: '缺乏耐心', desc: '可能对长期目标缺乏坚持' },
      { name: '忽视规则', desc: '可能觉得规则是种束缚' },
      { name: '情感忽视', desc: '可能忽视他人深层的情感需求' }
    ],
    famousPeople: ['唐纳德·特朗普', '麦当娜', '杰克·尼克尔森', '欧内斯特·海明威'],
    advice: {
      love: '你充满魅力，但需要学会放慢脚步，深入经营关系',
      career: '适合销售、创业、体育、紧急救援',
      social: '学会在追求刺激的同时，关注他人的深层感受'
    }
  },
  ESFP: {
    code: 'ESFP', name: '表演者', tagline: '自发热情的娱乐家',
    group: '探险家', groupColor: '#9B59B6',
    rarity: '8%', description: '自发的、精力充沛的、热情的表演者——生活在他们周围永远不会无聊。',
    keywords: ['活力四射', '乐观开朗', '善于表达', '享受当下', '社交达人'],
    strengths: [
      { name: '感染力', desc: '能让周围的人感到快乐和放松' },
      { name: '适应力', desc: '能灵活应对各种社交场合' },
      { name: '观察力', desc: '善于观察他人的情感和反应' },
      { name: '实践能力', desc: '善于在实际行动中解决问题' }
    ],
    blindSpots: [
      { name: '缺乏规划', desc: '可能不做长期打算' },
      { name: '逃避冲突', desc: '可能回避严肃的讨论' },
      { name: '注意力分散', desc: '容易被新鲜事物吸引' },
      { name: '过于敏感', desc: '可能对批评反应过度' }
    ],
    famousPeople: ['玛丽莲·梦露', '艾尔顿·约翰', '杰米·奥利弗', '阿黛尔'],
    advice: {
      love: '你让关系充满乐趣，但也要学会面对深层情感话题',
      career: '适合演艺、旅游、公关、活动策划',
      social: '学会在享受当下的同时，培养长远眼光'
    }
  }
};

Page({
  data: {
    resultCode: '',
    typeData: null,
    dimensions: [],
    loading: true
  },

  onLoad: function (options) {
    const { result_data } = options;
    if (!result_data) {
      wx.navigateBack();
      return;
    }
    try {
      const resultData = JSON.parse(decodeURIComponent(result_data));
      const resultCode = resultData.result?.resultCode || 'INTJ';
      const typeData = MBTI_DATA[resultCode] || MBTI_DATA['INTJ'];
      
      // 计算四维度百分比
      const scores = resultData.scores || {};
      const dimensions = [
        {
          left: 'E', right: 'I', leftName: '外向', rightName: '内向',
          leftPercent: this.calcPercent(scores.E, scores.I),
          rightPercent: this.calcPercent(scores.I, scores.E),
          isLeft: (scores.E || 0) >= (scores.I || 0)
        },
        {
          left: 'S', right: 'N', leftName: '实感', rightName: '直觉',
          leftPercent: this.calcPercent(scores.S, scores.N),
          rightPercent: this.calcPercent(scores.N, scores.S),
          isLeft: (scores.S || 0) >= (scores.N || 0)
        },
        {
          left: 'T', right: 'F', leftName: '理性', rightName: '情感',
          leftPercent: this.calcPercent(scores.T, scores.F),
          rightPercent: this.calcPercent(scores.F, scores.T),
          isLeft: (scores.T || 0) >= (scores.F || 0)
        },
        {
          left: 'J', right: 'P', leftName: '判断', rightName: '感知',
          leftPercent: this.calcPercent(scores.J, scores.P),
          rightPercent: this.calcPercent(scores.P, scores.J),
          isLeft: (scores.J || 0) >= (scores.P || 0)
        }
      ];

      this.setData({
        resultCode,
        typeData,
        dimensions,
        loading: false
      });

      // 设置导航栏颜色
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: typeData.groupColor,
        animation: { duration: 300, timingFunc: 'easeIn' }
      });
    } catch (e) {
      console.error('Parse result failed:', e);
      wx.showToast({ title: '数据解析失败', icon: 'none' });
      wx.navigateBack();
    }
  },

  calcPercent: function (a, b) {
    const total = (a || 0) + (b || 0);
    if (total === 0) return 50;
    return Math.round(((a || 0) / total) * 100);
  },

  onShareAppMessage: function () {
    const { resultCode, typeData } = this.data;
    return {
      title: `我的MBTI是${resultCode}-${typeData.name}，${typeData.tagline}，你也来测测吧！`,
      path: '/pages/index/index'
    };
  },

  retakeTest: function () {
    wx.redirectTo({
      url: '/pages/test/test?test_id=mbti'
    });
  },

  backToHome: function () {
    wx.switchTab({ url: '/pages/index/index' });
  },

  generatePoster: function () {
    const resultData = {
      test_id: 'mbti',
      result: this.data.typeData ? {
        resultCode: this.data.resultCode,
        type_name: this.data.typeData.name,
        emoji: '🎭',
        description: this.data.typeData.tagline
      } : {}
    };
    wx.navigateTo({
      url: `/pages/share/share?test_id=mbti&result_data=${encodeURIComponent(JSON.stringify(resultData))}`
    });
  }
});
