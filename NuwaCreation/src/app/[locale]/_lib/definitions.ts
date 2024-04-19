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
      avatar: string | undefined;
      talkativeness: string;
      fav: Boolean;
      world: string;
      depth_prompt: {
        prompt: string;
        depth: string;
      };
      voice: {
        type: string,
        sex: string,
        name: string,
      } | undefined | null,
      languages: string[],
      level: string,
      cclicense: string,
    };
    character_book: TypeCharacterBook | undefined;
  };
  create_date: string;
};

export type TypeCharacterBook = {
  name: string;

  // entries: (Iterable<any> & any[]) | undefined;
  entries: Array<TypeCharacterBookEntriy> | [];
  // character_book: {
  //   entries: [
  //     {
  //       id: Number;
  //       key: string[];
  //       secondary_keys: string[];
  //       comment: string;
  //       content: string;
  //       constant: Boolean;
  //       selective: Boolean;
  //       insertion_order: Number;
  //       enabled: Boolean;
  //       position: string;
  //       extensions: {
  //         position: Number;
  //         exclude_recursion: Boolean;
  //         display_index: Number;
  //         probability: Number;
  //         useProbability: Boolean;
  //         depth: Number;
  //       };
  //     }
  //   ];
  //   name: string;
  // };
};

export type TypeCharacterBookEntriy = {
  id: Number;
  keys: string[];
  secondary_keys: string[];
  comment: string;
  content: string;
  constant: Boolean;
  selective: Boolean;
  insertion_order: Number;
  enabled: Boolean;
  position: string;
  extensions: {
    position: Number;
    exclude_recursion: Boolean;
    display_index: Number;
    probability: Number;
    useProbability: Boolean;
    depth: Number;
  };
};
