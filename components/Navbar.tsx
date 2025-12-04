"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const { user, refreshUser, logout } = useUser();
  console.log("Navbar user:", user);

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p>DevEvent</p>
        </Link>

        <ul>
          {user ? (
            <>
              <Link href="/">Home</Link>
              <Link href="/events">Events</Link>
              <Link href="/create-event">Create Events</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/">Home</Link>
              <Link href="/events">Events</Link>
              <Link href="/register">Sign up</Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
