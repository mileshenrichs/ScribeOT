package com.scribeot.scribeot.websocketconfig;

import com.scribeot.scribeot.ConnectedClientService;
import com.scribeot.scribeot.DocumentController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;

/**
 * Listen for client disconnect events.  When a client disconnects, remove client
 * connection from server state and notify other clients in the document.
 */
@Service
public class ClientDisconnectListener {

    private ConnectedClientService connectedClientService;
    private DocumentController documentController;

    @Autowired
    public ClientDisconnectListener(ConnectedClientService connectedClientService,
                                    DocumentController documentController) {
        this.connectedClientService = connectedClientService;
        this.documentController = documentController;
    }

    @EventListener
    public void handleDisconnectEvent(SessionDisconnectEvent event) {
        Principal principal = event.getUser();
        if(principal != null) {
            String clientId = principal.getName();

            // Remove client from server state
            int documentId = connectedClientService.getDocumentIdForConnection(clientId);
            connectedClientService.removeClient(clientId);

            // Call WebSocket endpoint to send client disconnect message to all other clients
            documentController.onClientDisconnect(documentId, clientId);
        }
    }
}