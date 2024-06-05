import styles from "@/app/ui/home.module.css";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className={styles.reset}>
      <Navbar />
      <div>
        <h1>Blog Admin</h1>
      </div>
    </main>
  );
}
