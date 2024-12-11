import { Button } from "@headlessui/react"

export default function IconButton(props: {
  text: string
  icon: JSX.ElementType
}) {
  return (
    <Button className="group m-2 flex items-center overflow-hidden rounded-full bg-white px-1 py-1 text-sm font-medium text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg active:bg-gray-100 active:shadow-inner">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-all group-hover:bg-gray-900 group-active:bg-gray-800 group-active:shadow">
        <props.icon className="h-4 w-4" />
      </span>
      <span className="px-3">{props.text}</span>
    </Button>
  )
}
