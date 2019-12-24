package com.scribeot.scribeot.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.scribeot.scribeot.ot.Selection;

public class User {
    private String id;
    private String nickname;
    private Selection selection;

    public User(String id, String nickname) {
        this.id = id;
        this.nickname = nickname;
        this.selection = Selection.DEFAULT_SELECTION;
    }

    @JsonIgnore
    public String getId() {
        return id;
    }

    public String getNickname() {
        return nickname;
    }

    public Selection getSelection() {
        return selection;
    }

    public void setSelection(Selection selection) {
        this.selection = selection;
    }
}
