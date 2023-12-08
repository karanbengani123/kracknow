import AsyncStorage from "@react-native-async-storage/async-storage";
import Environment from "../screens/constants/Environment";
import {decode} from "base-64"
import { deleteTokenAPI } from "../api-services/User.api";

export const ObjToQueryString = (queryParams: any) => {
    const keyValuePairs: string[] = [];

    if (queryParams === undefined) {
        return '';
    }

    for (const key in queryParams) { 
        if (queryParams.hasOwnProperty(key)) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]));
        }
    }
    return Object.keys(queryParams).length !== 0 ? ('?' + keyValuePairs.join('&')) : '';
};

export const LogoutHandler = async (navigation: any) => {
    AsyncStorage.removeItem( Environment.PROJECT + 'token')
    deleteTokenAPI()
          .then((response) => {
            const statusCode = response.status;
            const data = response.json();
    
            return Promise.all([statusCode, data]).then((res) => ({
              statusCode: res[0],
              data: res[1],
            }));
          })
          .then(
            (res: {
              statusCode: number;
              data: { payload: any; message: string };
            }) => {
            //  debugger
            if (res.statusCode === 200) {
              navigation.navigate('SignIn');
            } else{
  
            }
          }
          );
    };


  export const TokenDecoder = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(decode(base64Url)
      .split('')
      .map((char) => {
        return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
    return JSON.parse(base64);
  };