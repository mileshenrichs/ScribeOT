package com.scribeot.scribeot.messagemodels;

import com.scribeot.scribeot.models.User;

public class NewClientJoinedMessage {
    private String clientId;
    private User client;

    public NewClientJoinedMessage() { }

    public NewClientJoinedMessage(String clientId, User client) {
        this.clientId = clientId;
        this.client = client;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }
}
