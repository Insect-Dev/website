import Hero from "@/app/components/sections/Hero"

export default function Home() {
  return (
    <div className="bg-red-500">
      <main className="min-h-dvh bg-[#88d4dd]">
        <Hero />
      </main>
      <footer className="flex flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  )
}
