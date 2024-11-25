import { ClassValue } from "clsx"
import { mergeCss } from "../utils/mergeCss"

export default function Panel({
  className,
  children,
}: {
  className?: ClassValue
  children?: React.ReactNode
}) {
  return (
    <div
      className={mergeCss(
        "rounded border bg-black/5 p-2 backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  )
}
