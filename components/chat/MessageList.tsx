import Answer from './Answer';
import { Chat } from '@/types';
import Question from './Question';
import { memo } from 'react';

interface Props {
  messages: Chat[] | undefined;
}

function MessageList({ messages }: Props) {
  return (
    <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
      <ul className="space-y-2">
        {messages?.map(
          (message) =>
            (message.answer && (
              <Answer key={message.id} answer={message.answer} />
            )) ||
            (message.question && (
              <Question key={message.id} question={message.question} />
            ))
        )}
        {/* {messageList?.map((message, i) => (
          <Message
            key={i}
            question={message.question}
            answer={message.answer}
          />
        ))} */}
      </ul>
    </div>
  );
}

export default memo(MessageList);
