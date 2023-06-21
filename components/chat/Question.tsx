interface Props {
  question: string;
}

export default function Question({ question }: Props) {
  return (
    <>
      <li className="flex justify-end">
        <div className="relative max-w-xl px-4 py-2 text-white bg-blue-500 rounded shadow">
          <span className="block">{question}</span>
        </div>
      </li>
    </>
  );
}
