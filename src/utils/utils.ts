import AsyncStorage from '@react-native-async-storage/async-storage';



export const getLocalText = async (data: string) =>{
  try {
    const dataValue = await AsyncStorage.getItem(data);
    if (dataValue !== null) {
      console.log('retrieved from AsyncStorage:', dataValue);
      return dataValue;
    } else {
      console.warn('No data found in AsyncStorage');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving token from AsyncStorage:', error);
    return null;
  }
};


export const setLocalText = async (code: string, data:string): Promise<void> => {
  try {  
      await AsyncStorage.setItem(code, data);
    console.log(code,' saved successfully to AsyncStorage::::'+data);
  } catch (error) {
    console.error('Error saving token to AsyncStorage:', error);
  }
};


export const setLocalData=  async (code: string, data: any): Promise<void> => {
    if (code) {
        try {
            const jsonData = JSON.stringify(data);;

            await AsyncStorage.setItem(code, jsonData);
        } catch (error) {
            console.error("setLocalData(): Error setting local data!", error);
        }
    }
}


export const getLocalData= async(code: string): Promise<any> =>  {
    console.log("Retrieving data for code:", code);
    const dataText =  await AsyncStorage.getItem(code);
    console.log("Data retrieved from localStorage:", dataText);

    if (dataText) {
        const parsedData = JSON.parse(dataText);
        console.log("Parsed data:", parsedData);
        return parsedData;
    } else {
        console.warn("No data found for code:", code);
        return null;
    }
}

export const deleteLocalCode = async (code: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(code);
    console.log(`${code} deleted from AsyncStorage`);
  } catch (error) {
    console.error(`Error deleting ${code} from AsyncStorage:`, error);
  }
};



export const clearSessionData = async (): Promise<void> => { 
  try { 
    await AsyncStorage.clear(); 
    console.log('Session data cleared successfully'); 
  } catch (error) { 
    console.error('Error clearing session data:', error); 
  }
}