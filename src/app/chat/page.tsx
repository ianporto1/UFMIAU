"use client";

import { useChat } from "@ai-sdk/react";
import type { Message } from "@ai-sdk/react";
import { useEffect, useRef } from "react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[100dvh] w-full max-h-[100dvh] pb-16">
      <header className="px-4 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex-shrink-0 z-10 sticky top-0">
        <h1 className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          UFMIAU.ai 🤖
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Tire dúvidas sobre a faculdade com a I.A
        </p>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20 text-center opacity-60">
            <span className="text-5xl mb-4">🐾</span>
            <p className="text-sm font-medium">Miau! Sou o assistente da UFCAT.</p>
            <p className="text-xs mt-1">Me pergunte sobre editais ou o cardápio do R.U.</p>
          </div>
        ) : (
          messages.map((m: Message) => (
            <div
              key={m.id}
              className={`flex flex-col max-w-[85%] ${
                m.role === "user" ? "ml-auto" : "mr-auto"
              }`}
            >
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm ${
                  m.role === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-sm border border-zinc-200 dark:border-zinc-700"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex max-w-[85%] mr-auto">
            <div className="px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 rounded-bl-sm border border-zinc-200 dark:border-zinc-700 text-sm">
              <span className="animate-pulse">Digitando...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex-shrink-0">
        <form
          onSubmit={handleSubmit}
          className="flex relative items-center justify-between"
        >
          <input
            className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-zinc-800 dark:text-zinc-100"
            value={input}
            placeholder="Mande uma mensagem..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input || isLoading}
            className="absolute right-2 p-2 bg-blue-600 text-white rounded-full focus:outline-none active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-transform h-8 w-8 flex items-center justify-center"
          >
            ↑
          </button>
        </form>
      </div>
    </div>
  );
}
