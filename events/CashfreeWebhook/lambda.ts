import { createHmac } from "crypto";
import { SUCCESSFUL } from "../../shared/constants/httpSuccessMessages";
import { Wallet, WalletTransaction } from "../../shared/database/models";
import { instance, loadDatabase } from "../../shared/database/sequelize";
import { init } from "../../shared/database/models";

/**
 * @param event
 */
export const handler = async (event: any) => {
  if (!instance.connection) {
    // console.log("No connection exists");
    instance.connection = await loadDatabase();
  } else {
    // console.log("Connection exists");
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
  if (
    !(
      event.headers["x-webhook-timestamp"] &&
      event.body &&
      event.headers["x-webhook-signature"]
    )
  ) {
    await instance.connection.connectionManager.close();
    return {
      body: JSON.stringify({
        message: "timestamp, signature, body any of missing",
      }),
      statusCode: 200,
    };
  }
  const signature = createHmac("sha256", process.env.CASHFREE_CLIENT_PG_SECRET)
    .update(event.headers["x-webhook-timestamp"].concat(event.body))
    .digest("base64");

  if (signature !== event.headers["x-webhook-signature"]) {
    await instance.connection.connectionManager.close();
    return {
      body: JSON.stringify({ message: "Signature does not match" }),
      statusCode: 200,
    };
  }
  const data = JSON.parse(event.body).data;

  const amount = data.payment.payment_amount;
  const orderId = data.order.order_id;

  const walletTransaction = await WalletTransaction.findOne({
    where: {
      orderId,
    },
  });

  if (!walletTransaction) {
    await instance.connection.connectionManager.close();
    return {
      body: JSON.stringify({ message: "Transaction does not exist" }),
      statusCode: 200,
    };
  }

  await walletTransaction.update({
    status: data.payment.payment_status,
    statusMsg: data.payment_message,
    orderId,
    amount,
  });

  if (data.payment.payment_status === "SUCCESS") {
    const wallet = await Wallet.findByPk(walletTransaction.walletUUID);
    await wallet.update({
      balance: wallet.balance + amount,
    });
  }
  await instance.connection.connectionManager.close();
  return {
    body: JSON.stringify({ message: SUCCESSFUL }),
    statusCode: 200,
  };
};
