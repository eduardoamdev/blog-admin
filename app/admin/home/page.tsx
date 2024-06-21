import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar authenticated="true" />
      <div>
        <h2>Welcome</h2>
      </div>
    </main>
  );
}
