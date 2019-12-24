package com.scribeot.scribeot.messagemodels;

public class EntryResponseMessage {
    private boolean accepted;

    public EntryResponseMessage() { }

    public EntryResponseMessage(boolean accepted) {
        this.accepted = accepted;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }
}
