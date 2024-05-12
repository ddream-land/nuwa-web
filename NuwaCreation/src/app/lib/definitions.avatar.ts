export enum TypeAvatarType {
  LIVE2D = 'LIVE2D',
  VRM = "VRM",
  IMAGE = 'IMAGE',
}

export type TypeAvatar = {
  url: string;
  name?: string;
  type: TypeAvatarType,
}
