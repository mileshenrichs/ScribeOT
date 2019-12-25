import React from 'react';

interface TextEditorProps {
    content: string;
    onContentChanged: (newContent: string) => void;
}

/**
 * TextEditor encapsulates the <textarea> that is used to display document content
 * and allow users to edit it.
 */
const TextEditor: React.FC<TextEditorProps> = ({ content, onContentChanged }) => {
    return (
        <div className="TextEditor">
            <textarea spellCheck={false} value={content} onChange={(e) => onContentChanged(e.target.value)} />
        </div>
    );
};

export default TextEditor;