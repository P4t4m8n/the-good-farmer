import { useUser } from "@/hooks/useUser";

interface Props {
  children: React.ReactNode;
}
export default function AdminWrapper({ children }: Props) {
  const { user } = useUser();
  return user?.isAdmin && <>{children}</>;
}
