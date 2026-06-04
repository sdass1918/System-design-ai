// Vercel serverless function — proxies chat requests to NVIDIA NIM API
// This runs server-side so no CORS issues and the API key stays hidden.

export const config = {
  runtime: "edge",
};

const NIM_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.NVIDIA_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "NVIDIA_API_KEY not configured on the server" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();

    const response = await fetch(NIM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to reach NVIDIA API", details: String(err) }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
