'use client';

interface Props {
  result: string;
}

export function ResultBox({ result }: Props) {
  return (
    <div className="mt-4 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
      {result}
    </div>
  );
}
