"use client"

import Image from "next/image"
import { Parallax, ParallaxProvider } from "react-scroll-parallax"

export default function Background() {
  return (
    <ParallaxProvider>
      <div className="absolute left-0 right-0 top-0 -z-50 overflow-hidden">
        {/* Backgrounds */}

        <div className="">
          <div className="relative -z-[100] h-[90dvh]">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-100 dark:from-slate-900 dark:to-blue-950" />
          </div>

          <div className="relative -z-[5] h-[200dvh]">
            <div className="absolute inset-0 bg-black" />
          </div>
        </div>

        {/* Surface */}

        {/* Grass */}

        <Parallax
          speed={-4}
          className="absolute -left-10 -right-10 top-[62dvh] z-[25] flex"
        >
          {(() => {
            const grass: JSX.Element[] = []

            for (let i = 0; i < 7; i++) {
              grass[i] = (
                <Image
                  src={`/assets/grass/grass_${i + 1}.png`}
                  key={i}
                  alt=""
                  width={512}
                  height={512}
                  style={{ left: `${i * 5 - 1}rem` }}
                  className="absolute w-40"
                />
              )
            }

            return grass
          })()}
        </Parallax>

        <Parallax
          speed={-15}
          className="absolute -left-10 -right-10 top-[60dvh] -z-10 flex opacity-80 blur-[3px]"
        >
          {(() => {
            const grass: JSX.Element[] = []

            for (let i = 0; i < 7; i++) {
              grass[i] = (
                <Image
                  src={`/assets/grass/grass_${i + 1}.png`} // TODO: Make offset random
                  key={i}
                  alt=""
                  width={512}
                  height={512}
                  style={{ left: `${i * 5 - 1}rem` }}
                  className="absolute w-40"
                />
              )
            }

            return grass
          })()}
        </Parallax>

        {/* Dirt */}
        <Parallax
          speed={-5}
          className="absolute -left-10 -right-10 top-[80dvh] z-20"
        >
          <Image
            src="/assets/dirt_floor.png"
            alt=""
            width={1127}
            height={512}
          />
        </Parallax>

        {/* Underground */}

        {/* Background Dirt */}
        <Parallax
          speed={-15}
          className="absolute left-[-90%] right-[20%] top-[125dvh] z-0 brightness-[.5] grayscale-[.6]"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <Image
              src="/assets/dirt_floor.png"
              key={i}
              alt=""
              width={1127}
              height={512}
              className={`-rotate-90 ${i % 2 === 0 ? "scale-x-[-1]" : ""}`} // TODO: Change to random
            />
          ))}
        </Parallax>

        <Parallax
          speed={-15}
          className="absolute left-[20%] right-[-90%] top-[125dvh] z-0 brightness-[.5] grayscale-[.6]"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <Image
              src="/assets/dirt_floor.png"
              key={i}
              alt=""
              width={1127}
              height={512}
              className={`rotate-90 ${i % 2 === 0 ? "scale-x-[-1]" : ""}`} // TODO: Change to random
            />
          ))}
        </Parallax>
      </div>
    </ParallaxProvider>
  )
}
