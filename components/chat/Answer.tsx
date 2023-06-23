import { forwardRef, useEffect, useState } from 'react';

interface Props {
  answer: string;
}

function Answer({ answer }: Props, ref: React.ForwardedRef<HTMLLIElement>) {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prev) => prev + answer[count]);
      setCount((prev) => prev + 1);
    }, 10);

    if (count === answer.length) clearInterval(interval);
    return () => clearInterval(interval);
  });

  return (
    <>
      <li className="flex justify-start" ref={ref}>
        <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow bg">
          <span className="block">{text}</span>
        </div>
      </li>
    </>
  );
}

export default forwardRef(Answer);
