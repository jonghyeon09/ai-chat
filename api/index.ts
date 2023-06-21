import { Answer } from '@/types';
import axios, { AxiosResponse } from 'axios';

const question = async (question: string) => {
  try {
    const res: AxiosResponse<Answer> = await axios.post('/api/ai', {
      question,
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
