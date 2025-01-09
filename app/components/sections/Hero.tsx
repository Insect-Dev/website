import { MagnifyingGlassIcon, TvIcon } from "@heroicons/react/24/outline"
import IconButton from "../IconButton"

export default function Hero() {
  return (
    <div className="mx-auto flex h-dvh flex-col px-12 py-6 md:mx-0 md:flex-row">
      <div className="flex h-3/5 flex-col justify-center gap-5 md:h-full md:w-3/5">
        <div className="flex justify-center">
          <h1 className=".bg-gradient-to-r .from-white .to-[#88d4dd] .bg-clip-text .text-transparent mb-6 text-center text-6xl font-bold md:text-7xl">
            Insect Dev
          </h1>
        </div>
        <div className="flex flex-wrap justify-center">
          <IconButton text="Explore" icon={MagnifyingGlassIcon} />
          <IconButton text="Watch Devlogs" icon={TvIcon} />
        </div>
      </div>
      {/* <div className="relative z-10 h-2/5 bg-rose-300 py-8"></div> */}
    </div>
  )
}
