import { Chat } from '@/types';

export default function Message({ question, answer }: Chat) {
  return (
    <>
      <li className="flex justify-end">
        <div className="relative max-w-xl px-4 py-2 text-white bg-blue-500 rounded shadow">
          <span className="block">{question}</span>
        </div>
      </li>
      <li className="flex justify-start">
        <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow bg">
          <span className="block">{answer}</span>
        </div>
      </li>
    </>
  );
}
