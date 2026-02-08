import { BottomBar, Footer, Navbar } from "@/components/layouts";
import "react-loading-skeleton/dist/skeleton.css";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-24 lg:pb-0">
      <Navbar />
      {children}
      <Footer />
      <BottomBar />
    </div>
  );
}
