import DetailItem from "./DetailItem";

interface Props {
  items: { label: string; value: string }[];
}
export default function DetailList({ items }: Props) {
  return (
    <>
      {" "}
      {items.map((item) => (
        <DetailItem key={item.label} label={item.label} value={item.value} />
      ))}
    </>
  );
}
