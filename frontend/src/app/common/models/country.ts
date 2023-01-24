import {MainModel} from "./mainModel";

export class Country extends MainModel{
  code: string;
  name: string;


  constructor(id: number, code: string, name: string) {
    super(id);
    this.code = code;
    this.name = name;
  }
}
