export default function CheckoutsHeader  ({ text }: { text: string })  {
  return (
    <header className="h-fit border-b-2">
      <h2 className="font-title text-2xl ">{text}</h2>
    </header>
  );
};

