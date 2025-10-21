"use client";

import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";

interface ChatMessage {
    sender: string;
    content?: string;
    type: "CHAT" | "JOIN" | "LEAVE";
}

export default function Home() {
    const [username, setUsername] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [text, setText] = useState("");
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
                        setMessages((prev) => [...prev, JSON.parse(message.body)]);
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
            <div className="min-h-screen flex items-center justify-center zinc-800">

                <div className="bg-neutral-700 p-8 h-128 rounded-lg shadow-md w-full max-w-md items-center justify-center">
                    <h1 className="text-2xl font-bold mb-6 text-center">
                        Digite seu nome de usuário para entrar no Chat
                    </h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (text.trim() !== "") setUsername(text.trim());
                        }}
                        className="space-y-6"
                    >
                        <input
                            type="text"
                            placeholder="Nome de Usuário"
                            autoComplete="off"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded transition-colors"
                        >
                            Começar a conversar
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white p-6 rounded shadow-md mb-4 h-96 overflow-y-auto">
                {messages.map((msg, i) => (
                    <div key={i} className="mb-2">
                        {msg.type === "CHAT" ? (
                            <span>
                <strong>{msg.sender}:</strong> {msg.content}
              </span>
                        ) : (
                            <em>
                                {msg.sender} {msg.type === "JOIN" ? "joined" : "left"} the chat
                            </em>
                        )}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend} className="w-full max-w-xl flex gap-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
