package com.scribeot.scribeot;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private static final AuthStatus LOGGED_IN = new AuthStatus(true);
    private static final AuthStatus NOT_LOGGED_IN = new AuthStatus(false);

    static class AuthStatus {
        boolean isLoggedIn;
        AuthStatus(boolean isLoggedIn) {
            this.isLoggedIn = isLoggedIn;
        }

        @JsonProperty("isLoggedIn")
        public boolean isLoggedIn() {
            return isLoggedIn;
        }

        public void setLoggedIn(boolean loggedIn) {
            isLoggedIn = loggedIn;
        }
    }

    @GetMapping("/check-login")
    public AuthStatus checkLogin() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return NOT_LOGGED_IN;
    }

}
