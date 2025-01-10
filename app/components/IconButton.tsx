import { Button } from "@headlessui/react"
import { mergeCss } from "../utils/mergeCss"

export default function IconButton(props: {
  icon: JSX.ElementType
  className?: string
  children: string | JSX.Element | JSX.Element[]
}) {
  return (
    <Button
      className={mergeCss(
        "group relative m-2 flex items-center overflow-hidden rounded-full bg-white px-1 py-1 text-sm font-medium text-zinc-700 shadow-md transition hover:bg-zinc-50 hover:text-zinc-900 hover:shadow-lg active:bg-zinc-100 active:shadow-none",
        props.className,
      )}
    >
      <span className="absolute h-8 w-8 rounded-full bg-black transition-all group-hover:w-[calc(100%-0.5rem)] group-active:h-10 group-active:w-full group-active:-translate-x-1 group-active:bg-zinc-800" />
      <span className="z-[5] flex h-8 w-8 items-center justify-center rounded-full text-white">
        <props.icon className="h-4 w-4" />
      </span>
      <span className="z-[5] px-3 transition-colors group-hover:text-white">
        {props.children}
      </span>
    </Button>
  )
}
