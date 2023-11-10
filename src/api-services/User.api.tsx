import AsyncStorage from '@react-native-async-storage/async-storage'
import { ObjToQueryString } from '../helper-functions/Helper'
import Environment from '../screens/constants/Environment'
import { TokenDecoder } from '../helper-functions/Helper'
import { ISignIn, ISignUp } from '../screens/models/Auth.models'

export const SignInAPI = (payload: ISignIn) => {
  return fetch(`${Environment.API}/sessions/student/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export const SignUpAPI = (payload: ISignUp) => {
  return fetch(`${Environment.API}/sessions/student/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export const GetExamListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(
    `${Environment.API}/schedules/all/exam?type=ALL_EXAM&examType=EXAM`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const GetUpcomingExamListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(
    `${Environment.API}/schedules/all/exam?type=UPCOMING&examType=EXAM`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const GetRecommendedExamListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(
    `${Environment.API}/schedules/all/exam?type=RECOMMENDED&&examType=EXAM`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const GetScheduleListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules?type=EXAM`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetExamDetailsAPI = async (uuid: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules/${uuid}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const registerAPI = async (uuid: string, payload: any) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)
  // debugger;

  return fetch(`${Environment.API}/schedules/${uuid}/join`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export const unregisterAPI = async (uuid: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules/${uuid}/disjoin`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetExamQuestionAPI = async (
  examUuid: string,
  participantUuid: string,
  queryParams: any
) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  const queryString = ObjToQueryString(queryParams)
  console.log(`${Environment.API}/schedules/${examUuid}/live/status/${participantUuid}${queryString}`, '-------api')
  return fetch(
    `${Environment.API}/schedules/${examUuid}/live/status/${participantUuid}${queryString}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const GetAllExamQuestionAPI = async (
  examUuid: string,
  participantUuid: string,
  // queryParams: any
) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  // const queryString = ObjToQueryString(queryParams)

  return fetch(
    `${Environment.API}/schedules/${examUuid}/live/status/${participantUuid}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const GetPrevExamQuestionAPI = async (
  participantUuid: string,
  questionUUID: string
) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  // const queryString = ObjToQueryString(queryParams)

  return fetch(
    `${Environment.API}/schedules/${participantUuid}/previous/question/${questionUUID}/status`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
  )
}

export const GetPrevTourQuestionAPI = async (
  tournamentParticipationUUID: string,
  questionUUID: string
) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  // const queryString = ObjToQueryString(queryParams)

  return fetch(
    `${Environment.API}/tournaments/${tournamentParticipationUUID}/previous/question/${questionUUID}/status`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
  )
}

export const AnswerAPI = async (participantUuid: string, payload: any) => {
  console.log('>.................', payload)
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules/${participantUuid}/live/answer`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export const GetExamReview = async (uuid: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules/review/answer/${uuid}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetSubcategoryAPI = async (examUuid: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules/subcategory/${examUuid}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetCompletedExamListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules/completed/exams?type=EXAM`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetMarksAPI = async (participantUuid: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules/marks/${participantUuid}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetLeaderboardAPI = async (uuid: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules/leaderBoard/${uuid}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetBannerImageUrls = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)
  return fetch(`${Environment.API}/Banner/All`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetCityListAPI = async () => {
  // const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token');
  // const token = userData && JSON.parse(userData);

  return fetch(`${Environment.API}/sessions/cities`, {
    method: 'GET'
    // headers: {
    //   'Authorization': `Bearer ${token}`,
    //   'Content-Type': 'application/json'
    // }
  })
}

export const GetQuestionsExamAPI = async (participantUuid: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(
    `${Environment.API}/schedules/exam/question/${participantUuid}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const GetQuestionsOptionExamAPI = async (questionUUID: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(
    `${Environment.API}/schedules/exam/question/options/${questionUUID}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const GetStartExamonTimeAPI = async (uuid: string, payload: any) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules/${uuid}/start/Exam/student`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export const UpdateStudentAPI = async (payload: any) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  const tokenDecoder = TokenDecoder(token)

  return fetch(`${Environment.API}/students/${tokenDecoder.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export const GetStudentDetailsAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)
  //  TokenDecoder(token);
  const tokenDecoder = TokenDecoder(token)
  // debugger; 

  return fetch(`${Environment.API}/students/${tokenDecoder.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

// Quiz API's***********************************

export const GetQuizListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(
    `${Environment.API}/schedules/all/exam?type=ALL_EXAM&examType=QUIZ`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const GetScheduleQuizListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules?type=QUIZ`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetQuizDetailsAPI = async (uuid: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules/${uuid}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetCompletedQuizListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules/completed/exams?type=QUIZ`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetUpcomingQuizListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(
    `${Environment.API}/schedules/all/exam?type=UPCOMING&examType=QUIZ`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

// Mock API's***********************************

export const GetMockListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(
    `${Environment.API}/schedules/all/exam?type=ALL_EXAM&examType=MOCK_TEST`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const GetMockDetailsAPI = async (uuid: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules/${uuid}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetScheduleMockListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules?type=MOCK_TEST`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetCompletedMockListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/schedules/completed/exams?type=MOCK_TEST`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetUpcomingMockListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(
    `${Environment.API}/schedules/all/exam?type=UPCOMING&examType=MOCK_TEST`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

//************* Payment API

export const postaddAmount = async (data: any) => {
  console.log('======', data)
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)
  return fetch(Environment.API + 'wallet/studentaddmoneyrequest', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },
    body: JSON.stringify({
      data
    })
  })

}

export const PayPaymentApi = async (data: any) => {
  console.log('======', data)
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)
  console.log('...', token)
  return fetch(Environment.API + '/wallet/gettoken', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data
    })
  })
}

export const WalletBalanceApi = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)
  // debugger;
  return fetch(Environment.API + '/wallet/balance', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  })
}

export const WalletHistoryApi = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)
  // debugger;
  return fetch(Environment.API + '/wallet/history', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  })
}

// export const  PaymentHistoryStore = async (payload: any) => {
//   const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
//   const token = userData && JSON.parse(userData)
//   return fetch(Environment.API + '/wallet/storetransaction', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(payload)
//   })
// }



// export const PaymentHistoryStore = async (orderId: string) => {
//   const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
//   const token = userData && JSON.parse(userData)
//   // debugger
//   return fetch(Environment.API + `/wallet/transaction/verify/${orderId}`, {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     // body: JSON.stringify(payload)
//   })
// }




// Keywords..................

export const GetKeywordListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token');
  const token = userData && JSON.parse(userData);

  return fetch(`${Environment.API}/keywords`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}



export const ChangePasswordAPI = async (payload: any) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token');
  const token = userData && JSON.parse(userData);

  return fetch(`${Environment.API}/students/changepassword`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export const KeywordUpdateAPI = async (payload: any) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token');
  const token = userData && JSON.parse(userData);

  return fetch(`${Environment.API}/students/keywords/list`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}



export const GetSelectedKeywordListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token');
  const token = userData && JSON.parse(userData);

  return fetch(`${Environment.API}/students/keywords/list`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(payload)
  })
}

export const SendSelectedKeywordListAPI = async (payload: any) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token');
  const token = userData && JSON.parse(userData);

  return fetch(`${Environment.API}/students/keywords/list`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export const WithdrawAPI = async (payload: any) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token');
  const token = userData && JSON.parse(userData);

  return fetch(`${Environment.API}/wallet/studentwithdrawalrequest`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export const GetWithdrawListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token');
  const token = userData && JSON.parse(userData);

  return fetch(`${Environment.API}/wallet/wallettransactionsforWithdrawal`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(payload)
  })
}


export const GetChartAPI = async (participantUuid: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token');
  const token = userData && JSON.parse(userData);
  // debugger
  return fetch(`${Environment.API}/schedules/get_pie_chart_data/${participantUuid}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(payload)
  })
}

export const GetNotificationAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token');
  const token = userData && JSON.parse(userData);
  // debugger
  return fetch(`${Environment.API}/students/notification/list`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(payload)
  })
}

export const sendTokenAPI = async (payload: any) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token');
  const token = userData && JSON.parse(userData);

  return fetch(`${Environment.API}/students/fcm`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export const deleteTokenAPI = async (payload: any) => {

  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token');
  const token = userData && JSON.parse(userData);
  // debugger;
  // console.log(AsyncStorage.getItem(Environment.PROJECT + 'token'), '...........')
  return fetch(`${Environment.API}/students/delete/fcm`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}


export const GetBankListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token');
  const token = userData && JSON.parse(userData);

  return fetch(`${Environment.API}/wallet/bank/list`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

//Tournaments

export const GetTournamentListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(
    `${Environment.API}/tournaments/scheduled/list`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const GetScheduleTournamentListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)
  console.log(token, "token")
  // debugger;

  return fetch(`${Environment.API}/tournaments/scheduled/list?q=SCHEDULED`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}


export const GetTournamentDetailsAPI = async (uuid: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)
  // debugger;

  return fetch(`${Environment.API}/tournaments/${uuid}/examlist`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const tournamentregisterAPI = async (tournamentRegisterUUID: string, payload: any) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)
  // debugger;

  return fetch(`${Environment.API}/tournaments/${tournamentRegisterUUID}/register`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}


export const tournamentunregisterAPI = async (tournamentRegisterUUID: string, participationUUID: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/tournaments/${tournamentRegisterUUID}/participation/${participationUUID}/unregister`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const StartTournamentExamAPI = async (payload: any) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/tournaments/exam/start`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export const GetTournamentQuestionAPI = async (
  examUUID: string,
  examScheduleUUID: string,
  participationUUID: string,
  queryParams: any
) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  const queryString = ObjToQueryString(queryParams)

  return fetch(
    `${Environment.API}/tournaments/${examUUID}/live/status/${examScheduleUUID}/${participationUUID}${queryString}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const TournamentAnswerAPI = async (participationUUID: string, payload: any) => {
  console.log('tournamentparticipationuuid', participationUUID)
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/tournaments/${participationUUID}/live/answer`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
}

export const GetTournamentMarksAPI = async (examUUID: string, participationUUID: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/tournaments/exam/${examUUID}/${participationUUID}/result`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetCompletedTournamentListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/tournaments/scheduled/list?q=COMPLETED`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetTournamentReviewAPI = async (uuid: any, getexamUUID: any) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/tournaments/leaderBoard/${uuid}/exam/${getexamUUID}/details`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetTournamentLeaderboardAPI = async (uuid: any) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/tournaments/leaderBoard/${uuid}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetTourSubcategoryAPI = async (tournamentUUID: string) => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(`${Environment.API}/tournaments/participation/${tournamentUUID}/subCategory/list`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export const GetUpcomingTournamentListAPI = async () => {
  const userData = await AsyncStorage.getItem(Environment.PROJECT + 'token')
  const token = userData && JSON.parse(userData)

  return fetch(
    `${Environment.API}/tournaments/scheduled/list`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}