export const common: string[] = ['uuid', 'createdAt', 'deletedAt']
export const withdrawalRequestExcludeAttributes: string[] = [
  'updatedAt',
  'deletedAt'
]
export const walletAllHistoryExcludeAttributes: string[] = [
  'uuid',
  'deletedAt',
  'walletUUID'
]
export const walletAttributes: string[] = [
  'uuid',
  'studentUUID',
  'balance'
]
export const withdrawalRequestStudentIncludeAttributes: string[] = [
  'uuid',
  'email',
  'firstName',
  'lastName',
  'mobileNumber',
]
export const studentKeywordExclude: string[] = [
  'uuid',
  'studentUUID',
  'createdAt',
  'updatedAt',
  'deletedAt'
]

export const studentWithdrawalRequestForAdminKeywordExclude: string[] = [
  'updatedAt',
  'deletedAt',
  'profilePic'
]
export const studentAttributesWithoutFAndSName: string[] = [
  'profilePic',
  'idProof',
  'password',
  'cityUUID',
  'status',
  'examRegistered',
  'examCompleted',
  'tournamentRegistered',
  'tournamentCompleted',
  'quizRegistered',
  'quizCompleted',
  'updatedAt',
  ...common
]
