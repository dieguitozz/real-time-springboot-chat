"use client";

import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { LoginForm } from "../compoonents/loginUser"; 
import { ChatInterface } from "../compoonents/chatMessage"; 

interface ChatMessage {
    sender: string;
    content?: string;
    type: "CHAT" | "JOIN" | "LEAVE";
    timestamp?: number;
}

export default function Home() {
    const [username, setUsername] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [text, setText] = useState("");
    const client = useRef<Client | null>(null);

    useEffect(() => {
        if (!username) return;

        client.current = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            onConnect: () => {
                console.log("Conectado ao WebSocket");
                client.current?.subscribe("/topic/public", (message: IMessage) => {
                    if (message.body) {
                        const incomingMsg: ChatMessage = JSON.parse(message.body);
                        const messageWithTimestamp: ChatMessage = {
                            ...incomingMsg,
                            timestamp: Date.now(), 
                        };

                        setMessages((prev) => [...prev, messageWithTimestamp]);
                    }
                });
                client.current?.publish({
                    destination: "/app/chat.addUser",
                    body: JSON.stringify({ sender: username, type: "JOIN" }),
                });
            },
            onStompError: (frame) => {
                console.error("Erro no STOMP:", frame);
            },
        });

        client.current.activate();

        return () => {
            client.current?.deactivate();
        };
    }, [username]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || !client.current?.connected) return;

        client.current.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify({ sender: username, content: text, type: "CHAT" }),
        });

        setText("");
    };
    if (!username) {
        return (
            <LoginForm 
                currentText={text}
                setText={setText}
                onLogin={(name) => {
                    setUsername(name);
                    setText('');
                }}
            />
        );
    }

    return (
        <ChatInterface
            username={username}
            messages={messages}
            text={text}
            setText={setText}
            handleSend={handleSend}
        />
    );
}
