export enum TypeAvatarType {
  LIVE2D = 'LIVE2D',
  "3D" = '3D',
  IMAGE = 'IMAGE',
}

export type TypeAvatar = {
  url: string;
  type: TypeAvatarType,
}
