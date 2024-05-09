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
          <Link href="/index.html">Go to index.html</Link>
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
