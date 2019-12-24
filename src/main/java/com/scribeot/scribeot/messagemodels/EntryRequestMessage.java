package com.scribeot.scribeot.messagemodels;

public class EntryRequestMessage {
    private String nickname;

    public EntryRequestMessage() { }

    public EntryRequestMessage(String nickname) {
        this.nickname = nickname;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}