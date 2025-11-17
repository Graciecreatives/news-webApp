/* eslint-env node */
import axios from "axios";

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { category = "general", query = "" } = req.query;

  // Prefer a server-side env var `NEWS_API_KEY`. Keep VITE_NEWS_API_KEY as fallback
  // for older setups but avoid relying on client-prefixed vars in production.
  const apiKey = process.env.NEWS_API_KEY || process.env.VITE_NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Server API key missing. Set NEWS_API_KEY in environment." });
  }

  try {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${encodeURIComponent(
      category
    )}&q=${encodeURIComponent(query)}&apiKey=${apiKey}`;

    const response = await axios.get(url);

    // Cache on Vercel edge for 5 minutes, allow stale-while-revalidate
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=59");

    return res.status(200).json(response.data);
  } catch (err) {
    console.error("News API error:", err.response?.data || err.message || err);
    const message = err.response?.data?.message || "Failed to fetch news from provider.";
    return res.status(502).json({ error: message });
  }
}
