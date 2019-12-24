package com.scribeot.scribeot;

import com.scribeot.scribeot.messagemodels.InitDocumentStateRequestMessage;
import com.scribeot.scribeot.messagemodels.InitDocumentStateResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class DocumentController {

    private final SimpMessagingTemplate messagingTemplate;
    private ConnectedClientService connectedClientService;

    @Autowired
    public DocumentController(SimpMessagingTemplate simpMessagingTemplate,
                              ConnectedClientService connectedClientService) {
        this.messagingTemplate = simpMessagingTemplate;
        this.connectedClientService = connectedClientService;
    }

    /**
     * RequestDocInitState is a request a client who just joined sends to the server,
     * expecting to receive back an InitDocumentStateResponseMessage.  This message provides
     * the new client with the complete state of the document -- its content, revision
     * number, and list of other connected clients.
     *
     * As a side effect of requesting document initialization state, this message establishes
     * the user on the server and notifies other connected clients of the new user's arrival.
     * @param principal a unique ID for the new client's connection
     */
    @MessageMapping("/{documentId}/request-doc-init")
    public void onRequestDocInitState(InitDocumentStateRequestMessage message,
                                      @DestinationVariable int documentId,
                                      Principal principal) throws InterruptedException {
        Thread.sleep(1000); // simulated delay
        System.out.println(principal.getName() + " joined document " + documentId);

        // 1. Establish user server-side
        connectedClientService.addClient(documentId, principal.getName(), message.getClientNickname());

        // 2. Notify other clients of new user
        // TODO: send message to all other clients

        // 3. Send new client the document state
        InitDocumentStateResponseMessage documentStateResponse = new InitDocumentStateResponseMessage();
        documentStateResponse.setDocument("This is a document.");
        documentStateResponse.setRevisionNo(1);
        documentStateResponse.setMyUserId(principal.getName());
        documentStateResponse.setUsers(connectedClientService.getAllClients(documentId));
        messagingTemplate.convertAndSendToUser(principal.getName(), "/queue/doc-init", documentStateResponse);
    }

    public void onClientDisconnect(int documentId, String clientId) {
        System.out.println("Client " + clientId + " just disconnected from doc " + documentId);
    }
}