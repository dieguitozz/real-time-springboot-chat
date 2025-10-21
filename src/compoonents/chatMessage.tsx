"use client";

import React from "react";
import { SendHorizontal } from "lucide-react";

interface ChatMessage {
    sender: string;
    content?: string;
    type: "CHAT" | "JOIN" | "LEAVE";
    timestamp?: number;
}

interface ChatInterfaceProps {
    username: string;
    messages: ChatMessage[];
    text: string;
    setText: (text: string) => void;
    handleSend: (e: React.FormEvent) => void;
}

export function ChatInterface({
    username,
    messages,
    text,
    setText,
    handleSend,
}: ChatInterfaceProps) {
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="h-screen flex flex-col items-center justify-center p-4 bg-zinc-800 text-white">
            <h1 className="text-3xl font-bold mb-4">
                Você está logado como {username}
            </h1>
            <div className="w-full max-w-xl bg-neutral-900 p-6 rounded-lg shadow-xl mb-4 overflow-y-auto flex flex-col space-y-2 flex-grow">

                {messages.map((msg, i) => {
                    const isOwnMessage = msg.sender === username;
                    if (msg.type !== "CHAT") {
                        return (
                            <div key={i} className={`w-full text-center py-1`}>
                                <em className="text-sm text-gray-400">
                                    🔔 {msg.sender}{" "}
                                    {msg.type === "JOIN" ? "Entrou na conversa" : "Saiu da conversa"}
                                </em>
                            </div>
                        );
                    }
                    return (
                        <div
                            key={i}
                            className={`flex flex-col max-w-[80%] ${isOwnMessage ? 'self-end items-end' : 'self-start items-start'} `}
                        >
                            {(msg.sender || msg.timestamp) && (
                                <div
                                    className={`text-xs mb-1 flex items-center gap-2 ${isOwnMessage ? 'pr-1 justify-end text-white/50' : 'pl-1 justify-start text-gray-300'} w-full`}
                                >
                                    <strong className="font-bold text-white order-2">
                                        {isOwnMessage ? 'Você' : msg.sender}
                                    </strong>
                                    {msg.timestamp && (
                                        <span className="text-xs order-2">
                                            {new Date(msg.timestamp).toLocaleTimeString('pt-BR', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    )}
                                </div>
                            )}

                            <div
                                className={`p-3 rounded-xl break-words ${isOwnMessage ? "bg-white text-black" : "bg-zinc-800 text-white"
                                    }`}
                            >
                                <span>{msg.content}</span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="w-full max-w-xl flex gap-3">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Digite uma mensagem..."
                    className="flex-1 px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-neutral-800 text-white"
                />
                <button
                    type="submit"
                    className="bg-white hover:bg-gray-300 text-black font-semibold cursor-pointer py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <span className="hidden sm:inline">Enviar</span>
                    <SendHorizontal size={18} />
                </button>
            </form>
        </div>
    );
}