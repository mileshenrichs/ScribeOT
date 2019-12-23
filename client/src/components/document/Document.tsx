import React, {useState} from 'react';
import { useParams } from "react-router";

const Document: React.FC = () => {
    let { docId } = useParams();
    const [nickname, setNickname] = useState('');

    return (
        <span>document {docId}</span>
    );
};

export default Document;