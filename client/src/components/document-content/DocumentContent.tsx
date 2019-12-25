import React, {useState} from 'react';
import TextEditor from "../text-editor/TextEditor";

/**
 * DocumentContent displays the title and last edit information for a document.
 * It contains the TextEditor component, which displays the document content and allows users to edit it.
 */
const DocumentContent: React.FC = () => {
    const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquam varius leo, vel feugiat mauris efficitur vel. Etiam et velit quis ante lacinia pretium vel a neque. Cras a congue libero. Nam faucibus lacus et eros volutpat consequat. Nulla elementum, lectus eget interdum posuere, nulla mauris pellentesque mi, eget vehicula enim nisl id turpis. Nullam ut arcu porta risus auctor consectetur. Nam volutpat condimentum nisl id cursus. Pellentesque eu congue mi. Etiam consectetur ipsum sapien, id faucibus lacus luctus nec. Quisque feugiat lorem ut nibh interdum, sit amet mollis odio sagittis. Ut felis lacus, laoreet ac ante in, tristique placerat arcu. Cras varius tortor vitae convallis fringilla. Fusce lacinia luctus risus at interdum. Mauris finibus tempor nulla vel ullamcorper. Maecenas ullamcorper ligula nec ante egestas, a varius enim gravida.';
    const [contentState, setContent] = useState(content);

    return (
        <div className="DocumentContent">
            <div className="heading">
                <h1>Document Title</h1>
                <span className="last-edited">Last edit 1 second ago by Steve</span>
            </div>

            <TextEditor content={contentState} onContentChanged={(newContent) => {
                setContent(newContent);
            }} />
        </div>
    );
};

export default DocumentContent;