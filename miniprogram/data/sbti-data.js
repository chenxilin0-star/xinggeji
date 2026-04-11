/**
 * SBTI人格测试 - 完整数据文件
 */

const DIMENSION_ORDER = ['S1','S2','S3','E1','E2','E3','A1','A2','A3','Ac1','Ac2','Ac3','So1','So2','So3'];

const DIMENSION_META = {
  S1: { name: 'S1 自尊自信', model: '自我模型' },
  S2: { name: 'S2 自我清晰度', model: '自我模型' },
  S3: { name: 'S3 核心价值', model: '自我模型' },
  E1: { name: 'E1 依恋安全感', model: '情感模型' },
  E2: { name: 'E2 情感投入度', model: '情感模型' },
  E3: { name: 'E3 边界与依赖', model: '情感模型' },
  A1: { name: 'A1 世界观倾向', model: '态度模型' },
  A2: { name: 'A2 规则与灵活度', model: '态度模型' },
  A3: { name: 'A3 人生意义感', model: '态度模型' },
  Ac1: { name: 'Ac1 动机导向', model: '行动驱力模型' },
  Ac2: { name: 'Ac2 决策风格', model: '行动驱力模型' },
  Ac3: { name: 'Ac3 执行模式', model: '行动驱力模型' },
  So1: { name: 'So1 社交主动性', model: '社交模型' },
  So2: { name: 'So2 人际边界感', model: '社交模型' },
  So3: { name: 'So3 表达与真实度', model: '社交模型' }
};

const NORMAL_QUESTIONS = [
  { id:'q1',dim:'S1',text:'我不仅是屌丝，我还是joker,我还是咸鱼，这辈子没谈过一场恋爱，胆怯又自卑，我的青春就是一场又一场的意淫，每一天幻想着我也能有一个女孩子和我一起压马路，一起逛街，一起玩，现实却是爆了父母金币，读了个烂学校，混日子之后找班上，没有理想，没有目标，没有能力的三无人员，每次看到你能在网上开屌丝的玩笑，我都想哭，我就是地底下的老鼠，透过下水井的缝隙，窥探地上的各种美好，每一次看到这种都是对我心灵的一次伤害，对我生存空间的一次压缩，求求哥们给我们这种小丑一点活路吧，我真的不想在白天把枕巾哭湿一大片',options:[{label:'我哭了。。',value:1},{label:'这是什么。。',value:2},{label:'这不是我！',value:3}]},
  { id:'q2',dim:'S1',text:'我不够好，周围的人都比我优秀',options:[{label:'确实',value:1},{label:'有时',value:2},{label:'不是',value:3}]},
  { id:'q3',dim:'S2',text:'我很清楚真正的自己是什么样的',options:[{label:'不认同',value:1},{label:'中立',value:2},{label:'认同',value:3}]},
  { id:'q4',dim:'S2',text:'我内心有真正追求的东西',options:[{label:'不认同',value:1},{label:'中立',value:2},{label:'认同',value:3}]},
  { id:'q5',dim:'S3',text:'我一定要不断往上爬、变得更厉害',options:[{label:'不认同',value:1},{label:'中立',value:2},{label:'认同',value:3}]},
  { id:'q6',dim:'S3',text:'外人的评价对我来说无所吊谓。',options:[{label:'不认同',value:1},{label:'中立',value:2},{label:'认同',value:3}]},
  { id:'q7',dim:'E1',text:'对象超过5小时没回消息，说自己窜稀了，你会怎么想？',options:[{label:'拉稀不可能5小时，也许ta隐瞒了我。',value:1},{label:'在信任和怀疑之间摇摆。',value:2},{label:'也许今天ta真的不太舒服。',value:3}]},
  { id:'q8',dim:'E1',text:'我在感情里经常担心被对方抛弃',options:[{label:'是的',value:1},{label:'偶尔',value:2},{label:'不是',value:3}]},
  { id:'q9',dim:'E2',text:'我对天发誓，我对待每一份感情都是认真的！',options:[{label:'并没有',value:1},{label:'也许？',value:2},{label:'是的！（问心无愧骄傲脸）',value:3}]},
  { id:'q10',dim:'E2',text:'你的恋爱对象是一个尊老爱幼，温柔敦厚，洁身自好，光明磊落，大义凛然，能言善辩，口才流利，观察入微，见多识广，博学多才，诲人不倦，和蔼可亲，平易近人，心地善良，慈眉善目，积极进取，意气风发，玉树临风，国色天香，倾国倾城，花容月貌的人，此时你会？',options:[{label:'就算ta再优秀我也不会陷入太深。',value:1},{label:'会介于A和C之间。',value:2},{label:'会非常珍惜ta，也许会变成恋爱脑。',value:3}]},
  { id:'q11',dim:'E3',text:'恋爱后，对象非常黏人，你作何感想？',options:[{label:'那很爽了',value:1},{label:'都行无所谓',value:2},{label:'我更喜欢保留独立空间',value:3}]},
  { id:'q12',dim:'E3',text:'我在任何关系里都很重视个人空间',options:[{label:'我更喜欢依赖与被依赖',value:1},{label:'看情况',value:2},{label:'是的！（斩钉截铁地说道）',value:3}]},
  { id:'q13',dim:'A1',text:'大多数人是善良的',options:[{label:'其实邪恶的人心比世界上的痔疮更多。',value:1},{label:'也许吧。',value:2},{label:'是的，我愿相信好人更多。',value:3}]},
  { id:'q14',dim:'A1',text:'你走在街上，一位萌萌的小女孩蹦蹦跳跳地朝你走来，她递给你一根棒棒糖，此时你作何感想？',options:[{label:'呜呜她真好真可爱！居然给我棒棒糖！',value:3},{label:'一脸懵逼，作挠头状',value:2},{label:'这也许是一种新型诈骗？还是走开为好。',value:1}]},
  { id:'q15',dim:'A2',text:'快考试了，学校规定必须上晚自习，请假会扣分，但今晚你约了女/男神一起玩《绝地求生：刺激战场》，你怎么办？',options:[{label:'翘了！反正就一次！',value:1},{label:'干脆请个假吧。',value:2},{label:'都快考试了还去啥。',value:3}]},
  { id:'q16',dim:'A2',text:'我喜欢打破常规，不喜欢被束缚',options:[{label:'认同',value:1},{label:'保持中立',value:2},{label:'不认同',value:3}]},
  { id:'q17',dim:'A3',text:'我做事通常有目标。',options:[{label:'不认同',value:1},{label:'中立',value:2},{label:'认同',value:3}]},
  { id:'q18',dim:'A3',text:'突然某一天，我意识到人生哪有什么他妈的狗屁意义，人不过是和动物一样被各种欲望支配着，纯纯是被激素控制的东西，饿了就吃，困了就睡，一发情就想交配，我们简直和猪狗一样没什么区别。',options:[{label:'是这样的。',value:1},{label:'也许是，也许不是。',value:2},{label:'这简直是胡扯',value:3}]},
  { id:'q19',dim:'Ac1',text:'我做事主要为了取得成果和进步，而不是避免麻烦和风险。',options:[{label:'不认同',value:1},{label:'中立',value:2},{label:'认同',value:3}]},
  { id:'q20',dim:'Ac1',text:'你因便秘坐在马桶上（已长达30分钟），拉不出很难受。此时你更像',options:[{label:'再坐三十分钟看看，说不定就有了。',value:1},{label:'用力拍打自己的屁股并说："死屁股，快拉啊！"',value:2},{label:'使用开塞露，快点拉出来才好。',value:3}]},
  { id:'q21',dim:'Ac2',text:'我做决定比较果断，不喜欢犹豫',options:[{label:'不认同',value:1},{label:'中立',value:2},{label:'认同',value:3}]},
  { id:'q22',dim:'Ac2',text:'此题没有题目，请盲选',options:[{label:'反复思考后感觉应该选A？',value:1},{label:'啊，要不选B？',value:2},{label:'不会就选C？',value:3}]},
  { id:'q23',dim:'Ac3',text:'别人说你"执行力强"，你内心更接近哪句？',options:[{label:'我被逼到最后确实执行力超强。。。',value:1},{label:'啊，有时候吧。',value:2},{label:'是的，事情本来就该被推进',value:3}]},
  { id:'q24',dim:'Ac3',text:'我做事常常有计划，____',options:[{label:'然而计划不如变化快。',value:1},{label:'有时能完成，有时不能。',value:2},{label:'我讨厌被打破计划。',value:3}]},
  { id:'q25',dim:'So1',text:'你因玩《第五人格》而结识许多网友，并被邀请线下见面，你的想法是？',options:[{label:'网上口嗨下就算了，真见面还是有点忐忑。',value:1},{label:'见网友也挺好，反正谁来聊我就聊两句。',value:2},{label:'我会打扮一番并热情聊天，万一呢，我是说万一呢？',value:3}]},
  { id:'q26',dim:'So1',text:'朋友带了ta的朋友一起来玩，你最可能的状态是',options:[{label:'对"朋友的朋友"天然有点距离感，怕影响二人关系',value:1},{label:'看对方，能玩就玩。',value:2},{label:'朋友的朋友应该也算我的朋友！要热情聊天',value:3}]},
  { id:'q27',dim:'So2',text:'我和人相处主打一个电子围栏，靠太近会自动报警。',options:[{label:'认同',value:3},{label:'中立',value:2},{label:'不认同',value:1}]},
  { id:'q28',dim:'So2',text:'我渴望和我信任的人关系密切，熟得像失散多年的亲戚。',options:[{label:'认同',value:1},{label:'中立',value:2},{label:'不认同',value:3}]},
  { id:'q29',dim:'So3',text:'有时候你明明对一件事有不同的、负面的看法，但最后没说出来。多数情况下原因是：',options:[{label:'这种情况较少。',value:1},{label:'可能碍于情面或者关系。',value:2},{label:'不想让别人知道自己是个阴暗的人。',value:3}]},
  { id:'q30',dim:'So3',text:'我在不同人面前会表现出不一样的自己',options:[{label:'不认同',value:1},{label:'中立',value:2},{label:'认同',value:3}]}
];

const SPECIAL_QUESTIONS = [
  { id:'drink_gate_q1',special:true,kind:'drink_gate',text:'您平时有什么爱好？',options:[{label:'吃喝拉撒',value:1},{label:'艺术爱好',value:2},{label:'饮酒',value:3},{label:'健身',value:4}]},
  { id:'drink_gate_q2',special:true,kind:'drink_trigger',text:'您对饮酒的态度是？',options:[{label:'小酌怡情，喝不了太多。',value:1},{label:'我习惯将白酒灌在保温杯，当白开水喝，酒精令我信服。',value:2}]}
];

const NORMAL_TYPES = [
  {code:'CTRL',pattern:'HHH-HMH-MHH-HHH-MHM'},
  {code:'ATM-er',pattern:'HHH-HHM-HHH-HMH-MHL'},
  {code:'Dior-s',pattern:'MHM-MMH-MHM-HMH-LHL'},
  {code:'BOSS',pattern:'HHH-HMH-MMH-HHH-LHL'},
  {code:'THAN-K',pattern:'MHM-HMM-HHM-MMH-MHL'},
  {code:'OH-NO',pattern:'HHL-LMH-LHH-HHM-LHL'},
  {code:'GOGO',pattern:'HHM-HMH-MMH-HHH-MHM'},
  {code:'SEXY',pattern:'HMH-HHL-HMM-HMM-HLH'},
  {code:'LOVE-R',pattern:'MLH-LHL-HLH-MLM-MLH'},
  {code:'MUM',pattern:'MMH-MHL-HMM-LMM-HLL'},
  {code:'FAKE',pattern:'HLM-MML-MLM-MLM-HLH'},
  {code:'OJBK',pattern:'MMH-MMM-HML-LMM-MML'},
  {code:'MALO',pattern:'MLH-MHM-MLH-MLH-LMH'},
  {code:'JOKE-R',pattern:'LLH-LHL-LML-LLL-MLM'},
  {code:'WOC!',pattern:'HHL-HMH-MMH-HHM-LHH'},
  {code:'THIN-K',pattern:'HHL-HMH-MLH-MHM-LHH'},
  {code:'SHIT',pattern:'HHL-HLH-LMM-HHM-LHH'},
  {code:'ZZZZ',pattern:'MHL-MLH-LML-MML-LHM'},
  {code:'POOR',pattern:'HHL-MLH-LMH-HHH-LHL'},
  {code:'MONK',pattern:'HHL-LLH-LLM-MML-LHM'},
  {code:'IMSB',pattern:'LLM-LMM-LLL-LLL-MLM'},
  {code:'SOLO',pattern:'LML-LLH-LHL-LML-LHM'},
  {code:'FUCK',pattern:'MLL-LHL-LLM-MLL-HLH'},
  {code:'DEAD',pattern:'LLL-LLM-LML-LLL-LHM'},
  {code:'IMFW',pattern:'LLH-LHL-LML-LLL-MLL'}
];

const TYPE_LIBRARY = {
  CTRL:{code:'CTRL',cn:'拿捏者',intro:'怎么样，被我拿捏了吧？',desc:'恭喜您，您测出了全中国最为罕见的人格——拿捏者。你就像一只无形的手，掌控着生活的每个细节。别人还在纠结"怎么办"的时候，你已经把plan B准备好了。你的自信是从骨子里散发出来的。在感情中你是天生的节奏大师。不过要注意，拿捏得太多，别人可能觉得喘不过气。适当松松手，世界也不会崩塌。'},
  'ATM-er':{code:'ATM-er',cn:'送钱者',intro:'你以为我很有钱吗？',desc:'你是朋友圈里最"大方"的人。请客吃饭你第一个掏钱包，情人节礼物你提前三个月开始准备。你习惯用付出来换取认可。醒醒吧，学会说"不"，不会让你失去朋友，反而会让你赢得尊重。'},
  'Dior-s':{code:'Dior-s',cn:'迪奥斯',intro:'我不装了，我摊牌了。',desc:'你的生活就是一场精心策划的时尚大片。朋友圈每张图都要修三遍。你在乎别人的评价，但嘴上说不在乎。你是一半精致一半摆烂的矛盾体，而且你深深享受这种矛盾。'},
  BOSS:{code:'BOSS',cn:'老板',intro:'都听我的。',desc:'你是天生的领导者。你有一种让人不自觉服从的气场。你的目标感极强，做事雷厉风行。建议你偶尔也问问别人的意见，让他们觉得自己被重视。'},
  'THAN-K':{code:'THAN-K',cn:'谢谢',intro:'谢谢你，真的谢谢。',desc:'你是那种把"谢谢"挂在嘴边的人，因为你真的感激生活中的每一个细节。记住，善良的人也值得被好好对待，别总是做那个"感谢别人"的角色。'},
  'OH-NO':{code:'OH-NO',cn:'哦不',intro:'完了完了完了。',desc:'你的人生bgm是《天路》——永远在担心的路上。你的焦虑像一个永不停歇的闹钟。但说实话，你担心的事90%都没有发生。把焦虑当作你的超能力吧，但要记得偶尔关机休息。'},
  GOGO:{code:'GOGO',cn:'冲冲',intro:'冲就完事了！',desc:'你是人形永动机，每天像充了一万伏电。别人还在纠结要不要做，你已经做完了。偶尔停下来看看风景，不会让你落后，反而会让你跑得更远。'},
  SEXY:{code:'SEXY',cn:'性感',intro:'不是我刻意迷人，是天生如此。',desc:'你有一种说不清道不明的魅力。你不一定是最漂亮/最帅的，但你就是有一种让人移不开眼的气质。魅力是把双刃剑，用得好是社交利器，用不好容易伤人伤己。'},
  'LOVE-R':{code:'LOVE-R',cn:'浪人',intro:'风往哪吹，我往哪走。',desc:'你是感情的浪子，自由是你的信仰。你不是渣，你只是还没找到那个让你愿意停留的人。在那之前，请对每一段感情都真诚一些。'},
  MUM:{code:'MUM',cn:'老妈子',intro:'多穿点，别着凉。',desc:'你是朋友圈里的"老母亲"角色，操心的命。出门你要叮嘱朋友带伞，吃饭你要劝人多吃蔬菜。你的温暖是无条件的，但也要学会尊重别人的边界。'},
  FAKE:{code:'FAKE',cn:'影帝',intro:'你看我几分像从前？',desc:'你是社交场上的百变影帝，见人说人话见鬼说鬼话。偶尔卸下伪装，让真正的自己出来透透气，也没什么不好的。'},
  OJBK:{code:'OJBK',cn:'欧克',intro:'都行，可以，没问题。',desc:'你的人生座右铭是"随意"。你不是没有主见，你只是觉得大部分事情不值得你消耗能量。适当表达一下自己的偏好，生活多了一些颜色。'},
  MALO:{code:'MALO',cn:'马喽',intro:'嘿，咱就是说。',desc:'你是社交圈里的万能胶水，走到哪都能跟人打成一片。你不是最耀眼的那个，但你是最让人安心的那个。不必总是做那个"照顾大家情绪"的人。'},
  'JOKE-R':{code:'JOKE-R',cn:'乐子人',intro:'哈哈哈哈哈哈哈。',desc:'你是人形快乐制造机，走到哪笑到哪。你用幽默做盔甲，把负面情绪藏在段子里。别忘了，你也可以不搞笑，也可以认真地表达自己的感受。'},
  'WOC!':{code:'WOC!',cn:'卧槽',intro:'卧槽卧槽卧槽！',desc:'你的情绪反应永远是最大号的。开心就原地起飞，生气就天崩地裂。你的热情和真实让你成为朋友圈里最有感染力的存在。'},
  'THIN-K':{code:'THIN-K',cn:'思考者',intro:'让我想想。',desc:'你的大脑24小时不关机。你是深度思考者，看问题总比别人多想三层。不是所有问题都需要被想明白，有些事做了就知道了。'},
  SHIT:{code:'SHIT',cn:'屎蛋',intro:'啊这。',desc:'你有一种独特的幽默感——自嘲到极致就是你的必杀技。你看似不在乎，其实内心细腻得要命。你的真实和接地气让人觉得跟你在一起特别放松。'},
  ZZZZ:{code:'ZZZZ',cn:'睡神',intro:'Zzzzzz...',desc:'你的超能力是——随时随地能睡着。你不是懒，你只是在用最低能耗模式运行。偶尔也要醒一醒，有些美好的事情只有睁着眼才能看到。'},
  POOR:{code:'POOR',cn:'穷神',intro:'我不是穷，我是简约。',desc:'你是朋友圈里最会省钱的人，堪称人形比价器。偶尔也对自己大方一点吧，你的辛苦值得被犒劳。'},
  MONK:{code:'MONK',cn:'和尚',intro:'阿弥陀佛。',desc:'你活出了很多人修了几辈子都修不到的境界——佛系。偶尔也可以让自己的生活多点烟火气。'},
  IMSB:{code:'IMSB',cn:'社恐',intro:'别看我别看我。',desc:'你恨不得能隐身走完这一生。社交对你来说是一种消耗。其实你内心很丰富，只是被一层厚厚的壳包裹着。找个安全的人，慢慢打开吧。'},
  SOLO:{code:'SOLO',cn:'独侠',intro:'我一个人也挺好的。',desc:'你是天生的独行者，享受一个人的时光胜过一群人的热闹。给别人一个走进你世界的机会吧。'},
  FUCK:{code:'FUCK',cn:'暴躁',intro:'烦死了烦死了烦死了。',desc:'你的情绪就像一座活火山，随时可能喷发。你的暴躁不是真正的愤怒，是你对不完美世界的吐槽方式。试着深呼吸三次再说话。'},
  DEAD:{code:'DEAD',cn:'咸鱼',intro:'我已经是一条咸鱼了。',desc:'你已经看透了人生的本质——躺平。其实你内心深处还是有小小的火星在闪的，找个让你心动的事吧。'},
  IMFW:{code:'IMFW',cn:'废物',intro:'我就是废物，怎么样。',desc:'你习惯性地贬低自己，已经把自嘲练成了一种防御机制。你远比你以为的要好。试着对自己温柔一点。'},
  HHHH:{code:'HHHH',cn:'傻乐者',intro:'哈哈哈哈哈哈。',desc:'恭喜您！由于您的思维回路过于清奇，标准人格库已全面崩溃，系统只能将您归类为"傻乐者"。你的快乐不需要理由，世界需要你这样的人，请继续傻乐下去！'},
  DRUNK:{code:'DRUNK',cn:'酒鬼',intro:'烈酒烧喉，不得不醉。',desc:'您为什么走路摇摇晃晃？恭喜您解锁了隐藏人格——酒鬼！您对酒精有着超越常人的热爱，保温杯里装的不是枸杞而是白酒。别人喝水解渴，你喝酒解忧。你是酒桌上的传说，朋友的快乐源泉。不过小酌怡情大酌伤身，适量饮用才能喝到九十九。'}
};

const DIM_EXPLANATIONS = {
  S1: { L:'对自己下手比别人还狠，夸你两句你都想先验明真伪。', M:'自信值随天气波动，顺风能飞，逆风先缩。', H:'心里对自己大致有数，不太会被路人一句话打散。' },
  S2: { L:'内心频道雪花较多，常在"我是谁"里循环缓存。', M:'平时还能认出自己，偶尔也会被情绪临时换号。', H:'对自己的脾气、欲望和底线都算门儿清。' },
  S3: { L:'别人说好你就信，价值观像WiFi信号随风飘。', M:'有些东西你很坚持，但不确定该不该坚持。', H:'有自己的一套标准，雷打不动。' },
  E1: { L:'感情里的安全感基本靠对方给，对方一撤你就塌。', M:'信任和怀疑五五开，看心情。', H:'你在感情里自带安全气囊，自己给自己托底。' },
  E2: { L:'投入是不可能投入的，这辈子都不可能。', M:'投入看缘分，缘分到了就all in。', H:'一旦认定就全力以赴，属于感情里的拼命三郎。' },
  E3: { L:'黏人是你，患得患失也是你。', M:'黏不黏看对方配不配合。', H:'你的个人空间比国家领土还神圣不可侵犯。' },
  A1: { L:'看谁都像要坑你，连路边的狗你都觉得有阴谋。', M:'看人看事比较理性，既不盲目乐观也不恶意揣测。', H:'你相信人性本善，哪怕被骗了也愿意再信一次。' },
  A2: { L:'规则是什么？能吃吗？', M:'规则嘛，看情况遵守吧。', H:'你是最守规矩的人，红绿灯没变你都不过马路。' },
  A3: { L:'人生的意义是什么？活着就行。', M:'偶尔也会想想要不要努力一下。', H:'你的目标感比导航还清晰，走错路都会自动纠偏。' },
  Ac1: { L:'你做事最大的动力是——逃避麻烦。', M:'有时候追求进步，有时候只想躺平。', H:'你做事就是为了变得更强，躺平对你来说比加班还累。' },
  Ac2: { L:'做决定？让我再想想。想了一个月还没想好。', M:'小事果断大事犹豫。', H:'你做决定比翻书还快，选择困难症跟你绝缘。' },
  Ac3: { L:'你的执行力堪比树懒，今天的事明天做，明天的事后天做。', M:'有人催就有执行力，没人催就躺平。', H:'你的执行力像高铁，说走就走，风雨无阻。' },
  So1: { L:'社交对你来说是加班，见人比上班还累。', M:'跟熟人社交还行，跟陌生人就缩了。', H:'你是社交悍匪，跟谁都能聊到飞起。' },
  So2: { L:'你的心理围墙比城墙还厚，谁都别想翻进来。', M:'围墙高度适中，翻得进也翻得出。', H:'你几乎没有边界，别人的事就是你的事。' },
  So3: { L:'你说的每句话都是真心话，藏不住事。', M:'有些话会说，有些话咽回去。', H:'你嘴上说的和心里想的，可能完全是两套剧本。' }
};

// 工具函数
function sumToLevel(score) {
  if (score <= 3) return 'L';
  if (score === 4) return 'M';
  return 'H';
}

function levelNum(level) {
  return level === 'L' ? 1 : level === 'M' ? 2 : 3;
}

function parsePattern(pattern) {
  return pattern.replace(/-/g, '').split('').map(function(l) { return levelNum(l); });
}

function shuffleArray(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

// 生成带门控题的完整题目列表
function generateQuestionList() {
  var normal = shuffleArray(NORMAL_QUESTIONS);
  var insertPos = 10; // 第10题后插入门控题
  var result = normal.slice(0, insertPos);
  result.push(SPECIAL_QUESTIONS[0]); // 爱好题
  result.push(SPECIAL_QUESTIONS[1]); // 饮酒态度题（默认加入，前端控制显示）
  result = result.concat(normal.slice(insertPos));
  return result;
}

// 计算SBTI结果
function calculateSBTIResult(answers, questionList) {
  var dimScores = {};
  DIMENSION_ORDER.forEach(function(d) { dimScores[d] = 0; });

  var drinkGateAnswer = null;
  var drinkTriggerAnswer = null;

  answers.forEach(function(answer, idx) {
    if (!answer) return;
    var q = questionList[idx];
    if (!q) return;

    if (q.special) {
      if (q.kind === 'drink_gate') drinkGateAnswer = answer.value;
      if (q.kind === 'drink_trigger') drinkTriggerAnswer = answer.value;
      return;
    }

    var dim = q.dim;
    if (dim && dimScores[dim] !== undefined) {
      dimScores[dim] += (answer.value || 0);
    }
  });

  // 酒鬼判定
  var isDrunk = (drinkGateAnswer === 3 && drinkTriggerAnswer === 2);

  // 维度等级
  var levels = {};
  DIMENSION_ORDER.forEach(function(d) {
    levels[d] = sumToLevel(dimScores[d]);
  });

  // 用户向量
  var userVector = DIMENSION_ORDER.map(function(d) { return levelNum(levels[d]); });

  // 匹配
  var ranked = NORMAL_TYPES.map(function(type) {
    var vec = parsePattern(type.pattern);
    var distance = 0, exact = 0;
    for (var i = 0; i < vec.length; i++) {
      var diff = Math.abs(userVector[i] - vec[i]);
      distance += diff;
      if (diff === 0) exact++;
    }
    var similarity = Math.max(0, Math.round((1 - distance / 30) * 100));
    return { code: type.code, pattern: type.pattern, distance: distance, exact: exact, similarity: similarity };
  });

  ranked.sort(function(a, b) {
    if (a.distance !== b.distance) return a.distance - b.distance;
    if (b.exact !== a.exact) return b.exact - a.exact;
    return b.similarity - a.similarity;
  });

  var finalType, modeLabel;
  if (isDrunk) {
    finalType = TYPE_LIBRARY['DRUNK'];
    modeLabel = '隐藏人格已激活';
  } else if (ranked[0].similarity < 60) {
    finalType = TYPE_LIBRARY['HHHH'];
    modeLabel = '系统强制兜底';
    ranked[0] = { code: 'HHHH', similarity: 0, exact: 0, distance: 99 };
  } else {
    finalType = TYPE_LIBRARY[ranked[0].code] || TYPE_LIBRARY['OJBK'];
    modeLabel = '你的主类型';
  }

  // 维度详情
  var dimDetails = DIMENSION_ORDER.map(function(d) {
    return {
      key: d,
      name: DIMENSION_META[d].name,
      model: DIMENSION_META[d].model,
      level: levels[d],
      score: dimScores[d],
      explanation: DIM_EXPLANATIONS[d][levels[d]] || ''
    };
  });

  return {
    test_id: 'sbti',
    modeLabel: modeLabel,
    typeData: finalType,
    matchInfo: { similarity: isDrunk ? 100 : ranked[0].similarity, exact: isDrunk ? 15 : ranked[0].exact },
    dimensions: dimDetails,
    dimensionScores: dimScores,
    isDrunk: isDrunk,
    result: {
      resultCode: finalType.code,
      type_name: finalType.cn,
      emoji: '🔥',
      description: finalType.intro
    }
  };
}

module.exports = {
  DIMENSION_ORDER: DIMENSION_ORDER,
  DIMENSION_META: DIMENSION_META,
  NORMAL_QUESTIONS: NORMAL_QUESTIONS,
  SPECIAL_QUESTIONS: SPECIAL_QUESTIONS,
  NORMAL_TYPES: NORMAL_TYPES,
  TYPE_LIBRARY: TYPE_LIBRARY,
  DIM_EXPLANATIONS: DIM_EXPLANATIONS,
  generateQuestionList: generateQuestionList,
  calculateSBTIResult: calculateSBTIResult
};
