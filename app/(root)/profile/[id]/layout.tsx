export default async function ProfileLayout({
  details,
  address,
  order,
}: {
  details: React.ReactNode;
  address: React.ReactNode;
  order: React.ReactNode;
}) {
  return (
    <div>
      {details}
      {address}
      {order}
    </div>
  );
}
