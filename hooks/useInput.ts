import { ChangeEvent, useCallback, useState } from 'react';

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setValue(value);
  }, []);
  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return { value, onChange, reset };
};
