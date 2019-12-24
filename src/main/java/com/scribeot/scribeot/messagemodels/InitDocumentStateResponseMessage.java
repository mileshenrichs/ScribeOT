package com.scribeot.scribeot.messagemodels;

import com.scribeot.scribeot.models.User;

import java.util.Map;

public class InitDocumentStateResponseMessage {
    private String document;
    private int revisionNo;
    private String myUserId;
    private Map<String, User> users;

    public InitDocumentStateResponseMessage() { }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public int getRevisionNo() {
        return revisionNo;
    }

    public void setRevisionNo(int revisionNo) {
        this.revisionNo = revisionNo;
    }

    public String getMyUserId() {
        return myUserId;
    }

    public void setMyUserId(String myUserId) {
        this.myUserId = myUserId;
    }

    public Map<String, User> getUsers() {
        return users;
    }

    public void setUsers(Map<String, User> users) {
        this.users = users;
    }
}
