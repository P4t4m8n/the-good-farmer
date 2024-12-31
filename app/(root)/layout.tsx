import Cart from "@/components/Cart/Cart";
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
      <main className="pt-40 w-full  h-fit flex flex-col">
        <Cart/>
        {children}
        <Footer />
      </main>
    </>
  );
}
