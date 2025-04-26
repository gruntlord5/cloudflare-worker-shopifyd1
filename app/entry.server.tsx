import { renderToReadableStream } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import type { EntryContext } from "@remix-run/node";
import { isbot } from "isbot";
import { addDocumentResponseHeaders } from "./shopify.server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  addDocumentResponseHeaders(request, responseHeaders);
  const userAgent = request.headers.get("user-agent");
  const isBot = isbot(userAgent ?? '');

  try {
    // For Cloudflare Workers, we use renderToReadableStream
    const stream = await renderToReadableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
      />,
      {
        signal: request.signal,
        onError(error) {
          console.error(error);
          responseStatusCode = 500;
        }
      }
    );

    // If it's a bot, wait for all Suspense boundaries to resolve
    if (isBot) {
      await stream.allReady;
    }

    responseHeaders.set("Content-Type", "text/html");
    
    return new Response(stream, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Error during rendering:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}