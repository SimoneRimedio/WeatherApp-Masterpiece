import { Request, Response } from "express";
import axios from "axios";

const getGeocode = async (req: Request, res: Response): Promise<void> => {
  const { location } = req.query;
  const apiKey = process.env.GEOCODE_API_KEY;

  if (!location) {
    res.status(400).send({ error: "Location is required" });
    return;
  }

  try {
    const response = await axios.get("https://geocode.maps.co/search", {
      params: {
        q: location,
        api_key: apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch geocode data" });
  }
};

export default getGeocode;
