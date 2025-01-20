export const dynamic = "force-dynamic"; // static by default, unless reading the request

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GET(request: Request) {
  console.log("log:Hello from ", process.env.VERCEL_REGION);
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}
