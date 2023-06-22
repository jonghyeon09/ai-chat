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
    addQuestion();
    question(value);
    reset();
  };
  const addQuestion = () => {
    const question = {
      id: count,
      question: value,
    };
    const ai = {
      id: count + 1,
      answer: '...',
    };

    messages
      ? setMeassages([...messages, question, ai])
      : setMeassages([question, ai]);
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (!answer) return;

    const ai = {
      id: count,
      answer,
    };
    const editMessages = messages?.slice(0, messages.length - 1).concat(ai);

    if (editMessages) setMeassages(editMessages);
    setCount((prev) => prev + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current?.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className="flex flex-col relative w-full h-screen max-w-2xl border rounded mx-auto">
      <ChatHeader />
      <div
        className="flex-1 first-letter:relative w-full p-6 overflow-y-auto min-h-[40rem]"
        ref={messageListRef}
      >
        <MessageList messages={messages} />
      </div>
      <div className="relative w-full max-w-2xl bottom-0">
        <MessageForm
          value={value}
          onChange={onChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
