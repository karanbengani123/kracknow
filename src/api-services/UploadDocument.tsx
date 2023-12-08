import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICreateSignedUrl, IFile } from "../helper-functions/Upload";
// import { ICreateSignedUrl, IFile } from "../../Models/Upload.models";
// import { UPLOADIMAGE,PROJECT } from "../Environment";
import Environment from "../screens/constants/Environment";

// api for upload image
export const CreateSignedUrlAPI = async(imageDetails: ICreateSignedUrl) => {

    const userData = await AsyncStorage.getItem( Environment.PROJECT + 'token');
    const token = userData && JSON.parse(userData);

  return fetch(`${Environment.API}/common/filesupload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(imageDetails),
  });
 }

export const uploadImage = async(url:string, file: IFile) => {
    // debugger;
  return fetch(url, {
    method: "PUT",
    body: file,
  });
}


// export const CreateSignedUrlAPI = async (payload: ICreateSignedUrl) => {
//     const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token');
//     const token = userData && JSON.parse(userData);
  
//     return fetch(
//       `${Environment.API}/content/signed`,
//       {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       }
//     );
//   };
  
//   export const GetBlob = async (fileUri: string) => {
//     const res = await fetch(fileUri);
//     return await res.blob();
//   };
  
//   export const UploadDocumentAPI = async (uploadUrl: string, file: IFile) => {
//     const payload = await GetBlob(file.uri);
  
//     return fetch(
//       uploadUrl,
//       {
//         method: 'PUT',
//         body: payload
//       }
//     );
//   };


