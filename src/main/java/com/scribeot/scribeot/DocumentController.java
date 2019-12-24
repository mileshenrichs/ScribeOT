package com.scribeot.scribeot;

import com.scribeot.scribeot.messagemodels.EntryRequestMessage;
import com.scribeot.scribeot.messagemodels.EntryResponseMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class DocumentController {
    @MessageMapping("/enter-with-nickname")
    @SendTo("/scribeot/greetings")
    public EntryResponseMessage onEntryWithNickname(EntryRequestMessage message, SimpMessageHeaderAccessor header) throws Exception {
        System.out.println("I got your message, " + message.getNickname() + "!");
        Thread.sleep(1000); // simulated delay
        return new EntryResponseMessage(true);
    }
}