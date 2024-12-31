import { getAddresses } from "@/lib/actions/address.actions";

export default async function ProfileAddressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
 const addresses = await getAddresses({ userId: id });
  console.log("addresses:", addresses)
  return <div>page</div>;
}
