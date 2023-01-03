import {LogLevel} from "../../services/log.service";

export class LogEntry {
  public entryDate: Date;
  public message: string;
  public level: LogLevel;
  public ExtraInfo: object[];

  constructor(entryDate: Date, message: string, level: LogLevel, ExtraInfo: object[]) {
    this.entryDate = entryDate;
    this.message = message;
    this.level = level;
    this.ExtraInfo = ExtraInfo;
  }
}
