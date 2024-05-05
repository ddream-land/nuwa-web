export enum TypeVoiceType {
  None = 'None',
  Microsoft = 'Microsoft',
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