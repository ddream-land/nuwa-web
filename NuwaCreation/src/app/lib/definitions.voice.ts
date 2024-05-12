export enum TypeVoiceType {
  None = 'None',
  Nuwa = 'Nuwa',
}
export enum voiceSex {
  Male = 'male',
  Female = 'female',
}


export type TypeVoiceName = {
  audio: string;
  name: string;
  value: string,
}

export type TypeVoiceNameList = {
  [key in voiceSex]: TypeVoiceName[]
}