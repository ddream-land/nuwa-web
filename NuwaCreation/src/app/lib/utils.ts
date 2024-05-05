"use client";
import { useEffect, useState } from "react";
import { TypeChara, TypeWorldBook, TypeWorldBookEntriy, TypeWorldBookItem, TypeWorldBookList, TypeCharaList, TypeCharaListItem } from "./definitions";
import defaultCoverBase64 from "./defalutCover";
import { keyBy, clone, findIndex } from "lodash-es";

const defaultChara = {
  name: "",
  description: "",
  personality: "",
  scenario: "",
  first_mes: "",
  mes_example: "",
  creatorcomment: "",
  avatar: "none",
  chat: "",
  talkativeness: "0.5",
  fav: false,
  spec: "chara_card_v2",
  spec_version: "2.0",
  data: {
    name: "",
    description: "",
    personality: "",
    scenario: "",
    first_mes: "",
    mes_example: "",
    creator_notes: "",
    system_prompt: "",
    post_history_instructions: "",
    tags: "",
    creator: "",
    character_version: "",
    alternate_greetings: [],
    extensions: {
      talkativeness: "0.5",
      fav: false,
      world: "",
      depth_prompt: { prompt: "", depth: 4 },
      avatars: [],
      languages: [],
      level: "",
      cclicense: "",
    },
  },
  create_date: "",
} as TypeChara;

const defaultWorldBook = {
  name: "no name",
  entries:{}
}

export const defaultWorldBookEntry: TypeWorldBookEntriy = {
  uid: "",
  keys: [],
  secondary_keys: [],
  comment: "",
  content: "",
  constant: true,
  selective: true,
  insertion_order: 100,
  enabled: true,
  position: 0,
  depth: 4,
  extensions: {
    exclude_recursion: false,
    display_index: "",
    probability: 100,
    useProbability: true,
  },
};

export function useChara() {
  const [chara, setChara] = useState<TypeChara>(() => {
    if (typeof window !== "undefined") {
      const charaed = localStorage.getItem("chara");
      return charaed ? JSON.parse(charaed) || defaultChara : defaultChara;
    }
    return defaultChara;
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chara", JSON.stringify(chara));
    }
  }, [chara]);
  return { chara, setChara };
}

export function getChara() {
  if (typeof window !== "undefined") {
    const charaed = localStorage.getItem("chara");
    return charaed ? JSON.parse(charaed) || defaultChara : defaultChara;
  }
  return defaultChara;
}

export function useWorldBook() {
  const {chara} = useChara()
  const [ character_book , setCharacter_Book ] = useState<TypeWorldBook>(() => {
    const defaultWorldBook = {
      entries:[
        {
          "id": 1,
          "keys": [],
          "secondary_keys": [],
          "comment": "Nuwa.org",
          "content": "",
          "constant": true,
          "selective": true,
          "insertion_order": 100,
          "enabled": true,
          "position": "after_char",
          "extensions": {
            "position": 3,
            "exclude_recursion": false,
            "display_index": 1,
            "probability": 100,
            "useProbability": true,
            "depth": 4
          }
        }
      ],
      name:chara.data.name + chara.data.character_version
    };
    if(typeof window !== "undefined" ){
      const character_booked = localStorage.getItem('character_book');
      return character_booked ? JSON.parse(character_booked) || defaultWorldBook : defaultWorldBook;
    }
    return defaultWorldBook;
  });
  useEffect(() => {
    if(typeof window !== "undefined") {
      localStorage.setItem("character_book",JSON.stringify(character_book))
    }
  },[character_book])
  return { character_book , setCharacter_Book }
}

export function useCover() {
  const [cover, setCover] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cover") || defaultCoverBase64;
    }
    return defaultCoverBase64;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cover", cover);
    }
  }, [cover]);

  return { cover, setCover };
}


export const useCoverHandler = () => {

  const [isReplacingTheCoverLoding, setIsReplacingTheCoverLoding] = useState(false);
  const handleReplacingTheCover = async (e: any, setCover: (data: string) => void) => {
    setIsReplacingTheCoverLoding(true);
    if(typeof window !== "undefined"){
      const file = e.target.files[0];
      const res = await fetch("/api/upcover", {
        method: "POST",
        body: file,
      });
      if(res.ok){
        const data = await res.text();
        // localStorage.setItem("cover", data);
        setCover(data);
        setIsReplacingTheCoverLoding(false);
      }else{
        setIsReplacingTheCoverLoding(false);
        alert("Failed to upload: please make sure you are uploading an image");
      }
    }else{
      setIsReplacingTheCoverLoding(false);
      alert('Please change your browser');
    }
  };

  return { isReplacingTheCoverLoding, handleReplacingTheCover };
};

export const useReadChar = () => {
  const [isReadCharLoding, setIsReadCharLoding] = useState(false);
  const handleReadChar = async(e:any) =>{
    setIsReadCharLoding(true);
    if(typeof window !== "undefined"){
      const file = e.target.files[0];
      const res = await fetch("/api/readchar",{
        method:"POST",
        body:file,          
      });
      if(res.ok){
        const data = await res
        console.log(data)
        setIsReadCharLoding(false)
      }else{
        setIsReadCharLoding(false)
      }
    }else{
      setIsReadCharLoding(false)
    }
  }
  setIsReadCharLoding(false)
}


export const usePostCharaAll = () => {
  const { chara, setChara } = useChara();

  if (!chara.data.character_book) {
    return { chara }
  }
  
  const updateChara = usePostCharaFun(chara, chara.data.character_book)
  return { updateChara };
};

export const usePostChara = () => {
  const { chara, setChara } = useChara();
  const { character_book, setCharacter_Book } = useWorldBook();

  const updateChara = usePostCharaFun(chara, character_book)

  return { updateChara };
};

export const usePostCharaFun = (chara: TypeChara, character_book: TypeWorldBook,) => {

  const newEntries = keyBy(Object.keys(character_book.entries).map((key) => {
    const entry = character_book.entries[key]
    return {
      ...entry,
      key: entry.keys !== undefined ? [entry.keys].flat() : [],                    
      secondary_keys: entry.secondary_keys !== undefined ? [entry.secondary_keys].flat() : [],
    }
  }), 'uid');

  const updatedWorldBook = {
    ...character_book,
    entries: newEntries || {},
    // name: chara.data.name + chara.data.character_version,
  };

  const updateChara: TypeChara = {
    ...chara,
    data: {
      ...chara.data,
      extensions: {
        ...chara.data.extensions,
        world: updatedWorldBook.name,
      },
      character_book: {
        ...character_book,
        entries: updatedWorldBook.entries,
        // name: chara.data.name + chara.data.character_version,
      },
    },
  };

  return { updateChara };
};

export const useCharaList = () => {
  const [charaList, setCharaList] = useState<TypeCharaList>(() => {
    if (typeof window !== "undefined") {
      const charaed = localStorage.getItem("charaList");
      return charaed ? JSON.parse(charaed) || [] : []
    }
    return [];
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("charaList", JSON.stringify(charaList));
    }
  }, [charaList]);
  return { charaList, setCharaList };
}

export const getCharaList = (): TypeCharaList => {
  if (typeof window !== "undefined") {
    const charaed = localStorage.getItem("charaList");
    return charaed ? JSON.parse(charaed) || [] : []
  }
  return [] as TypeCharaList;
};


export const pushCharaList = (charaList: TypeCharaList) => {
  if (typeof window !== "undefined") {
      localStorage.setItem("charaList", JSON.stringify(charaList));
  }
};
export const pushCharaListByUid = (newChara: TypeCharaListItem) => {
   const charaList = getCharaList();
  const newCharaList = charaList.map((chara, index):TypeCharaListItem => {
    if (chara.uid === newChara.uid) {
      return newChara
    }
    return chara
  })
  pushCharaList(newCharaList)
};

export const uuid = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] as any & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}
export const createChara = (cover: string = defaultCoverBase64, chara: TypeChara = defaultChara) => {
  const uid = uuid();
  const newChara: TypeCharaListItem = {
    uid: uid,
    cover: cover,
    chara: chara,
  }
  
  return newChara;
}

export const getCharacterByUid = (uid:string): TypeCharaListItem | null => {
  if (typeof window !== "undefined") {
    const charaListJson = localStorage.getItem("charaList");
    let charaList = [] as TypeCharaList;
    if (charaListJson) {
      charaList = JSON.parse(charaListJson) as TypeCharaList;
    }
    const index = findIndex(charaList, (item) => {
      return item.uid === uid
    })
    return charaList ? charaList[index] : null
  }
  return null;
};


export const deleteCharacterByUid = (uid:string) => {
  if (typeof window !== "undefined") {
    const charaListJson = localStorage.getItem("charaList");
    let charaList = [] as TypeCharaList;
    if (charaListJson) {
      charaList = JSON.parse(charaListJson) as TypeCharaList;
    }
    const index = findIndex(charaList, (item) => {
      return item.uid === uid
    })

    const newWorldBookList = charaList.filter((_, i) => i !== index);
    localStorage.setItem("charaList", JSON.stringify(newWorldBookList));
  }
  return null;
};

export const createWorldBook = () => {
  const uid = uuid();
  const uid2 = uuid();
  let newEntry = clone(defaultWorldBookEntry);
  newEntry.uid = uid2;
  newEntry.extensions.display_index = uid2;

  const newChara: TypeWorldBookItem = {
    uid: uid,
    worldBook: {
      name: '',
      entries: {
        [uid2]: newEntry,
      }
    },
  }
  
  return newChara;
}

export const InsertWorldBook = (worldBook: TypeWorldBook) => {
  const uid = uuid();

  const newChara: TypeWorldBookItem = {
    uid: uid,
    worldBook: {
      ...worldBook,
    },
  }
  
  return newChara;
}

export const pushWorldBookList = (worldBookList: TypeWorldBookList) => {
  if (typeof window !== "undefined") {
      localStorage.setItem("worldBookList", JSON.stringify(worldBookList));
  }
};


export const getWorldBookList = (): TypeWorldBookList => {
  if (typeof window !== "undefined") {
    const worldBookList = localStorage.getItem("worldBookList");
    return worldBookList ? JSON.parse(worldBookList) || [] : []
  }
  return [] as TypeWorldBookList;
};

export const getWorldBookByUid = (uid:string): TypeWorldBookItem | null => {
  if (typeof window !== "undefined") {
    const worldBookListJson = localStorage.getItem("worldBookList");
    let worldBookList = [] as TypeWorldBookList;
    if (worldBookListJson) {
      worldBookList = JSON.parse(worldBookListJson) as TypeWorldBookList;
    }
    const index = findIndex(worldBookList, (item) => {
      return item.uid === uid
    })
    return worldBookList ? worldBookList[index] : null
  }
  return null;
};


export const deleteWorldBookByUid = (uid:string) => {
  if (typeof window !== "undefined") {
    const worldBookListJson = localStorage.getItem("worldBookList");
    let worldBookList = [] as TypeWorldBookList;
    if (worldBookListJson) {
      worldBookList = JSON.parse(worldBookListJson) as TypeWorldBookList;
    }
    const index = findIndex(worldBookList, (item) => {
      return item.uid === uid
    })

    const newWorldBookList = worldBookList.filter((_, i) => i !== index);
    localStorage.setItem("worldBookList", JSON.stringify(newWorldBookList));
  }
  return null;
};