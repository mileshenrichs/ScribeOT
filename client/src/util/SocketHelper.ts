import User from '../ot/User';
import {Client, Frame, Message} from 'stompjs';

/**
 * SocketHelper facilitates WebSocket communication (sending and receiving messages)
 * for the Document component.  SocketHelper knows the URL paths through which messages travel between
 * client and server and provides callback methods to allow Document to respond to WebSocket
 * messages without knowing the details of how the messages are subscribed to or processed.
 */
interface SocketHelper {
    // make initial connection to WebSocket
    connect: () => Promise<void>;

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
    REQUEST_DOC_INIT: (docId:number) => '/doc/' + docId + '/request-doc-init',
    DOC_INIT_INFO: '/user/queue/doc-init',
    NEW_CLIENT_JOINED: (docID: number) => '/topic/' + docID + '/new-client-joined',
    CLIENT_LEFT: (docId: number) => '/topic/' + docId + '/client-disconnect'
};

// Get global handles for SockJS and Stomp libraries included in index.html
const SockJS = (window as any).SockJS;
const Stomp = (window as any).Stomp;

interface SocketHelperConfig {
    disableDebug?: boolean;
}

class SocketHelperImpl implements SocketHelper {
    documentId: number;
    stompClient?: Client;
    debug: boolean = true;

    constructor(config?: SocketHelperConfig) {
        this.documentId = -1;
        if(config) {
            this.debug = !config.disableDebug;
        }
    }

    connect = () => {
        this.stompClient = Stomp.over(new SockJS('http://localhost:8080/scribeot-websocket'));

        if(!this.debug) this.stompClient!.debug = () => {};

        return new Promise<void>((resolve, reject) => {
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
        this.stompClient!.send(Destination.REQUEST_DOC_INIT(this.documentId), {}, JSON.stringify(initDocStateRequest));
    };

    sendOperation = (clientId: string, operation: {}) => {};
    sendSelectionUpdate = (clientId: string, selection: {}) => {};

    onClientLeft = (cb: (clientDisconnect: ClientDisconnect) => void) => {
        this.stompClient!.subscribe(Destination.CLIENT_LEFT(this.documentId), (message: Message) => {
            const disconnectedClient: ClientDisconnect = JSON.parse(message.body);
            cb(disconnectedClient);
        }, {id: 'sub-client-disconnect'});
    };

    onDocumentInfoInitialized = (cb: (initState: InitDocumentState) => void) => {
        this.stompClient!.subscribe(Destination.DOC_INIT_INFO, (message: Message) => {
            const docInitState: InitDocumentState = JSON.parse(message.body);
            cb(docInitState);
        }, {id: 'sub-doc-init'});
    };

    onNewOtherClientJoined = (cb: (newClientJoined: NewClientJoined) => void) => {
        this.stompClient!.subscribe(Destination.NEW_CLIENT_JOINED(this.documentId), (message: Message) => {
            const newClientJoinedMessage: NewClientJoined = JSON.parse(message.body);
            cb(newClientJoinedMessage);
        }, {id: 'sub-new-client-joined'});
    };

    onOtherClientSelectionUpdate = (cb: () => void) => {};
    onRemoteOperation = (cb: () => void) => {};
    onServerAck = (cb: () => void) => {};
}

// ----------------------------------------------------------------------------
// ------------------------- WebSocket message models -------------------------
// ----------------------------------------------------------------------------
export interface InitDocumentStateRequest {
    clientNickname: string;
}

export interface InitDocumentState {
    document: string;
    revisionNo: number;
    myUserId: string;
    users: { [userId: string]: User };
}

export interface NewClientJoined {
    clientId: string;
    client: User;
}

export interface ClientDisconnect {
    clientId: string;
}

export default SocketHelperImpl;