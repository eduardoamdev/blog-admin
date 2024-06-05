import Link from "next/link";

export default function Navbar(props: any) {
  return (
    <div>
      {!props.authenticated ? (
        <nav>
          <span>
            <Link href="/auth/signup">Signup</Link>
          </span>
          <span>
            <Link href="/auth/login">Login</Link>
          </span>
        </nav>
      ) : (
        <nav>
          <span>
            <Link href="/">Logout</Link>
          </span>
        </nav>
      )}
    </div>
  );
}
