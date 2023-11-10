import {  Wallet, WalletTransaction } from '../../../../shared/database/models';

// Import Sequelize and other necessary modules for seeding
import { Sequelize } from 'sequelize';


export const seedWalletTrans = async () => {
    const sequelize = new Sequelize('kracknow-test', 'root', 'Chirag@123', {
      host: 'localhost',
      dialect: 'mysql', // or 'postgres', 'sqlite', etc.
    });
  
    try {
       await Wallet.bulkCreate([
        {
            createdAt: '2022-03-28 17:00:00',
            updatedAt: '2022-03-28 18:20:47',
            uuid: '9ddecdfc-88eb-4f04-85ae-63e4fc2cc324',
            studentUUID: '85ab6121-dbb9-411a-a397-9a4f1b9e4077',
            balance: '300',
          },
       ]), 

      await WalletTransaction.bulkCreate([
        {
          createdAt: '2022-03-28 17:00:00',
          updatedAt: '2022-03-28 18:20:47',
          uuid: 'f49028d0-4787-496e-a92f-f587a680d87b',
          walletUUID: '9ddecdfc-88eb-4f04-85ae-63e4fc2cc324',
          type: 'BANK',
          amount: 300,
          status: 'PENDING',
          transferMode: 'BANK',
        },
      ]);
  
      console.log('Seeding complete');
    } catch (error) {
      console.log('er',error)
    } finally {
      // Close the database connection.
      await sequelize.close();
    }
  };
  