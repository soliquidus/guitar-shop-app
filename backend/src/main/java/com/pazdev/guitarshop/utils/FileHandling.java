package com.pazdev.guitarshop.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.pazdev.guitarshop.entity.ClientLogEntry;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class FileHandling {

    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public void initBufferedWriter(String fileName, List<ClientLogEntry> logEntries) {
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(fileName));
            writer.write(gson.toJson(logEntries));
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
