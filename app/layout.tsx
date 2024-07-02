export const metadata = {
  title: "Blog Admin",
  description: "",
};

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black mb-20">{children}</body>
    </html>
  );
}
