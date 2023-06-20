// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { API_KEY } from '@/config';
import { Answer } from '@/types';

interface Error {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Answer | Error>
) {
  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;
      const instance = axios.create({
        baseURL: 'https://api.kakaobrain.com',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `KakaoAK ${API_KEY}`,
        },
      });
      const response = await instance.post('/v1/inference/kogpt/generation', {
        prompt,
        max_tokens: 64,
      });

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'API 호출에 실패했습니다.' });
    }
  }
}
