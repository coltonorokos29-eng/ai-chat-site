export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: message,
    }),
  });

  const data = await response.json();

  console.log("RAW AI RESPONSE:", JSON.stringify(data, null, 2));

  const reply =
    data.output?.[0]?.content?.[0]?.text ??
    data.output_text ??
    "No response from AI";

  return Response.json({ reply });
}
