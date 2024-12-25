interface Props {
  description: string;
}
export default function Description({ description }: Props) {
  return (
    <textarea
      name="description"
      defaultValue={description}
      className="flex gap-1 flex-col border border-black-2 p-2 rounded text-dark-text"
    ></textarea>
  );
}
