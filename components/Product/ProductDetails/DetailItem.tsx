
export default function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return value ? (
    <div className="flex gap-1 flex-col border border-black-2 p-2 rounded">
      <h2 className="font-semibold font-title underline">{label}:</h2>
      <p className="font-text">{value}</p>
    </div>
  ) : null;
}
