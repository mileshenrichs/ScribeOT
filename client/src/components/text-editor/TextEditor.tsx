import React, {useState} from 'react';
import Selection from '../../ot/Selection';

interface TextEditorProps {
    content: string;
    onContentChanged: (newContent: string) => void;
    onSelectionChanged: (newSelection: Selection) => void;
}

/**
 * TextEditor encapsulates the <textarea> that is used to display document content
 * and allow users to edit it.  TextEditor uses a lot of event listeners in order to keep track of
 * user cursor/selection position and typing/deleting in order to create operations.
 */
const TextEditor: React.FC<TextEditorProps> = ({ content, onContentChanged, onSelectionChanged }) => {
    const textareaRef = React.createRef<HTMLTextAreaElement>();
    const [selection, setSelection] = useState<Selection>({startIndex: 0, endIndex: 0});

    const updateSelection = async () => {
        // clear task queue to ensure textareaRef is up to date
        await new Promise(resolve => setTimeout(resolve));

        const { current } = textareaRef;
        if(current) {
            const { selectionStart, selectionEnd } = current;
            if(selectionStart !== selection.startIndex || selectionEnd !== selection.endIndex) {
                const newSelection = {startIndex: selectionStart, endIndex: selectionEnd};
                setSelection(newSelection);
                onSelectionChanged(newSelection);
            }
        }
    };

    return (
        <div className="TextEditor">
            <textarea
                ref={textareaRef}
                spellCheck={false}
                value={content}
                onChange={(e) => onContentChanged(e.target.value)}
                onMouseUp={() => updateSelection()}
                onKeyDown={() => updateSelection()}
            />
        </div>
    );
};

export default TextEditor;