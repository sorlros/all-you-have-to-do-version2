import { Request, Response } from "express";

interface NotificationData {
  data: {
    title: string;
    body: string;
    time: string;
    image: string;
  };
  token: string;
}

export async function POST(req: Request, res: Response) {
  console.log("req", req.body);
  if (req.method === "POST") {
    const body: NotificationData = req.body;
    console.log("backendData", body);

    try {
      const result = await sendFCM(body);
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
}
