import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="pt-40 w-full gap-16  h-screen px-4 flex flex-col">
        {children} <Footer />
      </main>
    </>
  );
}
