import { TypeAvatar } from "./definitions.avatar";

export type TypeChara = {
  name: string;
  description: string;
  personality: string;
  scenario: string;
  first_mes: string;
  mes_example: string;
  creatorcomment: string;
  avatar: string;
  chat: string;
  talkativeness: string;
  fav: Boolean;
  spec: string;
  spec_version: string;
  data: {
    name: string;
    description: string;
    personality: string;
    scenario: string;
    first_mes: string;
    mes_example: string;
    creator_notes: string;
    system_prompt: string;
    post_history_instructions: string;
    tags: string;
    creator: string;
    character_version: string;
    alternate_greetings: string[];
    extensions: {
      avatar?: string | undefined;
      avatars: TypeAvatar[];
      talkativeness: string;
      fav: Boolean;
      world: string;
      depth_prompt: {
        prompt: string;
        depth: number;
      };
      voice?: {
        type: string,
        sex: string,
        name: string,
      } | undefined | null,
      languages: string[],
      level: string,
      cclicense: string,
    };
    character_book?: TypeWorldBook;
  };
  create_date: string;
};

export type TypeCharaList = TypeCharaListItem[];

export type TypeCharaListItem = {
  uid: string;
  chara: TypeChara;
  cover: string,
};
export type TypeWorldBook = {
  name: string;

  entries: {[index: string]: TypeWorldBookEntriy};
  // entries: Array<TypeWorldBookEntriy> | [];
};

export type TypeWorldBookEntriy = {
  uid: string;
  keys: string[];
  secondary_keys: string[];
  comment: string;
  content: string;
  constant: Boolean | null;
  selective: Boolean;
  insertion_order: Number;
  enabled: Boolean;
  position: Number | null;
  depth: Number;
  extensions: {
    exclude_recursion: Boolean;
    display_index: string;
    probability: Number;
    useProbability: Boolean;
  };
};
export type TypeWorldBookItem = {
  uid: string;
  worldBook: TypeWorldBook;
};

export type TypeWorldBookList = TypeWorldBookItem[];