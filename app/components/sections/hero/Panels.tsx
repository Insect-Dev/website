import { mergeCss } from "@/app/utils/mergeCss"
import { Button } from "@headlessui/react"
import Panel from "../../Panel"

export default function Panels() {
  const CustomPanel = (props: {
    className?: string
    title: string
    description: string
    cta: { label: string; link?: string; disabled?: boolean }
  }) => (
    <div className="absolute left-1/2 top-1/2 flex aspect-[3/4] w-64 -translate-x-1/2 -translate-y-1/2">
      <Panel
        className={mergeCss(
          "absolute flex size-full flex-col justify-between",
          props.className,
        )}
      >
        <div>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <div>
          <Button disabled={props.cta.disabled}>{props.cta.label}</Button>
        </div>
      </Panel>
    </div>
  )

  return (
    <>
      <CustomPanel
        className="-translate-y-6 -rotate-3 peer-hover:-translate-x-20 peer-hover:-translate-y-24"
        title="Antventure"
        description="Antventure is an action adventure game something something"
        cta={{ label: "Learn More", link: "https://youtube.com/@InsectDev" }}
      />

      <CustomPanel
        className="translate-x-12 translate-y-8 rotate-6"
        title="ColonyKit"
        description="ColonyKit is our extensive modding SDK for Antventure"
        cta={{ label: "Coming Soon", disabled: true }}
      />
    </>
  )
}
