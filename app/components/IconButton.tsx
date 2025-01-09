import { Button } from "@headlessui/react"

export default function IconButton(props: {
  text: string
  icon: JSX.ElementType
}) {
  return (
    <Button className="group m-2 flex items-center overflow-hidden rounded-full bg-white px-1 py-1 text-sm font-medium text-zinc-700 shadow-md transition-all hover:bg-zinc-50 hover:text-zinc-900 hover:shadow-lg active:bg-zinc-100 active:shadow-inner">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-all group-hover:bg-zinc-900 group-active:bg-zinc-800 group-active:shadow">
        <props.icon className="h-4 w-4" />
      </span>
      <span className="px-3">{props.text}</span>
    </Button>
  )
}
