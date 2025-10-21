"use client";

import { useState } from "react";
import useWebSocket from "../hooks/useWebSocket";

interface ChatProps {
    username: string;
}

interface ChatMessage {
    sender: string;
    content?: string;
    type: "CHAT" | "JOIN" | "LEAVE";
}

export default function Chat({ username }: ChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [text, setText] = useState("");
    const { sendMessage } = useWebSocket(
        (msg: ChatMessage) => setMessages((prev) => [...prev, msg]),
        username
    );

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() === "") return;
        sendMessage(text.trim());
        setText("");
    };

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