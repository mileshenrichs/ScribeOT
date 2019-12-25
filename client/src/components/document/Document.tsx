import React, {useState} from 'react';
import {useParams} from 'react-router';
import featherIcon from '../../assets/feather-icon.png';
import loadingSpinner from '../../assets/loading-spinner.gif';
import SocketHelper, {InitDocumentState} from '../../util/SocketHelper';

const socketHelper: SocketHelper = new SocketHelper();

const Document: React.FC = () => {
    const [nickname, setNickname] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const documentId = Number((useParams() as {docId: string}).docId);
    if(socketHelper.documentId === -1) {
        socketHelper.documentId = documentId;
    }

    const joinDocument = () => {
        setLoading(true);
        socketHelper.connect().then(() => {
            configureWebsocketCallbacks();
            socketHelper.sendClientJoinRequest(nickname);
        });
    };

    /**
     * This component needs to be able to react to messages received over WebSocket connection with the server.
     * This method defines how Document should react to various server-side events.
     */
    const configureWebsocketCallbacks = () => {
        socketHelper.onDocumentInfoInitialized((initState: InitDocumentState) => {
            console.log(initState);
            setLoading(false);
            setIsLoggedIn(true);
        });
    };

    const onNicknameInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            joinDocument();
        }
    };

    const loggedInView = (
        <div className="logged-in">
            <span>document {documentId}</span>
        </div>
    );

    const notLoggedInView = (
        <div className="not-logged-in">
            <h1>Welcome!</h1>
            <h3>Choose a nickname:</h3>

            <div className="nickname-field">
                <input autoFocus type="text" placeholder="i.e. Tony, Gwen, Yoda"
                       value={nickname} onChange={e => setNickname(e.target.value)}
                       onKeyPress={onNicknameInputKeyPress} />
                <img className="feather" src={featherIcon} alt="" />
            </div>

            <button className="join-document" disabled={loading} onClick={joinDocument}>
                {!loading ? 'Join Document' : 'Joining...'}
            </button>

            {loading && <img className="loading-spinner" src={loadingSpinner} alt="Loading..." />}
        </div>
    );

    return (
        <div className="Document">
            {isLoggedIn && loggedInView}
            {!isLoggedIn && notLoggedInView}
        </div>
    );
};

export default Document;