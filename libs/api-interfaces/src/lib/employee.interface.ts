import { DtoObject } from './dto-object.interface';
export interface Employee extends DtoObject {
  [key: string]: any;
}
