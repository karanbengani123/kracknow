export interface IStudentWithdrawRequest {
  amount: number;
  transferMode: string;
  phone: string;
  remarks: string;
  upiID: string;
  bankName: string;
  accountHolder: string;
  accountNumber: number;
  IFSCCode: string;
}
