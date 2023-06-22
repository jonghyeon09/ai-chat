import { useEffect, useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import useAi from '@/hooks/useAi';
import { Chat } from '@/types';
import { useInput } from '@/hooks/useInput';

export default function ChatSection() {
  const [count, setCount] = useState(0);
  const [messages, setMeassages] = useState<Chat[]>();
  const { value, onChange, reset } = useInput('');
  const { answer, question } = useAi();
  const messageListRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chat = {
      id: count,
      question: value,
    };

    setMeassages([chat]);
    if (messages) setMeassages([...messages, chat]);
    question(value);
    reset();
    setCount(count + 1);
  };

  useEffect(() => {
    if (!answer) return;
    const chat = {
      id: count,
      answer,
    };

    setMeassages([chat]);
    if (messages) setMeassages([...messages, chat]);
    setCount(count + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current?.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className="w-full max-w-2xl border rounded mx-auto">
      <ChatHeader />
      <div
        className="relative w-full p-6 overflow-y-auto h-[40rem]"
        ref={messageListRef}
      >
        <MessageList messages={messages} />
      </div>
      <MessageForm value={value} onChange={onChange} onSubmit={handleSubmit} />
    </div>
  );
}
