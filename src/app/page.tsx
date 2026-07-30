import Navbar from "@/components/Navbar";
import CategoryBar from "@/components/CategoryBar";
import ListingCard from "@/components/ListingCard";
import Footer from "@/components/Footer";
import { LISTINGS } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Navbar>
        <CategoryBar />
      </Navbar>

      <main className="mx-auto w-full max-w-[2520px] px-6 pb-16 pt-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
          {LISTINGS.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
