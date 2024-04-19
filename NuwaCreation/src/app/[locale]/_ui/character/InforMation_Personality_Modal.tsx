"use client";
import React, { useState } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { Button, Card, CardBody, CardHeader, Checkbox, Chip, Divider, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import {
  XMarkIcon,
  ArrowUpRightIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import NuwaInsertIcon from "../icons/NuwaInsertIcon";
import NuwaButton from "../components/NuwaButton";
import { cloneDeep, trim } from "lodash-es";

const originalPersonalityData = [
  {
    name: "身份",
    list: [{
      name: "年龄阶段",
      list: ['少年', '青年'],
    }]
  }, {
    name: "性格",
    list: [{
      name: "内向",
      list: ['内向1', '内向2'],
    }, {
      name: "外向",
      list: ['外向1', '外向2'],
    }]
  }
]
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

function InforMation_Personality({setPersonalityNewValue, oldPersonalityValue}: {setPersonalityNewValue: Function, oldPersonalityValue: string}) {
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
    <div className="h-6/12 py-4 flex flex-col">
        <Modal placement={"top"} isOpen={msgModal.isOpen} onOpenChange={msgModal.onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>{errorMessage}</ModalBody>
                </>
            )}
          </ModalContent>
        </Modal>
        <Button
          variant="ghost"
          className="border w-44 rounded-full"
          onPress={onOpen}
          endContent={<ArrowUpRightIcon className="h-6 w-6"/>}
        >
            打开PList生成器
        </Button>
        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="bottom-center"
          size="5xl"
          scrollBehavior="inside"
          classNames={{
            body: "bg-transparent py-6 h-full",
            backdrop: "h-full",
            base: "border-none shadow-none bg-transparent  text-[#a8b0d3] h-full",
            closeButton: "hover:bg-white/5 active:bg-white/10",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <div className="grid grid-cols-3 gap-4 h-full  rounded-[50px]">
                    <div className="bg-black rounded-[50px] h-full relative bg-[url('/character-inforMation-personality-model-bg.png')] bg-right-bottom bg-cover">
                      <div className="p-4">
                      {personalityDataList.map((category1, index1) => (
                        <>
                          {getFruitSelectedLength(category1.list) > 0 && <>
                            <Card key={`${category1.name}${index1}`}className="py-4 bg-transparent text-white border-none shadow-none">
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
                          <Divider className="bg-white" />
                          </>
                          }
                        </>
                      ))}
                      {customerPersonalityDataList.map((category1, index1) => (
                        <>
                          {getFruitSelectedLength(category1.list) > 0 && <>
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
                          <Divider className="bg-white" />
                          </>
                          }
                        </>
                      ))}
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
                      <div
                        className="cursor-pointer flex flex-row items-center justify-center absolute bottom-4 right-4 h-16 w-52 z-40 bg-[url('/character-inforMation-personality-model-insert-bg.png')] bg-no-repeat bg-center bg-contain"
                        onClick={handleInsertPersonality}
                      >
                        <span className="text-black text-xl ont-semibold">插入</span>
                        <NuwaInsertIcon className='h-4 w-11 text-black' aria-hidden="true" />
                      </div>
                    </div>

                    <div className="col-span-2 bg-white rounded-[50px] h-full py-16 px-8 relative">
                      <Tabs
                        aria-label="Options"
                        variant="solid"
                        classNames={{
                          base: "mr-32",
                          tabList: "bg-[#D9D9D9]",
                          cursor: "w-full bg-[#0C0C0C] text-white",
                          tab:"group-data-[selected=true]:bg-[#0C0C0C]",
                          tabContent: "text-zinc-800 group-data-[selected=true]:text-white",
                        }}
                      >
                        {personalityDataList.filter((item) => !item.isCustomer).map((category1, index1) => (
                          <Tab key={`${category1.name}${index1}`} title={category1.name}>
                            <div className="flex flex-row-reverse">
                              <Button onPress={plistModal.onOpen} variant="light" className="w-40" endContent={<PlusIcon/>}>
                                添加自定义Plist
                              </Button>
                              <Modal 
                                isOpen={plistModal.isOpen} 
                                onOpenChange={plistModal.onOpenChange}
                                placement="top-center"
                                className="rounded-[30px]"
                                hideCloseButton={true}
                              >
                                <ModalContent>
                                  {(onClose) => (
                                    <>
                                      <ModalHeader className="flex flex-col gap- text-4xl text-center py-8">自定义</ModalHeader>
                                      <ModalBody>
                                        <Input
                                          autoFocus
                                          label="类型"
                                          isDisabled={pListIndex >= 0}
                                          labelPlacement="outside-left"
                                          classNames={{
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
                                          placeholder=""
                                          variant="bordered"
                                          value={pListName}
                                          onChange={(e) => {
                                            usePListName(e.target.value);
                                          }}
                                        />
                                        <Input
                                          label="属性"
                                          labelPlacement="outside-left"
                                          classNames={{
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
                                          placeholder="多个用,分隔"
                                          variant="bordered"
                                          value={pListProps}
                                          onChange={(e) => {
                                            usePListProps(e.target.value);
                                          }}
                                        />
                                      </ModalBody>
                                      <ModalFooter>
                                        <NuwaButton className="h-16 w-48 text-xl" color="black" variant="flat" onPress={handleModalOnClose}>取消</NuwaButton>
                                        <NuwaButton className="h-16 w-48 text-xl" color="gray" onPress={insertCustomerPlist}>添加</NuwaButton>
                                      </ModalFooter>
                                    </>
                                  )}
                                </ModalContent>
                              </Modal>
                            </div>
                            

                            <Divider className="bg-[#171717]" />
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

                            <Button onPress={() => {
                              plistModal.onOpen();
                              usePListName(category1.name);
                              usePListIndex(index1);
                            }}  variant="light" className="w-40 absolute bottom-4 right-6" endContent={<PlusIcon/>}>
                              添加自定义身份
                            </Button> 
                          </Tab>
                        ))}
                      </Tabs>
                      
                    </div>
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
