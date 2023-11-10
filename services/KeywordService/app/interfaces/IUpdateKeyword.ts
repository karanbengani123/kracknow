import { IAddKeyword } from './IAddKeyword'

export interface IUpdateKeyword extends IAddKeyword{
  newAttribute: string;
}
