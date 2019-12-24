package com.scribeot.scribeot.websocketconfig;

import java.security.Principal;

/**
 * Implementation of Spring's Principal interface to assign a unique name to each user
 * when they connect to our WebSocket.  We can use this name to send messages from the
 * server to a specific client (instead of broadcasting to all clients).
 *
 * See https://stackoverflow.com/a/47956531/734409
 */
public class StompPrincipal implements Principal {
    private String name;

    StompPrincipal(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }
}
