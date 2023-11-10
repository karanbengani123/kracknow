import {
  Permission,
  RolePermission,
  Role,
  User,
  Category,
  SubCategory,
  Question,
  City,
  Student,
  QuestionOption,
  ExamBanner,
  Exam,
  ExamCity,
  ExamKeyword,
  ExamSchedule,
  ExamQuestion,
  ExamPriceRatio,
  ExamRankingFactor,
  Tournament,
  TournamentCity,
  TournamentKeyword,
  TournamentExamSchedule,
  TournamentPriceRatio,
  TournamentBanner,
  ScheduleExamParticipation,
  ExamParticipationQuestion,
  ExamParticipationQuestionOption,
  Wallet,
  WalletTransaction,
  WithdrawlRequest,
  StudentKeyword,
  TournamentParticipation,
  TournamentExamParticipationQuestion,
  TournamentExamParticipationQuestionOption,
  TournamentPriceDistribution,
  TournamentScheduledExam,
  student_addmoney_request,
} from "./models";
import TournamentRankingFactor from "./models/TournamentRankingFactor";
import TournamentSchedule from "./models/TournamentSchedule";

export function execute() {
  User.belongsTo(Role, {
    foreignKey: "roleUUID",
    onDelete: "restrict",
    as: "role",
  });

  Role.hasMany(RolePermission, {
    foreignKey: "roleUUid",
    onDelete: "restrict",
    as: "permissions",
  });

  RolePermission.belongsTo(Permission, {
    foreignKey: "permissionUUID",
    onDelete: "restrict",
  });

  Category.hasMany(SubCategory, {
    foreignKey: "categoryUUID",
    onDelete: "restrict",
  });

  SubCategory.belongsTo(Category, {
    foreignKey: "categoryUUID",
    onDelete: "restrict",
  });

  Question.belongsTo(Category, {
    foreignKey: "categoryUUID",
    onDelete: "restrict",
    as: "questionCategory",
  });

  Question.belongsTo(SubCategory, {
    foreignKey: "subCategoryUUID",
    onDelete: "restrict",
    as: "questionSubCategory",
  });

  Question.hasMany(QuestionOption, {
    foreignKey: "questionUUID",
    as: "options",
  });

  Student.belongsTo(City, { foreignKey: "cityUUID", onDelete: "restrict" });

  Exam.hasOne(ExamBanner, { foreignKey: "examUUID", as: "examBanner" });

  Exam.hasMany(ExamCity, { foreignKey: "examUUID", as: "examCity" });

  Exam.hasMany(ExamKeyword, { foreignKey: "examUUID", as: "examKeyword" });

  Exam.hasMany(ExamSchedule, { foreignKey: "examUUID", as: "schedule" });

  Exam.hasMany(ExamQuestion, { foreignKey: "examUUID", as: "questions" });

  Exam.belongsTo(Category, { foreignKey: "categoryUUID", as: "examCategory" });

  ExamQuestion.belongsTo(Question, {
    foreignKey: "questionUUID",
    as: "examQuestions",
  });

  Exam.hasMany(ExamPriceRatio, { foreignKey: "examUUID", as: "examprice" });

  Exam.hasMany(ExamRankingFactor, {
    foreignKey: "examUUID",
    as: "examRankingFactor",
  });

  Tournament.hasMany(TournamentCity, {
    foreignKey: "tournamentUUID",
    as: "tournamentCities",
  });

  Tournament.hasMany(TournamentKeyword, {
    foreignKey: "tournamentUUID",
    as: "tournamentKeywords",
  });

  Tournament.hasMany(TournamentExamSchedule, {
    foreignKey: "tournamentUUID",
    as: "tournamentExamSchedule",
  });

  Tournament.hasMany(TournamentPriceRatio, {
    foreignKey: "tournamentUUID",
    as: "tournamentPrize",
  });

  Tournament.hasMany(TournamentBanner, {
    foreignKey: "tournamentUUID",
    as: "banner",
  });

  TournamentExamSchedule.belongsTo(Exam, {
    foreignKey: "examUUID",
    as: "tournamentExamDetails",
  });

  ExamCity.belongsTo(City, { foreignKey: "cityUUID", as: "cities" });

  TournamentCity.belongsTo(City, {
    foreignKey: "cityUUID",
    as: "citiesTournament",
  });

  ExamSchedule.hasOne(ScheduleExamParticipation, {
    foreignKey: "examScheduleUUID",
    as: "studentExam",
  });

  ExamParticipationQuestion.hasMany(ExamParticipationQuestionOption, {
    foreignKey: "examParticipationQuestionUUID",
    as: "examParticipation",
  });

  ScheduleExamParticipation.belongsTo(Student, {
    foreignKey: "studentUUID",
    as: "participatedStudents",
  });

  ExamParticipationQuestion.belongsTo(Question, {
    foreignKey: "questionUUID",
    as: "questionsDetails",
  });

  ScheduleExamParticipation.hasMany(ExamParticipationQuestion, {
    foreignKey: "examParticipationUUID",
    as: "questionOptions",
  });

  Student.hasOne(Wallet, { foreignKey: "studentUUID", as: "wallet" });

  Wallet.hasMany(WalletTransaction, {
    foreignKey: "walletUUID",
    as: "wallettransaction",
  });
  // WalletTransaction.belongsTo(student_addmoney_request, {
  //   foreignKey: "referenceId",
  //   as: "wallettransaction_addmoney",
  //   targetKey: 'uuid',
  // });

  WalletTransaction.belongsTo(student_addmoney_request, {
    foreignKey: 'referenceId',
    as: 'wallettransaction_addmoney',
    targetKey: 'uuid',
  });

  Student.hasMany(WithdrawlRequest, {
    foreignKey: "studentUUID", as: "student_WithdrawlRequests"
  });
  
  WithdrawlRequest.belongsTo(Student, {  foreignKey: "studentUUID", as: "withdrawlRequests_Student" });
  student_addmoney_request.belongsTo(Student, {  foreignKey: "studentUUID", as: "addmoneyRequests_Student" });
  // Student.belongsTo(Wallet, {  foreignKey: "studentUUID", as: "studentWallet" });

  Student.hasOne(Wallet, {
    foreignKey: 'studentUUID',
    as: 'studentWallet', // Alias for the Wallet model
  });
  
  // In the Wallet model file
  Wallet.belongsTo(Student, {
    foreignKey: 'studentUUID',
    as: 'studentWallet', // Alias for the Student model
  });

  Student.hasMany(StudentKeyword, {
    foreignKey: "studentUUID",
    as: "studentKeywords",
  });

  Exam.hasMany(ScheduleExamParticipation, {
    foreignKey: "examUUID",
    as: "studentExam",
  });

  ScheduleExamParticipation.hasOne(Exam, {
    sourceKey: "examUUID",
    foreignKey: "uuid",
    as: "scheduleExam"

  })
  Tournament.hasMany(TournamentSchedule, {
    foreignKey: "tournamentUUID",
    as: "tournamentSchedule",
  });

  TournamentSchedule.belongsTo(Tournament, {
    foreignKey: "tournamentUUID",
    as: "tournament",
  });

  Tournament.hasMany(TournamentRankingFactor, {
    foreignKey: "tournamentUUID",
    as: "tournamentRankingFactor",
  });

  TournamentExamSchedule.hasOne(Exam, { sourceKey: "examUUID", foreignKey: "uuid", as: "exam" });
  TournamentParticipation.hasMany(Tournament, {
    sourceKey: "tournamentUUID",
    foreignKey: "uuid",
    as: "tournament",
  });
  Tournament.hasMany(TournamentParticipation, {
    foreignKey: "tournamentUUID",
    as: "tournamentParticipation",
  });
  TournamentSchedule.hasMany(TournamentParticipation, {
    foreignKey: "tournamentScheduleUUID",
    as: "tournamentParticipation",
  })

  TournamentSchedule.hasMany(TournamentPriceDistribution, {
    foreignKey: "tournamentScheduleUUID",
    as: "tournamentPriceDistribution",
  })

  TournamentParticipation.hasMany(TournamentSchedule, {
    sourceKey: "tournamentScheduleUUID",
    foreignKey: "uuid",
    as: "tournamentSchedule",
  })

  TournamentExamParticipationQuestion.hasMany(TournamentExamParticipationQuestionOption, {
    foreignKey: "tournamentExamParticipationQuestionUUID",
    as: "tournamentExamParticipationQuestionOption",
  });

  TournamentParticipation.hasMany(Student, {
    sourceKey: "studentUUID",
    foreignKey: "uuid",
    as: "students",
  });

  TournamentExamParticipationQuestion.belongsTo(Question, {
    foreignKey: "questionUUID",
    as: "question",
  });

  TournamentParticipation.hasMany(TournamentExamParticipationQuestion, {
    foreignKey: "tournamentParticipationUUID",
    as: "tournamentExamParticipationQuestion"
  });

  TournamentSchedule.hasMany(TournamentPriceDistribution, {
    foreignKey: "tournamentScheduleUUID",
    as: "tournamentPriceDistribute"
  })

  TournamentSchedule.hasMany(TournamentPriceDistribution, {
    foreignKey: "tournamentScheduleUUID",
    as: "tournamentScheduleTournamentPriceDistribution"
  })

  Tournament.belongsTo(Category, { foreignKey: "categoryUUID", as: "category" });
  TournamentExamParticipationQuestion.belongsTo(Exam, {
    foreignKey: "examUUID",
    as: "tournamentExamParticipationQuestion_Exam"
  })
  TournamentSchedule.hasMany(TournamentPriceDistribution, {
    foreignKey: "tournamentScheduleUUID",
    as: "tournamentSchedule_TournamentPriceDistribution"
  })

  Question.hasOne(ExamParticipationQuestion, {
    foreignKey: "questionUUID",
    as: "questionExamParticipationQuestion"
  })

  TournamentSchedule.hasMany(TournamentScheduledExam, {
    foreignKey: "tournamentScheduleUUID",
    as: "tournamentSchedule_TournamentScheduledExam",
  })

  TournamentScheduledExam.hasOne(Exam, {
    sourceKey: "examUUID",
    foreignKey: "uuid",
    as: "tournamentScheduledExam_Exam"
  })

  Exam.hasMany(TournamentScheduledExam,{
    sourceKey: "uuid",
    foreignKey: "examUUID",
    as: "exam_TournamentScheduledExam"
  })
}

