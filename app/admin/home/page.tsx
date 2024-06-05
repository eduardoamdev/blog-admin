import styles from "@/app/ui/home.module.css";
import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <main className={styles.reset}>
      <Navbar authenticated="true" />
      <div>
        <h2>Welcome</h2>
      </div>
    </main>
  );
}
