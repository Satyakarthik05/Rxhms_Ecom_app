import { useState } from "react";
import { BaseAxios } from "../constants/constants";

export const usePostByBody = <T>(): any => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const executePostByPath = async (uri: string, postData: any): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      console.log("@@@@otp test");

      const response: any = await BaseAxios.post(uri, postData);
      setData(response.data.content);
      console.log('response', response);
      console.log("@@@@otp in hook", response.data.content);
      return response.data.content;  // ✅ now properly typed and returned
    } catch (err: any) {
      setError(err);
      console.error('test error debug message', err);
      if (err?.response?.data) {
        console.error("🚨 API Error - usePostByPath:");
        console.error("Message:", err.response.data.message);
        console.error("Response Code:", err.response.data.responseCode);
        console.error("Full Error Response:", JSON.stringify(err.response.data, null, 2));
      } else {
        console.error("Unknown error occurred:", err.message || err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, executePostByPath };
};