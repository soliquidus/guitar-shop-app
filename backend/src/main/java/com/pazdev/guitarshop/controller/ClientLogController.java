package com.pazdev.guitarshop.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.pazdev.guitarshop.entity.ClientLogEntry;
import com.pazdev.guitarshop.utils.FileHandling;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.Reader;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/api/log")
public class ClientLogController {
    @Value("${log.file.name}")
    private String fileName;
    private final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private final FileHandling fileHandling = new FileHandling();

    @PostMapping
    public void getLogFromLocalStorage(@RequestBody ClientLogEntry[] logEntries){
        Type listType = new TypeToken<List<ClientLogEntry>>() {
        }.getType();

        for (ClientLogEntry log : logEntries) {
            log.setLogLevel(log.getLogLevel());
        }
        String logJson = gson.toJson(logEntries);
        List<ClientLogEntry> existingLogList = gson.fromJson(logJson, listType);

        fileHandling.initBufferedWriter(fileName, existingLogList);

    }

    public void getLog(@RequestBody ClientLogEntry[] logEntry) {
        Path path = Paths.get(fileName);
        Type listType = new TypeToken<List<ClientLogEntry>>() {
        }.getType();

        boolean exists = Files.exists(path);

        for (ClientLogEntry log : logEntry) {
            log.setLogLevel(log.getLogLevel());
        }
        String logJson = gson.toJson(logEntry);
        try {
            List<ClientLogEntry> comingLogList = gson.fromJson(logJson, listType);
            if (exists) {
                Reader existingFile = Files.newBufferedReader(Paths.get(fileName));

                List<ClientLogEntry> existingLogList = gson.fromJson(existingFile, listType);

                if (existingLogList != null) {
                    existingLogList.addAll(comingLogList);
                    fileHandling.initBufferedWriter(fileName, existingLogList);
                } else {
                    fileHandling.initBufferedWriter(fileName, comingLogList);
                }
            } else {
                fileHandling.initBufferedWriter(fileName, comingLogList);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
