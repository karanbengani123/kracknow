import { Sequelize } from "sequelize";
import { execute } from "../relationships";
import Internationalization, { init as InternationalizationInit } from "./Internationalization";
import NotificationTemplate, {init as NotificationTemplateInit } from "./NotificationTemplate";
import Permission, { init as PermissionInit } from "./Permission";
import ResetPasswordToken, {init as ResetPasswordTokenInit } from "./ResetPasswordToken";
import Role, { init as RoleInit } from "./Role";
import User, { init as UserInit } from "./User";
import BankAccount, { init as BankAccountInit } from "./bankAccountAdmin"; // Import the BankAccount model
import BlockedToken, { init as BlockedTokenInit } from "./BlockedToken";
import City, { init as CityInit } from "./City";
import AdminSummary, { init as AdminSummaryInit } from "./AdminSummary";
import Category, { init as CategoryInit } from "./Category";
import Exam, { init as ExamInit } from "./Exam";
import ExamBanner, { init as ExamBannerInit } from "./ExamBanner";
import ExamCity, { init as ExamCityInit } from "./ExamCity";
import ExamKeyword, { init as ExamKeywordInit } from "./ExamKeyword";
import ExamParticipationQuestion, {init as ExamParticipationQuestionInit,} from "./ExamParticipationQuestion";
import ExamParticipationQuestionOption, {init as ExamParticipationQuestionOptionInit,} from "./ExamParticipationQuestionOption";
import ExamPriceDistribution, {init as ExamPriceDistributionInit,} from "./ExamPriceDistribution";
import ExamSchedule, { init as ExamScheduleInit } from "./ExamSchedule";
import ScheduleExamParticipation, {init as ScheduleExamParticipationInit,} from "./ScheduleExamParticipation";
import Feedback, { init as FeedbackInit } from "./Feedback";
import Keyword, { init as KeywordInit } from "./Keyword";
import Question, { init as QuestionInit } from "./Question";
import QuestionOption, { init as QuestionOptionInit } from "./QuestionOption";
import RolePermission, { init as RolePermissionInit } from "./RolePermission";
import Student, { init as StudentInit } from "./Student";
import StudentDeviceToken, {init as StudentDeviceTokenInit,} from "./StudentDeviceToken";
import StudentKeyword, { init as StudentKeywordInit } from "./StudentKeyword";
import SubCategory, { init as SubCategoryInit } from "./SubCategory";
import Tournament, { init as TournamentInit } from "./Tournament";
import TournamentBanner, {init as TournamentBannerInit,} from "./TournamentBanner";
import TournamentCity, { init as TournamentCityInit } from "./TournamentCity";
import TournamentParticipation, {init as TournamentParticipationInit,} from "./TournamentParticipation";
import TournamentExamSchedule, {init as TournamentExamScheduleInit,} from "./TournamentExamSchedule";
import TournamentExamParticipationQuestion, {init as TournamentExamParticipationQuestionInit,} from "./TournamentExamParticipationQuestion";
import TournamentExamParticipationQuestionOption, {init as TournamentExamParticipationQuestionOptionInit,} from "./TournamentExamParticipationQuestionOption";
import TournamentKeyword, {init as TournamentKeywordInit,} from "./TournamentKeyword";
import TournamentParticipationExam, {init as TournamentParticipationExamInit,} from "./TournamentParticipationExam";
import Wallet, { init as WalletInit } from "./Wallet";
import WalletTransaction, {init as WalletTransactionInit,} from "./WalletTransaction";
import WithdrawlRequest, {init as WithdrawlRequestInit,} from "./WithdrawlRequest";
import Banner, { init as BannerInit } from "./Banner";
import ExamQuestion, { init as ExamQuestionInit } from "./ExamQuestions";
import ExamPriceRatio, { init as ExamPriceRatioInit } from "./ExamPrizeRatio";
import ExamRankingFactor, {init as ExamRankingFactorInit,} from "./ExamRankingFactor";
import TournamentPriceRatio, {init as TournamentPriceRatioInit,} from "./TournamentPriceRatio";
import UserDeviceToken, {init as UserDeviceTokenInit,} from "./UserDeviceToken";
import KeyValue, { init as KeyValueInit } from "./KeyValue";
import UserMessages, { init as UserMessagesInit } from "./UserMessages";
import BankNameList, { init as BankNameListInit } from "./BankNameList";
import TournamentSchedule, {init as TournamentScheduleInit,} from "./TournamentSchedule";
import TournamentRankingFactor, {init as TournamentRankingFactorInit,} from "./TournamentRankingFactor";
import ScheduledRule, {init as ScheduledRuleInit,} from "./ScheduledRule";
import PrizeAmountHistory, {init as PrizeAmountHistoryInit} from "./PrizeAmountHistory";
import TournamentPriceDistribution, { init as TournamentPriceDistributionInit }from "./TournamentPriceDistribution";
import StudentCompletedTournamentExamsStatus, { init as StudentCompletedTournamentExamsStatusInit } from "./StudentCompletedTournamentExamsStatus";
import TournamentScheduledExam, { init as TournamentScheduledExamInit } from "./TournamentScheduledExam";
import student_addmoney_request, { init as student_addmoney_requestInit } from './AddmoneyRequest'
import Withdrawallimit, { init as WithdrawallimitInit } from './Withdrawallimit'

// End
export function init(sequelize: Sequelize) {
  UserInit(sequelize);
  ResetPasswordTokenInit(sequelize);
  NotificationTemplateInit(sequelize);
  InternationalizationInit(sequelize);
  PermissionInit(sequelize);
  RoleInit(sequelize);
  BankAccountInit(sequelize);
  BlockedTokenInit(sequelize);
  CityInit(sequelize);
  AdminSummaryInit(sequelize);
  CategoryInit(sequelize);
  ExamInit(sequelize);
  ExamBannerInit(sequelize);
  ExamCityInit(sequelize);
  ExamKeywordInit(sequelize);
  ExamParticipationQuestionInit(sequelize);
  ExamParticipationQuestionOptionInit(sequelize);
  ExamPriceDistributionInit(sequelize);
  ExamScheduleInit(sequelize);
  ScheduleExamParticipationInit(sequelize);
  StudentInit(sequelize);
  StudentDeviceTokenInit(sequelize);
  StudentKeywordInit(sequelize);
  SubCategoryInit(sequelize);
  TournamentInit(sequelize);
  TournamentBannerInit(sequelize);
  TournamentCityInit(sequelize);
  TournamentExamScheduleInit(sequelize);
  TournamentExamParticipationQuestionInit(sequelize);
  TournamentExamParticipationQuestionOptionInit(sequelize);
  TournamentKeywordInit(sequelize);
  TournamentParticipationInit(sequelize);
  TournamentParticipationExamInit(sequelize);
  WalletInit(sequelize);
  WalletTransactionInit(sequelize);
  WithdrawlRequestInit(sequelize);
  FeedbackInit(sequelize);
  QuestionInit(sequelize);
  QuestionOptionInit(sequelize);
  RolePermissionInit(sequelize);
  KeywordInit(sequelize);
  BannerInit(sequelize);
  ExamQuestionInit(sequelize);
  ExamPriceRatioInit(sequelize);
  ExamRankingFactorInit(sequelize);
  TournamentPriceRatioInit(sequelize);
  UserDeviceTokenInit(sequelize);
  KeyValueInit(sequelize);
  UserMessagesInit(sequelize);
  BankNameListInit(sequelize);
  TournamentScheduleInit(sequelize);
  TournamentRankingFactorInit(sequelize);
  ScheduledRuleInit(sequelize);
  PrizeAmountHistoryInit(sequelize);
  TournamentPriceDistributionInit(sequelize);
  StudentCompletedTournamentExamsStatusInit(sequelize);
  TournamentScheduledExamInit(sequelize);
  student_addmoney_requestInit(sequelize);
  WithdrawallimitInit(sequelize)
  // Execute the relationships
  execute();
}

/**
 * Initializes and exports the database models
 */
export {
  User,
  ResetPasswordToken,
  NotificationTemplate,
  Internationalization,
  Permission,
  Role,
  BankAccount,
  BlockedToken,
  City,
  AdminSummary,
  Category,
  Exam,
  ExamBanner,
  ExamCity,
  ExamKeyword,
  ExamParticipationQuestion,
  ExamParticipationQuestionOption,
  ExamPriceDistribution,
  ExamSchedule,
  ScheduleExamParticipation,
  Student,
  StudentDeviceToken,
  StudentKeyword,
  SubCategory,
  Tournament,
  TournamentBanner,
  TournamentCity,
  TournamentExamSchedule,
  TournamentExamParticipationQuestion,
  TournamentExamParticipationQuestionOption,
  TournamentKeyword,
  TournamentParticipation,
  TournamentParticipationExam,
  Wallet,
  WalletTransaction,
  WithdrawlRequest,
  Feedback,
  Question,
  QuestionOption,
  RolePermission,
  Keyword,
  Banner,
  ExamQuestion,
  ExamPriceRatio,
  ExamRankingFactor,
  TournamentPriceRatio,
  UserDeviceToken,
  KeyValue,
  UserMessages,
  BankNameList,
  TournamentSchedule,
  TournamentRankingFactor,
  ScheduledRule,
  PrizeAmountHistory,
  TournamentPriceDistribution,
  StudentCompletedTournamentExamsStatus,
  TournamentScheduledExam,
  student_addmoney_request,
  Withdrawallimit
};
