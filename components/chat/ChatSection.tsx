import { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import useAi from '@/hooks/useAi';
import { Chat } from '@/types';

export default function ChatSection() {
  const [text, setText] = useState<string>('');
  const [count, setCount] = useState(0);
  const [messages, setMeassages] = useState<Chat[]>();
  const { answer, question } = useAi();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chat = {
      id: count,
      question: text,
    };
    setCount(count + 1);
    setMeassages([chat]);
    if (messages) setMeassages([...messages, chat]);
    question(text);
    setText('');
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

  return (
    <div className="w-full max-w-2xl border rounded mx-auto">
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageForm text={text} setText={setText} onSubmit={handleSubmit} />
    </div>
  );
}
