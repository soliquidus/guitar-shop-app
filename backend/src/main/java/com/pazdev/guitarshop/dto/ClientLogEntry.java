package com.pazdev.guitarshop.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Getter
@Setter
public class ClientLogEntry {
    private Date entryDate;
    private String logLevel;
    private String message;
    public String[] extraInfo;
    private Integer level;


    public String getLogLevel() {
        return ClientLogLevel.getLogLevel(level);
    }
}
