import User from '../ot/User';
import {Client, Frame, Message} from 'stompjs';

interface SocketHelper {
    // information sent from client to server
    sendClientJoinRequest: (nickname: string) => any;
    sendOperation: (clientId: string, operation: {}) => any;
    sendSelectionUpdate: (clientId: string, selection: {}) => any;

    // information client receives from server
    onDocumentInfoInitialized: (cb: () => void) => void;
    onNewOtherClientJoined: (cb: () => void) => void;
    onRemoteOperation: (cb: () => void) => void;
    onOtherClientSelectionUpdate: (cb: () => void) => void;
    onServerAck: (cb: () => void) => void;
    onClientLeft: (cb: () => void) => void;
}

/**
 * The WebSocket client subscribes to various destination paths through which it is notified
 * of server-side events.  The Destination object below stores these path string constants.
 */
const Destination = {
    DOC_INIT_INFO: '/user/queue/doc-init'
};

// Get global handles for SockJS and Stomp libraries included in index.html
const SockJS = (window as any).SockJS;
const Stomp = (window as any).Stomp;

class SocketHelperImpl implements SocketHelper {
    documentId: number;
    stompClient?: Client;

    constructor() {
        this.documentId = -1;
    }

    connect = () => {
        console.log('SocketHelper.connect()');
        this.stompClient = Stomp.over(new SockJS('http://localhost:8080/scribeot-websocket'));
        return new Promise((resolve, reject) => {
            this.stompClient!.connect({}, () => {
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

    sendClientJoinRequest = (nickname: string) => {
        const initDocStateRequest: InitDocumentStateRequest = {clientNickname: nickname};
        this.stompClient!.send('/doc/' + this.documentId + '/request-doc-init', {}, JSON.stringify(initDocStateRequest));
    };

    sendOperation = (clientId: string, operation: {}) => {};
    sendSelectionUpdate = (clientId: string, selection: {}) => {};

    onClientLeft = (cb: () => void) => {};

    onDocumentInfoInitialized = (cb: (initState: InitDocumentState) => void) => {
        this.stompClient!.subscribe(Destination.DOC_INIT_INFO, (message: Message) => {
            const docInitState: InitDocumentState = JSON.parse(message.body);
            cb(docInitState);
        });
    };

    onNewOtherClientJoined = (cb: () => void) => {};
    onOtherClientSelectionUpdate = (cb: () => void) => {};
    onRemoteOperation = (cb: () => void) => {};
    onServerAck = (cb: () => void) => {};
}

export interface InitDocumentStateRequest {
    clientNickname: string;
}

export interface InitDocumentState {
    document: string;
    revisionNo: number;
    myUserId: string;
    users: { [userId: string]: User };
}

export default SocketHelperImpl;