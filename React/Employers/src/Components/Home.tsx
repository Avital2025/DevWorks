import About from "./About";
import Features from "./features";
import Hero from "./hero";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <Features />
        <About />
      </main>
    </div>
  )
}

