export interface IFile {
    uri: string;
    name: string;
    copyError?: string;
    fileCopyUri: string | null;
    type: string | null;
    size: number | null;
  }
  
  export interface ICreateSignedUrl {
    for: string;
    files: {
      name: string;
      extension: string;
      contentType: string;
    }[];
  }
  
  export interface ISignedUrl {
    fileUrl: string;
    signedUrl: string;
  }