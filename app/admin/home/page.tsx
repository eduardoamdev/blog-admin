import Navbar from "../../components/Navbar";

export default function Home(): JSX.Element {
  return (
    <main>
      <Navbar authenticated="true" />
      <div className="pt-20">
        <h2 className="text-center text-white non-italic font-bold pt-20 text-2xl md:text-4xl lg:text-6xl">
          Welcome Admin
        </h2>
      </div>
    </main>
  );
}
