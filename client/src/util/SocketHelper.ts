import User from '../ot/User';

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

// class SocketHelperImpl implements SocketHelper {
//
// }

export interface InitDocumentStateRequest {
    clientNickname: string;
}

export interface InitDocumentStateResponse {
    document: string;
    revisionNo: number;
    myUserId: string;
    users: { [userId: string]: User };
}

// export default SocketHelperImpl;