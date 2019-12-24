package com.scribeot.scribeot.websocketconfig;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;
import java.util.UUID;

/**
 * This class overrides the default handshake handler for connections to our WebSocket.
 * During the handshake, we need to generate a name (id) for the user so it can be
 * referenced later to send messages to them and nobody else.
 *
 * See https://stackoverflow.com/a/47956531/734409
 */
public class ClientIDCreationHandler extends DefaultHandshakeHandler {

    /**
     * Generate principal with a UUID.
     * The document ID for which this connection was made is appended to the end of the UUID.
     */
    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        return new StompPrincipal(UUID.randomUUID().toString());
    }

}
