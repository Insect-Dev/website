import Hero from "@/app/components/sections/Hero"

export default function Home() {
  return (
      <main className="h-dvh">
    <div className="bg-gradient-to-br from-[#88d4dd] to-sky-400">
        <Hero />
        {["about us", "projects", "social"].map((item) => (
          <div
            key={item}
            className="flex h-dvh items-center justify-center border-t border-black p-5 text-4xl"
          >
            {item}
          </div>
        ))}
      </main>
      <footer className="flex flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  )
}
