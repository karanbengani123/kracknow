import firebase from "firebase-admin";

let messenger = null;

const serviceAccount: any = {
    projectId: "kracknow-ae732",
    clientEmail:
        "firebase-adminsdk-mtfjj@kracknow-ae732.iam.gserviceaccount.com",
    privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC5Jlp6rBrxFO4D\nZ4Kr6fG62xh8XDHetGERjnKJ3FWSiytZFMZKlYH2KZ7P+FILGYHIj5YEArQP9tU1\nZoXIBduwq8ruYnjTCdaB2KgbOEZC3OOJ7K0i+/uiA1cMtHLrVn2WaUOrE1yq7apq\nVTXFGRc5oT/oWByI6hO3nCAYsrxvrtxHSjSWFCI2Ubq2fBmvVjBdYeQCIWGTMb15\n6YV+FE/EVqwCYCj5Ai8jhn8zOUHNn+NDQqWeDS01Hd+v+a76KnZfCWJvqMYHvMkD\nzJhlbc21HyIuMVkar+/CZejf41rA/BawEj8KW2narUmwCsbhXu5RsGZus5WylLgP\nhLIReM09AgMBAAECggEAI7KPHdlKfYJrTIk70sERnBULoMiWzelJ0Nx93XI3poBC\nLJP6kl1GmCtYpSDr0puJoB19D0tlI7HT1E6uywzEGYlZ4EHoqUnbi5/183+TXmdf\n0JMrI5RhZRCPS1IMWS8NGj+z7gtW4dbedU92BUkr5u7d10KLx+MXx54ouxJVDhQc\n7B/vQpJHKqE2nFWmPvpLhqGqaIQvZd9uMo39mvFIP9dZJEzbOiMlO0ZlyS2Qqup/\nnbZyY+Vt+QQH5ZBl9KU53ZN5UoIiVMROgmL98cNsMjta+Uv6GCN6CfOWTrG7PSdK\nN2JthAGH1BJOU8PDC030fmveQ0rU2f+MU0MdRovEGQKBgQDmIH55KLPfX68s9n1w\n7/7Tw4/5Qhg4QKCyh/Pa5tcm5AWKtBailVm5Yk5Aj2C497FV5UOFjX8vKGxr6XPc\nzKebXc41K2QjzOvUC8QMQG6OJo87QOfFIlgwnjG2om6PSXafgrqSvlnnPUHOmb/V\nGVdzdopIzwSC3aS08T+ixNMEyQKBgQDN91RgvQhMLh1rqBKVTi7ytBVKbePLKw2P\nJE1HA6wuMnGeCImGkl64rNIC+Q1cR4A3OkRPnOoTnhBBaY3JsB5UkEj4ilpyY0hi\nRck9ChG2A4rMJSulZsX82tHYETzwe/Pf+ntg0deldcNmqeE7VXgdQJ0YAOETzC6k\n+ApYeFpC1QKBgCZa5hl1gj1Jql25G4E2TuemoZluvbCqfN4ksK0camGuAYpzp44j\njFfMnbQ+8WUCy4jAdHeO9NK8Tw3RVCFJ7umDQfo0qDUbU3b9GwjbuFFy9c5va/G8\nXqyDwU9qVTkGioHdfRE2Lq/O0ugHUiTHW38AE948usjA/lG2H+AWJAGZAoGARq75\nkxVscpBk4lxUvE6PiBVLNTbPNRs6VQR1TMiy30vKeByf7cHvpdsRW5nS/vc+xjVF\n2jiUkFTvaTNrSGsbjZPSpxD8B0ORRMCEVmFNQLSofnTHLMU/bw49c7Q+wJ0ZTaVt\nkAWTxyHKBEKKnE0xooBZKTKsC5pH66+ABWqQN10CgYBV5TVMH8+FTCjzMuBwbUVv\nPVul4wazMq007G3FxpUqJi/IeNhQI+0PYZo3ccyeTpIGk4x2EAl/CfguJDuj484L\nWvWvMqDJY7W+RkJQW+cDLnfL80lrsOmOUHRprF3C5jaybr4zAcGgJ2yWfqYi+Z6O\nRC2MBKNVay+K9PhrLdT1sg==\n-----END PRIVATE KEY-----\n",
};
if (!firebase.apps.length) {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
    });
}
messenger = firebase.messaging();
export const fcm = messenger;
