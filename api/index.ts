import { Answer } from '@/types';
import axios, { AxiosResponse } from 'axios';

const question = async (prompt: string) => {
  try {
    const res: AxiosResponse<Answer> = await axios.post('/api/ai', {
      prompt,
    });

    return res;
  } catch (e) {
    console.error(e);
  }
};

const api = {
  question,
};

export default api;
