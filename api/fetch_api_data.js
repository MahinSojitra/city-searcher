export default async function handler(req, res) {
  const { city } = req.query;
  const apiKey = process.env.API_KEY;
  const apiUrl = `https://api.api-ninjas.com/v1/city?name=${city}`;

  if (!apiKey) {
    return res.status(500).json({ error: "API key is missing" });
  }

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.length > 0) {
      return res.status(200).json(data[0]);
    } else {
      return res.status(404).json({ error: "City not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch city data" });
  }
}
