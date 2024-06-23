import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div>
        <div className="pt-20">
          <h1 className="text-center text-white non-italic font-bold pt-20 text-3xl md:text-5xl lg:text-7xl">
            Blog Admin
          </h1>
        </div>
      </div>
    </main>
  );
}
