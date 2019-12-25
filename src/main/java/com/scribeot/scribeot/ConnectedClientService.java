package com.scribeot.scribeot;

import com.scribeot.scribeot.models.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * This service maintains a global map that keeps track of which users
 * are currently connected to which document.  The key for documentClientsMap is a documentId
 * and the value is a mapping from user id to user for each client in the given document.
 */
@Service
public class ConnectedClientService {
    // Maps document id to a set of users connected to that document
    private Map<Integer, Map<String, User>> documentClientsMap = new HashMap<>();

    // Maps user ids to the document they're connected to
    private Map<String, Integer> clientDocumentMap = new HashMap<>();

    public Map<String, User> getAllClients(int documentId) {
        return documentClientsMap.get(documentId);
    }

    public User getClient(int documentId, String clientId) {
        return documentClientsMap.get(documentId).get(clientId);
    }

    public void addClient(int documentId, User newClient) {
        // init document if it doesn't already exist
        if(!documentClientsMap.containsKey(documentId)) {
            documentClientsMap.put(documentId, new HashMap<>());
        }

        // save client to document map
        documentClientsMap.get(documentId).put(newClient.getId(), newClient);

        // save document to client map (reverse index)
        clientDocumentMap.put(newClient.getId(), documentId);
    }

    public int getDocumentIdForConnection(String clientId) {
        return clientDocumentMap.get(clientId);
    }

    public void removeClient(String clientId) {
        int documentId = clientDocumentMap.get(clientId);
        documentClientsMap.get(documentId).remove(clientId);
        clientDocumentMap.remove(clientId);
    }
}
