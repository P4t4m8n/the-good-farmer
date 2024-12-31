import { getUserById } from "@/lib/actions/user.actions";

export default async function ProfileDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userDetails = await getUserById(id);
  console.log("userDetails:", userDetails);
  return <div>page</div>;
}
