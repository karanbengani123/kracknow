export interface ISignIn {
  email: string;
  password: string;

}

export interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  // password: string;
  mobileNumber: string;
  city: string;

}

export interface IEdit {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber: string;
  city: string;
  status: boolean;
  idProof: string;
  profilePic: string;
}

export interface IAdd {
  paymentMode: string;
  orderId: string;
  referenceId: string;
  orderAmount: string;
  txStatus: string;
  txTime: string;
  transactionType: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IUpdateKeyword {
  keyword: string[];
}

export interface IWithdrawRequest{
  remaks: string,
  amount: string,
  transferMode: string,
  upiID: string,
  bankName: string,
  accountHolder: string,
  accountNumber: string,
  IFSCCode: string
}