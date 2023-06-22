import Answer from './Answer';
import { Chat } from '@/types';
import Question from './Question';
import { Ref, memo } from 'react';

interface Props {
  messages: Chat[] | undefined;
}

function MessageList({ messages }: Props) {
  return (
    <ul className="space-y-2">
      {messages?.map((message) =>
        message.answer ? (
          <Answer key={message.id} answer={message.answer} />
        ) : message.question ? (
          <Question key={message.id} question={message.question} />
        ) : null
      )}
    </ul>
  );
}

export default memo(MessageList);
