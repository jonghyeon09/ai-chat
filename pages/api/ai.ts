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
      const { question } = req.body;
      const instance = axios.create({
        baseURL: 'https://api.kakaobrain.com',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `KakaoAK ${API_KEY}`,
        },
      });
      const response = await instance.post('/v1/inference/kogpt/generation', {
        prompt: `질문에 답하세요.\nQ: ${question || ''} A:`,
        max_tokens: 60,
        temperature: 0.3,
      });

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'API 호출에 실패했습니다.' });
    }
  }
}
