import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Button } from "@headlessui/react"
import Panels from "./hero/Panels"

export default function Hero() {
  return (
    <div className="mx-auto flex h-dvh px-12">
      <div className="grid w-1/3 flex-none grid-rows-5 justify-center bg-green-300 p-8">
        <div className="row-start-2 flex flex-col justify-center">
          <h1 className="text-4xl">Insect Dev</h1>
        </div>
        <div className="row-span-2 row-start-3 flex flex-col items-center">
          <Button className="m-2 flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2">
            <MagnifyingGlassIcon className="size-5" />
            Explore
          </Button>
        </div>
      </div>
      <div className="relative z-10 w-2/3 bg-rose-300 py-8">
        <Panels />
      </div>
    </div>
  )
}