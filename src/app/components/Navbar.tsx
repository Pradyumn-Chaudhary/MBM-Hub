import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">College Clubs</h1>
      <div className="space-x-6">
        <Link href="/" className="hover:text-gray-200">Home</Link>
        <Link href="/clubs" className="hover:text-gray-200">Clubs</Link>
        <Link href="/events" className="hover:text-gray-200">Events</Link>
        <Link href="/admin" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;