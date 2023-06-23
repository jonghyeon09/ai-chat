import Answer from './Answer';
import { Chat } from '@/types';
import Question from './Question';
import { memo, useEffect, useRef } from 'react';

interface Props {
  messages: Chat[] | undefined;
}

function MessageList({ messages }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const liRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({
      top: ref.current?.scrollHeight,
      behavior: 'smooth',
    });

    const timer = setTimeout(() => {
      ref.current?.scrollTo({
        top: ref.current?.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div
      className="flex-1 first-letter:relative w-full p-6 overflow-y-auto"
      ref={ref}
    >
      <ul className="space-y-2">
        {messages?.map((message) =>
          message.answer ? (
            <Answer key={message.id} answer={message.answer} ref={liRef} />
          ) : message.question ? (
            <Question key={message.id} question={message.question} />
          ) : null
        )}
      </ul>
    </div>
  );
}

export default memo(MessageList);
