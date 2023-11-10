import moment from "moment";
import { SUCCESSFUL } from "../../../../shared/constants/httpSuccessMessages";
import {
  Exam,
  ExamBanner,
  ExamPriceRatio,
  ExamSchedule,
  Student,
  ExamKeyword,
  StudentKeyword,
} from "../../../../shared/database/models";
import { IControllerParams } from "../../../../shared/interfaces/IControllerParams";
import { FindOptions, Op } from "sequelize";
import { parseLimitOffsetFromRequest } from "../../../../shared/helpers/parseLimitOffsetFromRequest";

export const getAllExam = async (params: IControllerParams<{}>) => {
  const filterParams = params.args.queryString;

  if (params.args.queryString.type === "UPCOMING") {
    const queryParams: FindOptions = {
      where: {
        type: params.args.queryString.examType,
      },
      include: [
        {
          model: ExamSchedule,
          as: "schedule",
          attributes: ["uuid", "startTime", "endTime"],
          where: {
            status: "SCHEDULED",
          },
        },
        {
          model: ExamBanner,
          as: "examBanner",
          attributes: ["uuid", "url", "phoneBanner"],
        },
        {
          model: ExamPriceRatio,
          as: "examprice",
        },
      ],
      order: [
        ["isFeatured", "DESC"],
        ["schedule", "startTime", "ASC"],
      ],
    };

    if (filterParams.limit) {
      const { limit, offset } = parseLimitOffsetFromRequest(
        filterParams as { limit: any; page: any }
      );
      queryParams.limit = limit;
      queryParams.offset = offset;
    }

    const exam = await Exam.findAll(queryParams);

    const response = [];

    for (const obj of exam) {
      if (
        moment(obj.schedule[0].endTime).format("YYYY:MM:DD, HH:mm:ss") >
        moment().utc().format("YYYY:MM:DD, HH:mm:ss")
      ) {
        response.push(obj);
      }
    }
    return {
      message: SUCCESSFUL,
      payload: {
        response: response,
      },
    };
  }
  if (params.args.queryString.type === "ALL_EXAM") {
    const queryParams: FindOptions = {
      where: {
        type: params.args.queryString.examType,
      },
      include: [
        {
          model: ExamSchedule,
          as: "schedule",
          attributes: ["uuid", "startTime", "endTime"],
          where: {
            status: "SCHEDULED",
          },
        },
        {
          model: ExamBanner,
          as: "examBanner",
          attributes: ["uuid", "url", "phoneBanner"],
        },
        {
          model: ExamPriceRatio,
          as: "examprice",
        },
      ],
      order: [["isFeatured", "DESC"]],
    };

    if (filterParams.limit) {
      const { limit, offset } = parseLimitOffsetFromRequest(
        filterParams as { limit: any; page: any }
      );
      queryParams.limit = limit;
      queryParams.offset = offset;
    }

    const exam = await Exam.findAll(queryParams);

    const response = [];

    for (const obj of exam) {
      if (
        moment(obj.schedule[0].endTime).format("YYYY:MM:DD, HH:mm:ss") >
        moment().utc().format("YYYY:MM:DD, HH:mm:ss")
      ) {
        response.push(obj);
      }
    }
    return {
      message: SUCCESSFUL,
      payload: {
        response: response,
      },
    };
  }
  if (params.args.queryString.type === "RECOMMENDED") {
    const student = await Student.findOne({
      where: {
        uuid: params.user.id,
      },
      include: [
        {
          model: StudentKeyword,
          as: "studentKeywords",
          attributes: ["attribute"],
        },
      ],
    });
    const keywords = student.studentKeywords.map((each) => each.attribute);
    const queryParams: FindOptions = {
      where: {
        type: params.args.queryString.examType,
      },
      include: [
        {
          model: ExamSchedule,
          as: "schedule",
          attributes: ["uuid", "startTime", "endTime"],
          where: {
            status: "SCHEDULED",
          },
        },
        {
          model: ExamBanner,
          as: "examBanner",
          attributes: ["uuid", "url", "phoneBanner"],
        },
        {
          model: ExamPriceRatio,
          as: "examprice",
        },
        {
          model: ExamKeyword,
          as: "examKeyword",
          attributes: ["examUUID"],
          where: {
            attribute: { [Op.in]: keywords },
          },
        },
      ],
    };

    if (filterParams.limit) {
      const { limit, offset } = parseLimitOffsetFromRequest(
        filterParams as { limit: any; page: any }
      );
      queryParams.limit = limit;
      queryParams.offset = offset;
    }
    const recommendedExam = await Exam.findAll(queryParams);
    return {
      message: SUCCESSFUL,
      payload: {
        response: recommendedExam,
      },
    };
  }
};
