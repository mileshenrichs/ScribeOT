import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import featherIcon from '../../assets/feather-icon.png';
import loadingSpinner from '../../assets/loading-spinner.gif';
import SocketHelper, {ClientDisconnect, InitDocumentState, NewClientJoined} from '../../util/SocketHelper';
import User from '../../ot/User';
import DocumentContent from '../document-content/DocumentContent';
import UsersList from '../users-list/UsersList';
import generateUserColor from '../../util/generateUserColor';

const socketHelper: SocketHelper = new SocketHelper({disableDebug: true});

/**
 * Document is the high-level component for displaying and editing a document in ScribeOT.
 * It triggers and reacts to WebSocket messages and holds all state for a document.
 * It passes this state as props to lower-level components such as TextEditor and OtherUsers.
 */
const Document: React.FC = () => {
    /** The nickname for a user is how the user is identified to other users */
    const [nickname, setNickname] = useState('');

    /** The isLoggedIn flag denotes whether a user has selected a nickname yet */
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    /** The document is loading when the user attempts to join with a nickname and is awaiting server response */
    const [loading, setLoading] = useState(false);

    /** The document content is represented as a string */
    const [documentContents, setDocumentContents] = useState('');

    /** Revision number allows the server to consolidate operations received from clients in different states */
    const [revisionNo, setRevisionNo] = useState(0);

    /** The user id assigned by the server to this user */
    const [myUserId, setMyUserId] = useState('');

    /** The users list keeps track of the names and cursor positions of all other clients editing the document */
    const [users, setUsers] = useState<{ [userId: string]: User }>({});

    const documentId = Number((useParams() as {docId: string}).docId);
    if(socketHelper.documentId === -1) {
        socketHelper.documentId = documentId;
    }

    const joinDocument = () => {
        setLoading(true);
        socketHelper.connect().then(() => {
            // Once connected, ask server for the document state to initialize UI
            socketHelper.sendClientJoinRequest(nickname);

            // Configure callback to handle the response
            socketHelper.onDocumentInfoInitialized((initState: InitDocumentState) => {
                console.log(initState);
                setLoading(false);
                setIsLoggedIn(true);

                // initialize document state
                setDocumentContents(initState.document);
                setRevisionNo(initState.revisionNo);
                setMyUserId(initState.myUserId);
                const usersWithColors = assignColorsToUsers(initState.users);
                setUsers(usersWithColors);
            });
        });
    };

    /**
     * WebSocket callback: OnNewOtherClientJoined
     * Updates the users list when a new client joins the document.
     */
    useEffect(() => {
        if(myUserId !== '') {
            socketHelper.onNewOtherClientJoined((newClientJoined: NewClientJoined) => {
                if(myUserId && myUserId !== newClientJoined.clientId) {
                    console.log(newClientJoined);

                    // Assign a color to the new client
                    const { clientId, client } = newClientJoined;
                    client.color = generateUserColor();

                    // Add new client to users state object
                    setUsers({
                        ...users,
                        [clientId]: client
                    });
                }
            });
        }
    }, [myUserId, users]);

    /**
     * WebSocket callback: OnClientLeft
     * Updates the users list when a client leaves the document.
     */
    useEffect(() => {
        if(Object.entries(users).length) {
            socketHelper.onClientLeft((clientLeft: ClientDisconnect) => {
                // Remove client from users state object
                console.log(clientLeft);
                const { clientId } = clientLeft;
                const { [clientId]: _, ...withoutClient } = users;
                setUsers(withoutClient);
            });
        }
    }, [users]);

    const assignColorsToUsers = (users: { [userId: string]: User }) => {
        Object.keys(users).forEach(userId => {
            users[userId].color = generateUserColor();
        });

        return users;
    };

    const onNicknameInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            joinDocument();
        }
    };

    const loggedInView = (
        <div className="logged-in">
            <DocumentContent />
            <UsersList users={users} myUserId={myUserId} />
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