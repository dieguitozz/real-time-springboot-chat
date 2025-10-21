import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";

interface ChatMessage {
    sender: string;
    content?: string;
    type: "CHAT" | "JOIN" | "LEAVE";
}

export default function useWebSocket(
    onMessage: (msg: ChatMessage) => void,
    username: string
) {
    const client = useRef<Client | null>(null);

    useEffect(() => {
        if (!username) return;

        client.current = new Client({
            brokerURL: undefined,
            connectHeaders: {},
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            debug: (str) => console.log(str),
            onConnect: () => {
                console.log("Conectado ao WebSocket");

                client.current?.subscribe("/topic/public", (message: IMessage) => {
                    if (message.body) {
                        onMessage(JSON.parse(message.body));
                    }
                });

                client.current?.publish({
                    destination: "/app/chat.sendMessage",
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
    }, [username, onMessage]);

    const sendMessage = (text: string) => {
        if (client.current?.connected) {
            client.current.publish({
                destination: "/app/chat.sendMessage",
                body: JSON.stringify({ sender: username, content: text, type: "CHAT" }),
            });
        }
    };

    return { sendMessage };
}
