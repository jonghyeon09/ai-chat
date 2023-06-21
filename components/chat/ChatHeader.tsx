import AIImage from '@/assets/AI.png';
import Image from 'next/image';
import { memo } from 'react';

function ChatHeader() {
  return (
    <div className="relative flex items-center p-3 border-b border-gray-300">
      <div className="relative object-cover w-10 h-10 rounded-full overflow-hidden">
        <Image src={'/images/AI.png'} alt="aiImage" fill sizes="40px" />
      </div>
      <span className="block ml-2 font-bold text-gray-600">AI</span>
    </div>
  );
}
export default memo(ChatHeader);
