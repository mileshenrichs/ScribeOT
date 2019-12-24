interface SocketHelper {
    // information sent from client to server
    sendClientJoinRequest: (nickname: string) => any;
    sendOperation: (clientId: string, operation: {}) => any;
    sendSelectionUpdate: (clientId: string, selection: {}) => any;

    // information client receives from server
    onClientJoinedResponse: (cb: (response: ClientJoinResponse) => void) => void;
    onNewOtherClientJoined: (cb: () => void) => void;
    onDocumentInfoInitialized: (cb: () => void) => void;
    onRemoteOperation: (cb: () => void) => void;
    onOtherClientSelectionUpdate: (cb: () => void) => void;
    onServerAck: (cb: () => void) => void;
    onClientLeft: (cb: () => void) => void;
}

// class SocketHelperImpl implements SocketHelper {
//
// }

export interface ClientJoinResponse {
    accepted: boolean
}

// export default SocketHelperImpl;