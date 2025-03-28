"use client";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-lg relative">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="MBM University Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6 text-lg font-bold">
        <Link href="/" className="hover:text-gray-300 transition">
          Home
        </Link>
        <Link href="/clubs" className="hover:text-gray-300 transition">
          Clubs
        </Link>
        <Link href="/events" className="hover:text-gray-300 transition">
          Events
        </Link>
        <Link
          href="/announcements"
          className="hover:text-gray-300 transition flex items-center"
        >
          <Newspaper className="w-6 h-6" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden focus:outline-none"
      >
        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900 flex flex-col items-center text-lg font-bold p-4 space-y-4 md:hidden shadow-md z-50">
          <Link
            href="/"
            className="hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/clubs"
            className="hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Clubs
          </Link>
          <Link
            href="/events"
            className="hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <Link
            href="/announcements"
            className="hover:text-gray-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Announcements
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
