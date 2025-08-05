import { useState, useEffect, useCallback, useRef } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
// import NetInfo from "@react-native-community/netinfo";
import { BaseAxios } from "../constants/constants";

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const useApiCall = <T>(
  method: ApiMethod,
  endpoint: string,
  body?: any,
  headers?: any,
  params?: any,
  executeOnMount: boolean = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(executeOnMount);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);
 
  const configRef = useRef({
    method,
    endpoint,
    body,
    headers,
    params
  });
 
  useEffect(() => {
    configRef.current = {
      method,
      endpoint,
      body,
      headers,
      params
    };
  }, [method, endpoint, body, headers, params]);

  const executeApiCall = useCallback(async (overrideBody?: any, overrideParams?: any) => {
    setLoading(true);
    setError(null);
    try {
    //   const netInfo = await NetInfo.fetch();
    //   if (!netInfo.isConnected) {
    //     setError("No internet connection. Please check your network settings.");
    //     setLoading(false);
    //     return null;
    //   }
      const currentConfig = configRef.current;
     
      const config: AxiosRequestConfig = {
        method: currentConfig.method,
        url: currentConfig.endpoint,
        data: overrideBody !== undefined ? overrideBody : currentConfig.body,
        headers: currentConfig.headers,
        params: overrideParams !== undefined ? overrideParams : currentConfig.params,
      };
      console.log("🔗 Final API Request:", config);
      const response: AxiosResponse<T> = await BaseAxios(config);
      console.log("🔗 Final API Response:", response);
      setData(response.data);
      setLoading(false);
      return response.data;
    } catch (err: any) {
      console.error(" API Error:", err?.response?.data);
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
      setLoading(false);
      throw err;
    }
  }, []);

  // Modified refetch function to ensure it triggers a new API call
  const refetch = useCallback((overrideParams?: any) => {
    console.log("🔄 Refetching data...");
    // Force a refresh by incrementing the key
    setRefreshKey(prev => prev + 1);
    // Return the promise from executeApiCall for better chainability
    return executeApiCall(undefined, overrideParams);
  }, [executeApiCall]);

  useEffect(() => {
    if (executeOnMount || refreshKey > 0) {
      executeApiCall().catch(() => {});
    } else {
      setLoading(false);
    }
  }, [refreshKey, executeOnMount, executeApiCall]);

  return { data, loading, error, refetch, executeApiCall };
};

export default useApiCall;