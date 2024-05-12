"use client";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button, Card, CardBody, CardHeader, Chip, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import {
  XMarkIcon,
  ArrowUpRightIcon,
  PlusIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/outline';
import NuwaButton from "../components/NuwaButton";
import { cloneDeep, trim } from "lodash-es";

const originalPersonalityDataZhCN = [
  {
    name: "身份",
    list: [
      {
      name: "年龄阶段",
      list: ['少年', '少女', '青年男性', '青年女性', '中年男性', '中年女性', '老年男性', '老年女性', '萝莉', '男童', '女童'],
    },
    {
      name: "社会身份",
      list: ['赛车手', '总裁', '学长', '少爷', '电竞大神', '科学家', '教授', '程序员', '厨师', '医生', '侦探','纨绔','律师','店长','影帝','老板','画家','富二代','将军','军师','王爷','暴君','锦衣卫','世子','帝王','学霸','秀才','侠客','城主','师兄','战神','侍卫','警察','刺客','盗贼','小学生','中学生','大学生','校花','校草','修女','护士','偶像','师妹','学妹','学姐','老师','明星','舞女','女仆','大小姐','公主','皇后'],
    },
    {
      name: "非人类",
      list: ['吸血鬼','半兽人','妖精','精灵','美人鱼','魔法少女','天使','魔鬼','人偶','巫女','机器人','外星人','幽灵','僵尸','鬼','狼人','巨人'],
    },
    {
      name: "具体年龄描述",
      list: ['8岁','12岁','14岁','17岁','18岁','20岁','25岁','30岁','36岁','48岁','56岁','68岁','72岁'],
    }
  ]
  },
  {
    name: "性格",
    list: [
      {
      name: "网络热门",
      list: ['温文儒雅','冷静腹黑','凉薄冷漠','桀骜不驯','狂妄霸道','沙雕逗比','邪魅暴虐','阳光开朗','自卑敏感','敏感多疑','表里不一','不善表达','刀子嘴豆腐心','病弱','妄自尊大','傲娇','完美主义','完美主义','中二病','高冷'],
    }, 
    {
      name: "外向性",
      list: ['外向', '健谈', '开朗', '合群', '活跃', '内向', '沉默', '孤独', '腼腆', '害羞', '梳离'],
    },
    {
      name: "尽责性",
      list: ['认真', '尽责', '可靠', '有责任心', '一丝不苟', '诚信', '有担当', '马虎', '随意', '懒散', '散漫' ],
    },
    {
      name: "亲和性",
      list: ['热情', '和蔼', '友善', '淳朴', '大方', '随和', '可亲', '冷漠', '冷淡', '孤僻', '刻薄', '傲慢', '高傲', '冷酷'],
    },
    {
      name: "神经质性",
      list: ['冷静', '稳定', '坚强', '沉着', '自信', '理智', '乐观', '豁达', '坚韧', '焦虑', '忧郁', '悲观', '情绪化', '抑郁', '易怒', '神经过敏'],
    }, 
    {
      name: "开放性",
      list: ['创新', '机敏', '富有想象', '探索好奇', '自由思考', '浪漫', '传统', '保守', '体制化', '独裁', '拘谨'],
    }, 
    ]
  },
  {
    name: "外表",
    list: [
      {
      name: "体型",
      list: ['苗条','丰满','高','矮','微胖','肥胖','瘦','魁梧','匀称','修长','强壮','健硕','肌肉','体态轻盈','身材臃肿','虎背熊腰','大腹便便','亭亭玉立','弱不禁风','瘦骨嶙峋'],
    }, 
    {
      name: "眉",
      list: ['浓眉','柳叶眉','一字眉','剑眉','新月眉','高挑眉','山黛眉','吊眉','月牙眉','眉如新月','眉清目秀','慈眉善目','贼眉鼠眼','杏眼'],
    },
    {
      name: "眼",
      list: ['杏眼','小鹿眼','桃花眼','瑞凤眼','狐狸眼','柳叶眼','丹凤眼','下垂眼','眯缝眼','细长眼','肿泡眼','三角眼'],
    },
    {
      name: "耳",
      list: ['顺风耳','招风耳','精灵耳','扇风耳','猫耳朵','狗耳朵','狐狸耳朵','兔耳朵'],
    },
    {
      name: "唇",
      list: ['厚唇','薄唇','樱桃小嘴','唇红齿白','尖嘴猴腮','唇如胭脂','唇无血色','血盆大口','虎牙'],
    },
    {
      name: "头发",
      list: ['长发','短发','黑发','白发','银发','红发','金发','卷发','背头','飞机头','丸子头','寸头','中分头','齐刘海','高马尾','双马尾','黑发如瀑','长发及腰','披头散发','蓬头垢面'],
    },
    {
      name: "服饰",
      list: ['T恤','大衣','长袍','西装','皮衣','军装','汉服','道袍','铠甲','龙袍','礼服','长裙','连衣裙','衬衫','短裙','女仆装','短裤','运动服','牛仔服','水手服','围裙','校服','婚纱','紧身服','旗袍','和服','洛丽塔','比基尼','JK制服','泳装','短袜','丝袜','过膝袜','连裤袜','吊带袜','运动鞋','平底鞋','拖鞋','皮鞋','高跟鞋','靴子','凉鞋','舞鞋'],
    },
    ]
  },
  {
    name: "喜欢",
    list: [
      {
      name: "运动型爱好",
      list: ['足球','篮球','棒球','乒乓球','游泳','瑜伽','攀岩','滑雪','跳伞','划船','冲浪','潜水'],
    }, 
    {
      name: "艺术型爱好",
      list: ['绘画','摄影','陶艺','唱歌','舞蹈','戏剧','魔术','写作','阅读','诗歌','音乐'],
    },
    {
      name: "学习型爱好",
      list: ['编程','烹饪','园艺','历史','天文学','心理学','哲学','物理学','英语','日语','法语'],
    },
    {
      name: "娱乐型爱好",
      list: ['电影','电视剧','电子游戏','桌游','音乐节','聚会'],
    },
    {
      name: "动物",
      list: ['小动物','猫','狗','兔子','昆虫'],
    }
    ]
  },
  {
    name: "讨厌",
    list: [
      {
      name: "食物",
      list: ['榴莲','香菜','葱','芹菜'],
    }, 
    {
      name: "情绪",
      list: ['挫折','悲伤','失败','孤独'],
    },     
    {
      name: "品质",
      list: ['傲慢','虚伪','撒谎','背叛','不公'],
    }
    ]
  },
  {
    name: "16人格MBTI",
    list: [
      {
      name: "MBTI",
      list: ['ISTJ(物流师型)','ISTP(鉴赏家型)','ISFJ(守卫者型)','ISFP((探险家型)','INFJ(提倡者型)','INFP(调停者型)','INTJ建筑师型)','INTP(逻辑学家型)','ESTP(企业家型)','ESFP(表演者型)','ENFP(竞选者型)','ENTP(辩论家型)','ESTJ(总经理型)','ESFJ(执行官型)','ENFJ(主人公型)','ENTJ(指挥官型)'],
    }, 
    ]
  },
  {
    name: "语言风格",
    list: [
    {
      name: "热门风格",
      list: ['高傲自大','粗鲁冒失','虐心冷酷','温柔体贴','古灵精怪','机智幽默','忧郁悲观','独断独行','严肃认真','豁达开朗','淡漠','元气满满','元气满满','搞笑逗比','腹黑','傲娇','沙雕','病娇','毒舌','天然呆'],
    }, 
    {
      name: "更多风格",
      list: ['幽默','张狂','古风','讽刺','极简','高冷','活泼','轻松','正式','智谋','温文尔雅','温文尔雅','莽撞','老道','可爱','软萌','严谨','深沉','豪放','成熟','稳重','稳重'],
    }, 
    {
      name: "类型",
      list: ['书面语','口头语','网络用语','现代口语','文言文','文言文'],
    }, 
    {
      name: "按角色",
      list: ['正常风格','古早风格','高贵风格','少女风格','少年风格','俚语风格','孩童风格','老人风格','机器人风格','绅士风格','淑女风格'],
    }, 
    ]
  },
]
const originalPersonalityDataEn = [
  {
    "name": "Identity",
    "list": [
      {
      "name": "Age Group",
      "list": ['Boy', 'Girl', 'Young Man', 'Young Woman', 'Middle-Aged Man', 'Middle-Aged Woman', 'Elderly Man', 'Elderly Woman', 'Little Girl', 'Little Boy', 'Child'],
    },
    {
      "name": "Social Status",
      "list": ['Racer', 'CEO', 'Senior Student', 'Young Master', 'E-sports Champion', 'Scientist', 'Professor', 'Programmer', 'Chef', 'Doctor', 'Detective','Rich Heir','Lawyer','Shop Manager','Leading Actor','Boss','Painter','Rich Second Generation','General','Military Strategist','Nobleman','Tyrant','Imperial Guard','Heir Apparent','Emperor','Top Student','Scholar','Wanderer','Lords','Senior Brother','God of War','Guard','Police','Assassin','Thief','Elementary Student','Middle School Student','University Student','School Belle','School Hunk','Nun','Nurse','Idol','Junior Sister','Junior Girl','Senior Girl','Teacher','Star','Dancer','Maid','Young Lady','Princess','Queen'],
    },
    {
      "name": "Non-human",
      "list": ['Vampire','Half-Beast','Fairy','Elf','Mermaid','Magical Girl','Angel','Devil','Doll','Shrine Maiden','Robot','Alien','Ghost','Zombie','Ghost','Werewolf','Giant'],
    },
    {
      "name": "Specific Age Description",
      "list": ['8 years old','12 years old','14 years old','17 years old','18 years old','20 years old','25 years old','30 years old','36 years old','48 years old','56 years old','68 years old','72 years old'],
    }
  ]
  },
  {
    "name": "Personality",
    "list": [
      {
      "name": "Popular Online",
      "list": ['Gentle and Elegant','Calm and Scheming','Cold and Indifferent','Unruly','Arrogant and Domineering','Silly and Funny','Charming and Brutal','Bright and Cheerful','Inferior and Sensitive','Suspicious','Two-Faced','Poor at Expressing','Tough on the Outside, Soft on the Inside','Frail','Delusional about Own Importance','Tsundere','Perfectionist','Perfectionist','Chuunibyo','Aloof'],
    }, 
    {
      "name": "Extraversion",
      "list": ['Extroverted', 'Talkative', 'Cheerful', 'Sociable', 'Active', 'Introverted', 'Silent', 'Lonely', 'Shy', 'Timid', 'Detached'],
    },
    {
      "name": "Conscientiousness",
      "list": ['Serious', 'Responsible', 'Reliable', 'Diligent', 'Meticulous', 'Honest', 'Accountable', 'Careless', 'Casual', 'Lazy', 'Sloppy' ],
    },
    {
      "name": "Agreeableness",
      "list": ['Warm', 'Kind', 'Friendly', 'Simple', 'Generous', 'Easygoing', 'Approachable', 'Indifferent', 'Cold', 'Reclusive', 'Harsh', 'Arrogant', 'Proud', 'Cold-Hearted'],
    },
    {
      "name": "Neuroticism",
      "list": ['Calm', 'Stable', 'Strong', 'Composed', 'Confident', 'Rational', 'Optimistic', 'Open-Minded', 'Resilient', 'Anxious', 'Melancholic', 'Pessimistic', 'Emotional', 'Depressed', 'Irritable', 'Over-Sensitive'],
    }, 
    {
      "name": "Openness",
      "list": ['Innovative', 'Clever', 'Imaginative', 'Curious', 'Independent Thinking', 'Romantic', 'Traditional', 'Conservative', 'Formalistic', 'Authoritarian', 'Restrained'],
    }, 
    ]
  },
  {
    "name": "Appearance",
    "list": [
      {
      "name": "Body Type",
      "list": ['Slim','Voluptuous','Tall','Short','Slightly Chubby','Obese','Thin','Broad-Shouldered','Well-Proportioned','Slender','Muscular','Athletic','Muscular','Graceful','Bulky','Broad and Powerful','Pot-Bellied','Graceful','Frail','Skin and Bones'],
    }, 
    {
      "name": "Eyebrows",
      "list": ['Thick Eyebrows','Willow Leaf Eyebrows','Straight Eyebrows','Sword Eyebrows','Crescent Eyebrows','Arched Eyebrows','Peaks Eyebrows','Slanted Eyebrows','Curved Eyebrows','Elegant Eyebrows','Clear Eyed','Kind-Eyed','Sly Eyes','Almond Eyes'],
    },
    {
      "name": "Eyes",
      "list": ['Almond Eyes','Deer Eyes','Peach Blossom Eyes','Phoenix Eyes','Fox Eyes','Willow Leaf Eyes','Phoenix Eyes','Droopy Eyes','Slit Eyes','Narrow Eyes','Puffy Eyes','Triangular Eyes'],
    },
    {
      "name": "Ears",
      "list": ['Hears Everything','Large Ears','Elfin Ears','Fanning Ears','Cat Ears','Dog Ears','Fox Ears','Rabbit Ears'],
    },
    {
      "name": "Lips",
      "list": ['Thick Lips','Thin Lips','Small and Cherry Lips','Red Lips White Teeth','Pointy-Chin Cheekbones','Rosy Lips','Pale Lips','Wide Mouth','Tiger Teeth'],
    },
    {
      "name": "Hair",
      "list": ['Long Hair','Short Hair','Black Hair','White Hair','Silver Hair','Red Hair','Blonde Hair','Curly Hair','Slick Back','Crew Cut','Bun','Buzz Cut','Middle Part','Straight Bangs','High Ponytail','Double Ponytails','Black Cascading Hair','Waist-long Hair','Disheveled','Unkempt and Dirty'],
    },
    {
      "name": "Clothing",
      "list": ['T-Shirt','Coat','Robe','Suit','Leather Jacket','Military Uniform','Traditional Dress','Taoist Robe','Armor','Imperial Robe','Tuxedo','Long Skirt','Dress','Shirt','Mini Skirt','Maid Outfit','Shorts','Tracksuit','Denim','Sailor Uniform','Apron','School Uniform','Wedding Dress','Tight-fitting','Cheongsam','Kimono','Lolita Fashion','Bikini','Schoolgirl Uniform','Swimwear','Ankle Socks','Tights','Over-Knee Socks','Pantyhose','Suspender Tights','Sneakers','Flats','Slippers','Leather Shoes','High Heels','Boots','Sandals','Dance Shoes'],
    },
    ]
  },
  {
    "name": "Likes",
    "list": [
      {
      "name": "Sports/Hobbies",
      "list": ['Football','Basketball','Baseball','Table Tennis','Swimming','Yoga','Climbing','Skiing','Skydiving','Rowing','Surfing','Diving'],
    }, 
    {
      "name": "Artistic Hobbies",
      "list": ['Painting','Photography','Ceramics','Singing','Dancing','Drama','Magic','Writing','Reading','Poetry','Music'],
    },
    {
      "name": "Learning Hobbies",
      "list": ['Programming','Cooking','Gardening','History','Astronomy','Psychology','Philosophy','Physics','English','Japanese','French'],
    },
    {
      "name": "Entertainment Hobbies",
      "list": ['Movies','TV Shows','Video Games','Board Games','Music Festivals','Parties'],
    },
    {
      "name": "Animals",
      "list": ['Small Animals','Cats','Dogs','Rabbits','Insects'],
    }
    ]
  },
  {
    "name": "Dislikes",
    "list": [
      {
      "name": "Food",
      "list": ['Durian','Cilantro','Onion','Celery'],
    }, 
    {
      "name": "Emotions",
      "list": ['Frustration','Sadness','Failure','Loneliness'],
    },     
    {
      "name": "Character Traits",
      "list": ['Arrogance','Deceit','Lying','Betrayal','Injustice'],
    }
    ]
  },
  {
    "name": "16 Personality MBTI",
    "list": [
      {
      "name": "MBTI",
      "list": ['ISTJ(Logistician)','ISTP(Virtuoso)','ISFJ(Defender)','ISFP(Adventurer)','INFJ(Advocate)','INFP(Mediator)','INTJ(Architect)','INTP(Logician)','ESTP(Entrepreneur)','ESFP(Performer)','ENFP(Campaigner)','ENTP(Debater)','ESTJ(Executive)','ESFJ(Consul)','ENFJ(Protagonist)','ENTJ(Commander)'],
    }, 
    ]
  },
  {
    "name": "Language Style",
    "list": [
    {
      "name": "Popular Styles",
      "list": ['Proud and Arrogant','Rude and Clumsy','Cruelly Cold','Gentle and Caring','Quirky','Witty and Humorous','Melancholic','Stubborn','Serious','Broad-Minded','Indifferent','Vibrant','Vibrant','Funny','Scheming','Tsundere','Silly','Yandere','Sarcastic','Naive'],
    }, 
    {
      "name": "More Styles",
      "list": ['Humorous','Wild','Antique','Satirical','Minimalist','Aloof','Lively','Relaxed','Formal','Strategic','Gentle and Elegant','Gentle and Elegant','Impulsive','Experienced','Cute','Soft','Rigorous','Deep','Free-Spirited','Mature','Steady','Steady'],
    }, 
    {
      "name": "Type",
      "list": ['Literary Language','Colloquial Language','Internet Slang','Modern Colloquial','Classical Chinese','Classical Chinese'],
    }, 
    {
      "name": "By Role",
      "list": ['Normal Style','Retro Style','Noble Style','Girl Style','Boy Style','Slang Style','Child Style','Elder Style','Robot Style','Gentleman Style','Lady Style'],
    }, 
    ]
  },
]


function InforMation_Personality({setPersonalityNewValue, oldPersonalityValue}: {setPersonalityNewValue: Function, oldPersonalityValue: string}) {
  const locale = useLocale();
  const originalPersonalityData = (locale === 'en') ? originalPersonalityDataEn : originalPersonalityDataZhCN;
  const personalityData = originalPersonalityData.map((item) => {
    return {
      name: item.name,
      isCustomer: false,
      list: item.list.map((item2) => {
        return {
          name: item2.name,
          isCustomer: false,
          list: item2.list.map((item3) => {
            return {
              name: item3,
              selected: false,
            }
          })
        }
      })
    }
  })
  const t = useTranslations();
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const plistModal = useDisclosure();
  const msgModal = useDisclosure();
  const [personalityDataList, usePersonalityDataList] = useState(personalityData);
  const [pListName, usePListName] = useState('');
  const [pListIndex, usePListIndex] = useState(-1);
  const [pListProps, usePListProps] = useState('');
  const [errorMessage, useErrorMessage] = useState('');
  const [customerPersonalityDataList, useCustomerPersonalityDataList] = useState([] as Array<{
    name: string,
    list: Array<{
      list: Array<{
        name: string,
        selected: boolean,
      }>
    }>
  }>);

  const getFruitSelectedLength = (list: Array<any>) => {
    let length = 0;

    list && list.length > 0 && list.map((item, index) => {
      item.list.map((aitem: {name: string, selected: boolean}) => {
        if (aitem.selected) {
          length += 1;
        }
      })
    })

    return length
  }

  const handleModalOnClose = () => {
    usePListName('');
    usePListProps('');
    usePListIndex(-1);
    plistModal.onClose();
  }

  const insertCustomerPlist = () => {
    if (trim(pListName) === '' || trim(pListProps) === '') {
      useErrorMessage('请输入PList名称或属性');
      msgModal.onOpen()
      return;
    }
    let newValue = cloneDeep(personalityDataList);
  
    if (pListIndex >= 0) {
      newValue[pListIndex].list = newValue[pListIndex].list.concat([{
        name: 'customerCategory',
        isCustomer: true,
        list: pListProps.split(',').map((item) => {
          return {
            name: item,
            selected: true,
          }
        })
      }])
    } else {
      newValue = personalityDataList.concat([{
        name: pListName,
        isCustomer: true,
        list: [{
          name: 'customerCategory',
          isCustomer: true,
          list: pListProps.split(',').map((item) => {
            return {
              name: item,
              selected: true,
            }
          })
        }]
      }])
    }
    

    usePersonalityDataList(newValue)

    handleModalOnClose();
  }
  const handleFruitClick = (index1:number, index2:number, index3:number) => {
    const newPersonalityDataList = personalityDataList.map((category1, category1Index) => {
      // 如果不是目标行，则直接返回原数组
      if (category1Index !== index1) {
        return category1;
      }

      return {
        ...category1,
        list: category1.list.map((category2, category2Index) => {
          // 如果不是目标列，则直接返回原数组
          if (category2Index !== index2) {
            return category2;
          }
          // 更新目标位置的值
          return {
            ...category2,
            list: category2.list.map((pitem, itemIndex) => {
              // 如果不是目标列，则直接返回原数组
              if (itemIndex !== index3) {
                return pitem;
              }
              // 更新目标位置的值
              return {
                ...pitem,
                selected: !pitem.selected
              }
            })
          }
        })
      }
    });
    

    // 更新状态
    usePersonalityDataList(newPersonalityDataList);
  };

  const handleInsertPersonality = () => {
    const newPersonalityList =  personalityDataList.map((category1) => {
      return {
        ...category1,
        list: category1.list.map((category2) => {
          return category2.list.filter(item => item.selected).map((item) => {
            return item.name
          }).join(',')
        }).filter(item => { 
          return item.length > 0
        })
      }
    }).filter(item => { 
      return item.list.length > 0
     })

    const newPersonalityStrAr: Array<any> = [];
    newPersonalityList.map((item) => {
      if (item.list.length > 0) {
        newPersonalityStrAr.push(`[${item.name}:${item.list.join(',')}]`)
      }
    }).join(';');

    let personalityStr = oldPersonalityValue + newPersonalityStrAr;
    setPersonalityNewValue(personalityStr);
    onClose();
  }

  return (
    <div className="flex flex-col">
        <Modal placement={"top"} isOpen={msgModal.isOpen} onOpenChange={msgModal.onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>{errorMessage}</ModalBody>
                </>
            )}
          </ModalContent>
        </Modal>
        <NuwaButton
          shadowghost="black"
          onPress={onOpen}
          startContent={<ArrowUpRightIcon className="h-5 w-5"/>}
        >
            {t('Character.personalitysummaryplist')}
        </NuwaButton>
        <Modal 
          isDismissable={!msgModal.isOpen}
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="bottom-center"
          size="full"
          scrollBehavior="inside"
          classNames={{
            wrapper: "h-full w-5/6 mx-auto",
            body: "bg-transparent py-6 h-full w-full",
            backdrop: "h-full",
            base: "border-none shadow-none bg-transparent  text-[#a8b0d3] h-full",
            closeButton: "hover:bg-white/5 active:bg-white/10",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <div className="grid grid-cols-3 gap-4 h-full w-full rounded-[50px] relative">
                    <div className="overflow-y-scroll col-span-2 bg-white rounded-[50px] h-full py-16 px-8 relative">
                      <Tabs
                        aria-label="Options"
                        variant="solid"
                        classNames={{
                          base: "overflow-x-scroll w-full shrink-0",
                          tabList: "overflow-x-scroll bg-[#D9D9D9] h-14 px-4",
                          cursor: "w-full bg-[#0C0C0C] text-white",
                          tab:"group-data-[selected=true]:bg-[#0C0C0C] px-4",
                          tabContent: "text-zinc-800 group-data-[selected=true]:text-white",
                          panel: "overflow-y-scroll"
                        }}
                      >
                      {personalityDataList.filter((item) => !item.isCustomer).map((category1, index1) => (
                        <Tab key={`${category1.name}${index1}`} title={category1.name} className=" relative">
                          <div className="flex flex-row-reverse">
                            <Button onPress={plistModal.onOpen} variant="light" startContent={<PlusIcon className="h-5 w-5"/>}>
                              {t('Character.personalitysummaryplistType')}
                            </Button>
                            <Modal 
                              isOpen={plistModal.isOpen} 
                              onOpenChange={plistModal.onOpenChange}
                              placement="top-center"
                              className="rounded-[30px]"
                              size="lg"
                              hideCloseButton={true}
                            >
                              <ModalContent>
                                {(onClose) => (
                                  <>
                                    <ModalHeader className="flex flex-col gap- text-4xl text-center py-8">{t('Character.personalitysummaryplistmtitle')}</ModalHeader>
                                    <ModalBody>
                                      <Input
                                        autoFocus
                                        className="w-full"
                                        label={t('Character.personalitysummaryplistmtype')}
                                        placeholder={t('Character.personalitysummaryplistmtypetoken')}
                                        isDisabled={pListIndex >= 0}
                                        labelPlacement="outside-left"
                                        classNames={{
                                          base: "w-full",
                                          mainWrapper: "w-full",
                                          label: "text-[#171717] w-20 text-lg",
                                          input: [
                                            "text-lg",
                                            "bg-transparent",
                                            "text-black/90",
                                          ],
                                          innerWrapper: "bg-transparent",
                                          inputWrapper: [
                                            "shadow-none",
                                            "bg-transparent",
                                            "border-none",
                                          ],
                                        }}
                                        variant="bordered"
                                        value={pListName}
                                        onChange={(e) => {
                                          usePListName(e.target.value);
                                        }}
                                      />
                                      <Input
                                        className="w-full"
                                        label={t('Character.personalitysummaryplistmtypeattr')}
                                        placeholder={t('Character.personalitysummaryplistmtypeattrtoken')}
                                        labelPlacement="outside-left"
                                        classNames={{
                                          base: "w-full",
                                          mainWrapper: "w-full",
                                          label: "text-[#171717] w-20 text-lg",
                                          input: [
                                            "text-lg",
                                            "bg-transparent",
                                            "text-black/90",
                                          ],
                                          innerWrapper: "bg-transparent",
                                          inputWrapper: [
                                            "shadow-none",
                                            "bg-transparent",
                                            "border-none",
                                          ],
                                        }}
                                        variant="bordered"
                                        value={pListProps}
                                        onChange={(e) => {
                                          usePListProps(e.target.value);
                                        }}
                                      />
                                    </ModalBody>
                                    <ModalFooter>
                                      <NuwaButton className="h-16 w-48 text-xl" color="black" variant="flat" onPress={handleModalOnClose}>{t('Character.personalitysummaryplistmcancel')}</NuwaButton>
                                      <NuwaButton className="h-16 w-48 text-xl" color="gray" onPress={insertCustomerPlist}>{t('Character.personalitysummaryplistmsave')}</NuwaButton>
                                    </ModalFooter>
                                  </>
                                )}
                              </ModalContent>
                            </Modal>
                          </div>
                          
                          <Divider className="bg-[#171717]" />
                          <div>
                          {category1.list.filter((item) => item.name !== 'customerCategory').map((category2, index2) => (
                            <Card key={`${index1}+${index2}`} className="py-4 bg-transparent text-white border-none shadow-none">
                              <CardHeader className="pb-0 pt-2 flex-col items-start">
                                <div className="text-sm text-[#676767]">{category2.name}</div>
                              </CardHeader>
                              <CardBody className="overflow-visible py-1">
                                <div className="flex flex-wrap gap-4">
                                  {category2.list.map((pitem, index3) => (
                                    <Chip
                                      className={`${pitem.selected ? 'bg-black text-white' : 'bg-[#D9D9D9] text-black'} h-9 px-4 w-auto  cursor-pointer`}
                                      key={`${index1}+${index2}+${index3}`}
                                      variant="flat"
                                      onClick={() => handleFruitClick(index1, index2, index3)}
                                    >
                                      {pitem.name}
                                    </Chip>
                                  ))}
                                </div>
                              </CardBody>
                            </Card>
                          ))}
                          </div>
                          <Button
                            onPress={() => {
                              plistModal.onOpen();
                              usePListName(category1.name);
                              usePListIndex(index1);
                            }} 
                          variant="light" className="absolute bottom-0 right-6" startContent={<PlusIcon className="h-5 w-5"/>}>
                            {t('Character.personalitysummaryplistRole')}
                          </Button> 
                        </Tab>
                      ))}
                      </Tabs>
                      
                    </div>
                    <div className="bg-black overflow-y-scroll rounded-[50px] h-full relative bg-[url('/character-inforMation-personality-model-bg.png')] bg-right-bottom bg-cover">
                      <div className="p-4 pb-16 grid grid-cols-1 divide-y divide-white">
                        {personalityDataList.map((category1, index1) => {
                          if (getFruitSelectedLength(category1.list) > 0) {
                            return (
                              <div>
                                <Card key={`${category1.name}${index1}`} className="py-4 bg-transparent text-white border-none shadow-none">
                                  <CardHeader className="pb-0 pt-2 flex-col items-start">
                                    <h4 className="font-bold text-large">{category1.name}</h4>
                                  </CardHeader>
                                  <CardBody className="overflow-visible py-6">
                                  <div className="flex flex-wrap gap-4">
                                    {category1.list.map((category2, index2) => (
                                      <>
                                      {category2.list.map((pitem, index3) => (
                                        <>
                                        {pitem.selected && <Chip
                                          className="bg-white h-9 cursor-pointer px-4 w-auto "
                                          key={`${category1.name}${index1}+${category2.name}${index2}+${index3}`}
                                          endContent={<XMarkIcon className="h-4 w-4" onClick={() => handleFruitClick(index1, index2, index3)} />}
                                          variant="flat"
                                        >
                                          {pitem.name}
                                        </Chip>}
                                        </>
                                      ))}
                                      </>
                                    ))}
                                  </div>
                                </CardBody>
                                </Card>
                              </div>
                            )
                          }
                        })}
                        {customerPersonalityDataList.map((category1, index1) => {
                          if (getFruitSelectedLength(category1.list) > 0 ) {
                            return (
                              <div>
                                <Card key={index1} className="py-4 bg-transparent text-white border-none shadow-none">
                                  <CardHeader className="pb-0 pt-2 flex-col items-start">
                                    <h4 className="font-bold text-large">{category1.name}</h4>
                                  </CardHeader>
                                  <CardBody className="overflow-visible py-6">
                                  <div className="flex flex-wrap gap-4">
                                    {category1.list.map((category2, index2) => (
                                      <>
                                      {category2.list.map((pitem, index3) => (
                                        <>
                                        {pitem.selected && <Chip
                                          className="bg-white h-9 cursor-pointer px-4 w-auto "
                                          key={`${index1}+${index2}+${index3}`}
                                          endContent={<XMarkIcon className="h-4 w-4" onClick={() => handleFruitClick(index1, index2, index3)} />}
                                          variant="flat"
                                        >
                                          {pitem.name}
                                        </Chip>}
                                        </>
                                      ))}
                                      </>
                                    ))}
                                  </div>
                                </CardBody>
                                </Card>
                              </div>
                            )
                          }
                        })}
                      </div>
                    </div>

                    <Button
                        onClick={() => {
                          onClose();
                        }}
                        className="absolute top-4 right-4 h-12 w-12 p-0 rounded-full bg-white z-40"
                        type="button"
                        color="default"
                        variant="flat"
                        isIconOnly
                      >
                        <XMarkIcon className="h-8 w-8 text-black font-black absolute" aria-hidden="true" />
                      </Button>
                      <NuwaButton
                        color="gray"
                        className=" absolute bottom-4 right-4 z-10 w-32 h-12 text-base"
                        onClick={handleInsertPersonality}
                        endContent={<ArrowLongRightIcon className="h-8 w-8 fill-white" />}
                      >
                        {t('Character.personalitysummaryplistinsert')}
                      </NuwaButton>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
    </div>
  );
}

export default InforMation_Personality;
