import { useState } from "react";
import { BaseAxios } from "../constants/constants";


export const usePostByParams = <T>():any => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const executePost = async (uri: string, postData: any): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
        console.log("Making request to:", uri);
        console.log("With params:", postData);
        console.log("@@@@hariika");
      const response = await BaseAxios.post(uri, null, {
        params: postData,
      });
      console.log("Full API response:", response.data);
      setData(response.data.content);
      console.log("@@@test", response.data.content)
      return response.data;
    } catch (err: any) {
      setError(err);
      console.log("@@@error",err);
      console.log("@@@@hello error", err.response.data);

      throw err; 
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, executePost };
};
