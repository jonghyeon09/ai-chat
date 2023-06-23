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

  const scrollToBottom = () => {
    ref.current?.scrollTo({
      top: ref.current?.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div
      className="flex-1 first-letter:relative w-full p-6 overflow-y-auto"
      ref={ref}
    >
      <ul className="space-y-2 mb-4">
        {messages?.map((message) =>
          message.answer ? (
            <Answer
              key={message.id}
              answer={message.answer}
              ref={liRef}
              scrollHandler={scrollToBottom}
            />
          ) : message.question ? (
            <Question key={message.id} question={message.question} />
          ) : null
        )}
      </ul>
    </div>
  );
}

export default memo(MessageList);
