"use client"

import { ArrowPathIcon } from "@heroicons/react/24/outline"
import { useCallback, useEffect, useState } from "react"
import { Button, Input } from "@headlessui/react"
import { mergeCss } from "@/app/utils/mergeCss"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function ShortLink({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const router = useRouter()

  const [code, setCode] = useState<string | undefined>()
  const [passwordRequired, setPasswordRequired] = useState(false)
  const [password, setPassword] = useState<string>("")
  const [status, setStatus] = useState<string | undefined>("Preparing...")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getUrl = useCallback(
    async (password?: string) => {
      try {
        setLoading(true)

        setStatus("Fetching the URL...")

        const code = (await params).code

        setCode(code)

        const response = await axios.get(`/api/link/${code}`, {
          headers: {
            "X-Password": password,
          },
        })

        setError(null)
        setStatus("Redirecting...")

        return response.data.url as string
        // setUrl(response.data.url)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setError("Short link not found")
            setStatus(undefined)
          } else if (error.response?.status === 401) {
            if (!password) {
              setPasswordRequired(true)
              setError(null)
              setStatus("Password is required")
              return null
            } else {
              setError("Invalid password")
              setStatus(undefined)
            }
          } else {
            setStatus(undefined)
          }

          return null
        }

        if (process.env.NODE_ENV !== "production") {
          console.error("An error occurred:", error)
        }

        setError("An unexpected error occurred")
        setStatus(undefined)
        return null
      } finally {
        setLoading(false)
      }
    },
    [params],
  )

  const submitPassword = () => {
    setError(null)
    getUrl(password)
    setPassword("")
  }

  useEffect(() => {
    getUrl() //.then((url) => {return url && router.replace(url)})
  }, [getUrl, router])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white dark:bg-black dark:text-white">
      {status && (
        <h2 className="rounded-md bg-zinc-300/15 px-2 py-1 text-2xl dark:bg-zinc-500/15">
          {status}
        </h2>
      )}

      {error && (
        <h2 className="rounded-md bg-red-300/20 px-2 py-1 text-2xl text-red-600 dark:bg-red-900/20">
          <span className="font-mono">{error}</span>
        </h2>
      )}

      <div className="text-zinc-700 opacity-50 dark:text-zinc-300">
        Code:{" "}
        <span className="font-mono font-medium text-zinc-950 dark:text-zinc-100">
          {code ?? "..."}
        </span>
      </div>

      <div className={mergeCss(!passwordRequired && "invisible")}>
        <form
          className="flex"
          autoComplete="false"
          onSubmit={(e) => {
            e.preventDefault()
            submitPassword()
          }}
        >
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password..."
            className="flex items-center justify-center gap-2 rounded-l-full bg-zinc-200 px-4 py-2 dark:bg-zinc-800"
          />
          <Button
            type="submit"
            className={mergeCss(
              "flex items-center justify-center gap-2 rounded-r-full bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-100 dark:text-black",
              !password && "cursor-not-allowed opacity-50",
            )}
            disabled={!password}
            onClick={submitPassword}
          >
            Submit
          </Button>
        </form>
      </div>

      <Button
        className={mergeCss(
          "flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-100 dark:text-black",
          loading && "cursor-not-allowed opacity-50",
        )}
        onClick={() => {
          setStatus("Refreshing...")
          setError(null)
          router.refresh()
        }}
        disabled={loading}
      >
        <ArrowPathIcon
          className={mergeCss("size-6", loading && "animate-spin")}
        />
        Refresh
      </Button>
    </div>
  )
}
