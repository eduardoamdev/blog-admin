import Link from "next/link";

export default function Navbar(props: any) {
  return (
    <div>
      {!props.authenticated ? (
        <nav>
          <span>
            <Link href="/signup">Signup</Link>
          </span>
          <span>
            <Link href="/login">Login</Link>
          </span>
        </nav>
      ) : (
        <nav>
          <span>
            <Link href="/admin/articles/new">New article</Link>
          </span>
          <span>
            <Link href="/">Logout</Link>
          </span>
        </nav>
      )}
    </div>
  );
}
