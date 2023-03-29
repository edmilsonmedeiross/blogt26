import { v2 as cloudinary } from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';

interface bodyProps {
  paramsToSign: Record<string, string>;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body: bodyProps = JSON.parse(req.body as string) as bodyProps || {};
  const { paramsToSign } = body;

  try {
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );
    res.status(200).json({
      signature,
    });
  } catch (error: unknown) {
    const err: Error = error as Error;
    res.status(500).json({
      error: err.message,
    });
  }
}