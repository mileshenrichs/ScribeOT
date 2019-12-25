package com.scribeot.scribeot.messagemodels;

public class ClientDisconnectMessage {
    private String clientId;

    public ClientDisconnectMessage() { }

    public ClientDisconnectMessage(String clientId) {
        this.clientId = clientId;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }
}
