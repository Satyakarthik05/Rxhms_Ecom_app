import { useState } from 'react';
import { BaseAxios } from '../constants/constants';

type DeleteByParamResult<T> = {
  executeDelete: (uri: string, value: Record<string, any>) => Promise<T | null>;
  data: T | null;
  loading: boolean;
  error: boolean;
};

export const useDeleteByParam = <T = any>(): DeleteByParamResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const executeDelete = async (uri: string, value: Record<string, any>): Promise<T | null> => {
    setLoading(true);
    setError(false);

    try {
      const response = await BaseAxios.delete(uri, { params: value });
      console.log('@@@response', response.data);

      if (!response.data.errorPresent) {
        setData(response.data.content);
        return response.data.content;
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }

    return null;
  };

  return { executeDelete, data, loading, error };
};
