import Link from "next/link";

export default function ArticleActions(props: any) {
  return (
    <nav className="flex flex-row-reverse bg-gray-400 p-1">
      <Link
        href={`/admin/articles/${props.title}/delete`}
        className="text-white hover:text-black text-1xl md:text-1xl lg:text-2xl mr-10"
      >
        Delete
      </Link>
      <Link
        href={`/admin/articles/${props.title}/update`}
        className="text-white hover:text-black text-1xl md:text-1xl lg:text-2xl mr-10"
      >
        Update
      </Link>
    </nav>
  );
}
