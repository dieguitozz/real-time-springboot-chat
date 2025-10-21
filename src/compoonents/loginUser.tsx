"use client"
import React from 'react';

interface LoginFormProps {
  currentText: string;
  setText: (text: string) => void;
  onLogin: (username: string) => void;
}

export function LoginForm({ currentText, setText, onLogin }: LoginFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentText.trim() !== "") {
      onLogin(currentText.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-800">
      <div className="bg-neutral-700 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Digite seu nome de usuário para entrar no Chat
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Nome de Usuário"
            autoComplete="off"
            value={currentText}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-neutral-800 text-white placeholder-gray-400"
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