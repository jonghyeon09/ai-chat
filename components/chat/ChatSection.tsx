import { useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import useAi from '@/hooks/useAi';
import { Chat } from '@/types';
import { useInput } from '@/hooks/useInput';

export default function ChatSection() {
  const [messages, setMeassages] = useState<Chat[]>();
  const [disabled, setDisabled] = useState(false);
  const { value, onChange, reset } = useInput('');
  const { answer, question } = useAi();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addQuestion();
    question(value);
    reset();
    setDisabled(true);
  };
  const addQuestion = () => {
    const question = {
      id: Date.now(),
      question: value,
    };
    const ai = {
      id: Date.now(),
      answer: '',
    };

    messages
      ? setMeassages([...messages, question, ai])
      : setMeassages([question, ai]);
  };

  useEffect(() => {
    setDisabled(false);
    if (!answer) return;

    const ai = {
      id: Date.now(),
      answer,
    };
    const editMessages = messages?.slice(0, messages.length - 1).concat(ai);

    if (editMessages) setMeassages(editMessages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  return (
    <div className="flex flex-col relative w-full h-screen md:h-[40rem] max-w-2xl border rounded mx-auto">
      <ChatHeader />
      <MessageList messages={messages} />
      <div className="relative w-full max-w-2xl bottom-0">
        <MessageForm
          value={value}
          disabled={disabled}
          onChange={onChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
