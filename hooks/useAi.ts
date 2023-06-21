import api from '@/api';
import { Answer } from '@/types';
import { useCallback, useState } from 'react';
import useSWR from 'swr';

export const AI_KEY = '/ai';

const useAi = () => {
  const { data, mutate } = useSWR<string>(AI_KEY);

  const question = useCallback(
    async (text: string) => {
      const question = await api.question(text);
      const answer =
        question?.data.generations[0].text || '문제가 발생했습니다.';

      mutate(answer);
    },
    [mutate]
  );

  return { answer: data, question };
};

export default useAi;
