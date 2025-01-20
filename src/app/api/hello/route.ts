export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  console.log("log:Hello from ", process.env.VERCEL_REGION);
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}
