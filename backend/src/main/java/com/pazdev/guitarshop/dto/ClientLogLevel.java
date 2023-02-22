package com.pazdev.guitarshop.dto;

public enum ClientLogLevel {
    ALL(0, "All"),
    DEBUG(1, "Debug"),
    INFO(2, "Info"),
    WARN(3, "Warn"),
    ERROR(4, "Error"),
    FATAL(5, "Fatal"),
    OFF(6, "Off");

    private String logLevel;
    private int logNumber;

    ClientLogLevel(int logNumber, String logLevel){
        this.logLevel = logLevel;
        this.logNumber = logNumber;
    }

    public String getLogLevel() {
        return logLevel;
    }

    public void setLogLevel(String logLevel) {
        this.logLevel = logLevel;
    }

    public int getLogNumber() {
        return logNumber;
    }

    public void setLogNumber(int logNumber) {
        this.logNumber = logNumber;
    }

    public static String getLogLevel(int logNumber){
        for(ClientLogLevel level : ClientLogLevel.values()) {
            if(level.getLogNumber() == logNumber){
                return level.getLogLevel();
            }
        }
        return "Unknown";
    }
}