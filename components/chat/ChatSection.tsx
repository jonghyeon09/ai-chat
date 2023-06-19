import ChatHeader from './ChatHeader';
import MessageForm from './MessageForm';
import MessageList from './MessageList';

export default function ChatSection() {
  return (
    <div className="w-full max-w-2xl border rounded mx-auto">
      <ChatHeader />
      <MessageList />
      <MessageForm />
    </div>
  );
}
