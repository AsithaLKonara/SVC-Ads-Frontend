"use client";

import React, { useState, useEffect } from "react";

import { format } from "date-fns";
import { Mail, MailOpen, Trash2, ChevronRight, Loader2, Search } from "lucide-react";
import MessageSidepanel from "@/components/admin/MessageSidepanel";
import { io } from "socket.io-client";
import { fetchWithAuth } from "@/services/api";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export default function MessagesDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const res = await fetchWithAuth("/messages");
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      setMessages(data.data || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    
    // WebSocket for new messages
    const socketUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    const socket = io(socketUrl);
    
    socket.on("newMessage", (msg: Message) => {
      setMessages((prev) => [msg, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMessageClick = async (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      try {
        await fetchWithAuth(`/messages/${message.id}/read`, {
          method: "PATCH",
        });
        setMessages(prev => prev.map(m => m.id === message.id ? { ...m, isRead: true } : m));
        // Notify layout to decrement unread badge
        window.dispatchEvent(new CustomEvent("messageRead"));
      } catch (error) {
        console.error("Failed to mark message as read:", error);
      }
    }
  };

  const closeSidepanel = () => {
    setSelectedMessage(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
          <p className="text-sm text-slate-500">Manage contact form submissions</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Sender</th>
                <th className="px-6 py-4 font-medium">Subject</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No messages found.
                  </td>
                </tr>
              ) : (
                messages.map((message) => (
                  <tr 
                    key={message.id} 
                    onClick={() => handleMessageClick(message)}
                    className={`cursor-pointer transition-colors hover:bg-slate-50 ${message.isRead ? '' : 'bg-brand-50/50 font-semibold'}`}
                  >
                    <td className="px-6 py-4">
                      {message.isRead ? (
                        <MailOpen className="h-5 w-5 text-slate-400" />
                      ) : (
                        <Mail className="h-5 w-5 text-brand-500" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-900">{message.name}</span>
                        <span className="text-xs text-slate-500 font-normal">{message.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {message.subject || <span className="text-slate-400 italic">No subject</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(message.createdAt), "MMM d, yyyy h:mm a")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-brand-600">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <MessageSidepanel 
        message={selectedMessage} 
        isOpen={!!selectedMessage} 
        onClose={closeSidepanel} 
      />
    </div>
  );
}
