"use client";

import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-center">
          Welcome to Market Hub
        </h1>
        <p className="text-2xl text-center">
          The best place to buy and sell your favorite products
          <button onClick={() => (window.location.href = "/app/pages/page.js")}>
            Home
          </button>
        </p>
      </section>
      <Image
        src="/images/market-hub.png"
        alt="Market Hub"
        width={500}
        height={500}
      />
    </main>
  );
}
