import { APIGatewayProxyHandler } from "aws-lambda";
import { Op } from "sequelize";
import {
  ScheduledRule,
  ScheduleExamParticipation,
  UserDeviceToken,
  UserMessages,
} from "../../shared/database/models";

import { examLeaderBoard } from "./getLeaderBoard";
import { sendPushNotification } from "../../shared/lib/notification/sendPushNotification";
import { EventBridge } from "aws-sdk";
const eventBridge = new EventBridge({ apiVersion: "2015-10-07" });
import { instance, loadDatabase } from "../../shared/database/sequelize";
import { init } from "../../shared/database/models";
import { sendMessageToClient } from "./sendNotification";

export const handler: APIGatewayProxyHandler = async (event: any) => {
  if (!instance.connection) {
    console.log("No connection exists");
    instance.connection = await loadDatabase();
  } else {
    console.log("Connection exists");
    // restart connection pool to ensure connections are not re-used across invocations
    instance.connection.connectionManager.initPools();

    // restore `getConnection()` if it has been overwritten by `close()`
    if (
      Object.prototype.hasOwnProperty.call(
        instance.connection.connectionManager,
        "getConnection"
      )
    ) {
      delete instance.connection.connectionManager.getConnection;
    }
  }

  init(instance.connection);
  // console.log("events********************************", event)

  const student = await ScheduleExamParticipation.findAll({
    where: {
      examScheduleUUID: event.examSCheduleUUID,
    },
    attributes: ["studentUUID", "coins"],
  });

  const userToken = await UserDeviceToken.findAll({
    where: {
      userId: { [Op.in]: student.map(each => each.studentUUID) },
    },
  });

  await UserMessages.bulkCreate(
    userToken.map((item) => ({
      userId: item.userId,
      meta: { userId: item.userId },
      message: event.message,
    }))
  );

  if (userToken.length) {
    try {
      const fcmList = userToken.filter((obj) => obj.type === "FCM")
      await sendPushNotification(fcmList, event.message);
    } catch (e) {
      console.log("error ************************* sendPushNotification error ", e)
    }
    for (const o of userToken.filter(o => o.type === "WEBSOCKET")) {
      if (o.token) {
        try {
          await sendMessageToClient(o.token, event.message);
        } catch (e) {
          console.log("error *************************sendMessageToClient error ", e)
        }
      }
    }
  }
  if (event.eventType === "endTime") {
    await examLeaderBoard(event.examSCheduleUUID, event.examType);
  }
  await eventBridge
    .removeTargets({
      Ids: [event.targetId],
      Rule: event.ruleName,
      Force: true
    }).promise()

  const createRule = await ScheduledRule.findAll({
    where: {
      isDeleted: false,
    }
  })

  if (createRule.length) {
    for (const obj of createRule) {
      try {
        // const value = await eventBridge.deleteRule({
        //   Name: obj.ruleName,
        //   Force: true
        // }).promise()
        await eventBridge.deleteRule({
          Name: obj.ruleName,
          Force: true
        }).promise()
        await ScheduledRule.update({ isDeleted: true }, {
          where: {
            uuid: obj.uuid
          }
        })
        // console.log('------------------', value)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const rule = await ScheduledRule.create({
    ruleName: event.ruleName,
    eventType: event.examType,
    isDeleted: false
  })
  console.group(rule, '------------------------------')
  await instance.connection.connectionManager.close();

  return {
    body: JSON.stringify({ ok: true }),
    statusCode: 200,
  };
};