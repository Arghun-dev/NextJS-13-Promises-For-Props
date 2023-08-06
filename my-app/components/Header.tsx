import Link from "next/link";

const Header = () => {
  return (
    <header className="p-4 bg-slate-300 text-gray-950 flex items-center justify-between">
      <h2>Next.js 13</h2>
      <Link href="/signin">Login</Link>
    </header>
  );
};

export default Header;
