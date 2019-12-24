package com.scribeot.scribeot.messagemodels;

public class InitDocumentStateRequestMessage {
    private String clientNickname;

    public InitDocumentStateRequestMessage() { }

    public String getClientNickname() {
        return clientNickname;
    }

    public void setClientNickname(String clientNickname) {
        this.clientNickname = clientNickname;
    }
}
