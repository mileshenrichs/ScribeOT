import React, {useState} from 'react';
import { useParams } from 'react-router';
import featherIcon from '../../assets/feather-icon.png';
import loadingSpinner from '../../assets/loading-spinner.gif';
import {Client, Frame, Message} from 'stompjs';
import {ClientJoinResponse} from '../../util/SocketHelper';

const Document: React.FC = () => {
    // Get global handles for SockJS and Stomp libraries included in index.html
    const SockJS = (window as any).SockJS;
    const Stomp = (window as any).Stomp;
    let stompClient: Client;

    let { docId } = useParams();

    const [nickname, setNickname] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const joinDocument = () => {
        console.log(nickname);
        setLoading(true);
        connect().then(() => {
            sendName();
        });
    };

    const connect = () => {
        return new Promise((resolve, reject) => {
            const socket = new SockJS('http://localhost:8080/scribeot-websocket');
            stompClient = Stomp.over(socket);

            stompClient.connect({}, (frame?: Frame) => {
                console.log('Connected: ' + frame);
                stompClient.subscribe('/scribeot/greetings', (message: Message) => {
                    const entryResponse: ClientJoinResponse = JSON.parse(message.body);
                    if(entryResponse.accepted) {
                        setIsLoggedIn(true);
                    }
                });
                resolve();
            }, (error: Frame | string) => {
                console.log('connection error!');
                console.log(error);
                if(error instanceof Frame && error.headers) {
                    console.log('Error message: ' + (error.headers as any).message);
                }
                reject();
            });
        });
    };

    const sendName = () => {
        stompClient.send('/doc/enter-with-nickname', {}, JSON.stringify({nickname}));
    };

    const onNicknameInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            joinDocument();
        }
    };

    const loggedInView = (
        <div className="logged-in">
            <span>document {docId}</span>
        </div>
    );

    const notLoggedInView = (
        <div className="not-logged-in">
            <h1>Welcome!</h1>
            <h3>Choose a nickname:</h3>

            <div className="nickname-field">
                <input type="text" placeholder="i.e. Tony, Gwen, Yoda"
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