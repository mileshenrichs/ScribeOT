package com.scribeot.scribeot.ot;

/**
 * Selection represents each user's cursor position or selection range in the document text.
 * The range of a selection is represented by start and end character indexes.
 * If the two indexes are equal, the Selection represents a cursor position.
 */
public class Selection {
    private int startIndex;
    private int endIndex;

    public static final Selection DEFAULT_SELECTION = new Selection(0, 0);

    public Selection(int startIndex, int endIndex) {
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }

    public int getStartIndex() {
        return startIndex;
    }

    public void setStartIndex(int startIndex) {
        this.startIndex = startIndex;
    }

    public int getEndIndex() {
        return endIndex;
    }

    public void setEndIndex(int endIndex) {
        this.endIndex = endIndex;
    }
}
