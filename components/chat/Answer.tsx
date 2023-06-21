interface Props {
  answer: string;
}

export default function Answer({ answer }: Props) {
  return (
    <>
      <li className="flex justify-start">
        <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow bg">
          <span className="block">{answer}</span>
        </div>
      </li>
    </>
  );
}
