import { NextResponse } from "next/server"
import axios from "axios"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const code = (await params).code

  const passwordHeader = request.headers.get("X-Password")

  try {
    const { url, password } = await getUrlByCode(code)

    if (!url) {
      return NextResponse.json(
        { error: "No active URL found for the given code" },
        { status: 404 },
      )
    }

    async function validatePassword(
      password: string | null,
      passwordHeader: string | null,
    ) {
      if (!password) {
        // No password assigned, so just pass
        console.log(`${code}: No password - pass`)
        return true
      }

      if (!passwordHeader) {
        console.log(`${code}: Password missing - block`)
        return false
      }

      return password === passwordHeader
    }

    if (!await validatePassword(password, passwordHeader)) {
      return NextResponse.json(
        { error: "Invalid or missing password" },
        { status: 401 },
      )
    }

    return NextResponse.json({ url })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const outputError =
      process.env.NODE_ENV === "development" && error
        ? error.message
        : "An error occurred while processing your request"

    return NextResponse.json({ error: outputError, code }, { status: 500 })
  }
}

export async function getUrlByCode(code: string): Promise<{
  url: string | null
  password: string | null
}> {
  if (!process.env.NOTION_API_KEY) {
    throw new Error("NOTION_API_KEY environment variable is not set")
  }

  if (!process.env.NOTION_LINKS_DATABASE_ID) {
    throw new Error("NOTION_LINKS_DATABASE_ID environment variable is not set")
  }

  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${process.env.NOTION_LINKS_DATABASE_ID}/query`,
      {
        filter: {
          and: [
            {
              property: "Name",
              title: {
                equals: code,
              },
            },
            {
              property: "Active",
              checkbox: {
                equals: true,
              },
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
      },
    )

    const results = response.data.results

    if (results.length === 0) {
      return { url: null, password: null }
    }

    const urlProperty = results[0].properties.URL
    const passwordProperty = results[0].properties.Password

    return {
      url: urlProperty?.url || null,
      password: passwordProperty?.rich_text[0]?.plain_text || null,
    }
  } catch (error) {
    console.error("Error querying Notion database:", error)
    throw new Error("Failed to query Notion database", { cause: error })
  }
}
