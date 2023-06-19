import AiMessage from './AiMessage';
import Message from './Message';

export default function MessageSection() {
  return (
    <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
      <ul className="space-y-2">
        <Message />
        <AiMessage />
      </ul>
    </div>
  );
}
