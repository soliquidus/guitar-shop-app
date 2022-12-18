import {LogLevel} from "../../services/log.service";

export class LogEntry {
  constructor(
    public entryDate: Date,
    public message: string,
    public level: LogLevel,
    public ExtraInfo: object[]
  ) {
  }
}
