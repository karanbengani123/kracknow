import { v4 as uuidv4 } from 'uuid'; 
import {
  BattleParticipation,
  Wallet,
  WalletTransaction,
  Exam,
  Student,
} from '../../../../shared/database/models'

import { HttpBadRequest } from '../../../../shared/exceptions/HttpBadRequest';
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound';
import { NOT_ENOUGH_MONEY } from '../../../../shared/constants/httpErrorMessages';
import { SUCCESSFUL } from '../../../../shared/constants/httpSuccessMessages';
import { OUTBOUND, SUCCESS } from '../../../../shared/constants/message';
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams';
import { IRegisterBattle } from '../interfaces/IRegisterBattle';
import { Op } from 'sequelize';

export const registerBattle = async (params: IControllerParams<IRegisterBattle>) => {
  const { battleUUID } = params.input;
  const studentUUID = params.user.id;

  // try {
    // Find the battle
    const battle = await Exam.findOne({ where: { uuid: battleUUID } });
    if (!battle) {
      throw new HttpNotFound('Battle not found');
    }

    // Check wallet balance
    const wallet = await Wallet.findOne({ where: { studentUUID } });
    if (!wallet || wallet.balance < battle.joinFee) {
      throw new HttpNotFound(NOT_ENOUGH_MONEY);
    }

    // Check if the student is already registered
    const existingParticipation = await BattleParticipation.findOne({ 
      where: { battleUUID, studentUUID } 
    });

    // If the student is not registered
    if (!existingParticipation) {
      // Check participation limit
      const currentParticipationCount = await BattleParticipation.count({ where: { battleUUID } });
      if (currentParticipationCount >= battle.studentLimit) {
        throw new HttpBadRequest('All seats are filled. Please try again later.');
      }

      // Deduct fee from wallet
      wallet.balance -= battle.joinFee;
      await wallet.save();

      // Create wallet transaction record
      await WalletTransaction.create({
        walletUUID: wallet.uuid,
        battleUUID,
        amount: battle.joinFee,
        type: OUTBOUND,
        status: SUCCESS,
        paymentDate: new Date(),
      });

      // Register the participant
      const participationRecord = await BattleParticipation.create({
        uuid: uuidv4(),
        battleUUID,
        studentUUID,
        join_time: new Date(),
        status: 'Registered',
      });

      // Check for an opponent
      const opponent = await BattleParticipation.findOne({
        where: { battleUUID, studentUUID: { [Op.ne]: studentUUID }, status: 'Registered' },
        order: [['join_time', 'ASC']],
      });

      if (opponent) {
        // Update both participants to "Playing"
        await participationRecord.update({ status: 'Playing' });
        await opponent.update({ status: 'Playing' });

        return {
          message: SUCCESSFUL,
          payload: {
            response: participationRecord,
            opponent: {
              uuid: opponent.studentUUID,
              join_time: opponent.join_time,
              status: opponent.status,
            },
          },
        };
      } else {
        // No opponent found, remain registered
        return {
          message: 'You are registered and waiting for an opponent to join.',
          payload: {
            response: participationRecord,
            opponent: null,
          },
        };
      }
    } else {
      // If the student is already registered, update their status if there is an opponent
      if (existingParticipation.status === 'Registered') {
        const opponent = await BattleParticipation.findOne({
          where: { battleUUID, studentUUID: { [Op.ne]: studentUUID }, status: 'Registered' },
        });

        if (opponent) {
          // Update both to "Playing"
          await existingParticipation.update({ status: 'Playing' });
          await opponent.update({ status: 'Playing' });

          return {
            message: SUCCESSFUL,
            payload: {
              response: existingParticipation,
              opponent: {
                uuid: opponent.studentUUID,
                join_time: opponent.join_time,
                status: opponent.status,
              },
            },
          };
        }
      }

      return {
        message: 'You are already registered.',
      };
    }
  
};

export const getOpponentBattle = async (params: IControllerParams<{ battleUUID: string }>) => {
  const { battleUUID } = params.input; // Get battleUUID from input
  const studentUUID = params.user.id; // Assuming user ID is available in params

  try {
    // Find the battle
    const battle = await Exam.findOne({ where: { uuid: battleUUID } });
    if (!battle) {
      throw new HttpNotFound('Battle not found');
    }

    // Find the current user's participation
    const participation = await BattleParticipation.findOne({
      where: { battleUUID, studentUUID }
    });

    if (!participation || participation.status !== 'Playing') {
      return {
        message: 'You are not currently in a battle or not playing.',
        opponent: null // Include opponent as null if not playing
      };
    }

    // Find the opponent's participation
    const opponent = await BattleParticipation.findOne({
      where: {
        battleUUID,
        studentUUID: { [Op.ne]: studentUUID }, // Exclude current user
        status: 'Playing'
      }
    });

    if (!opponent) {
      return {
        message: 'Opponent not found.',
        opponent: null // Include opponent as null if not found
      };
    }

    const opponentDetails = await Student.findOne({
      where: { uuid: opponent.studentUUID }
    });

    return {
      message: 'Opponent found.',
      payload: {
        
          uuid: opponent.studentUUID,
          firstName: opponentDetails ? opponentDetails.firstName : null, // Add first name
          join_time: opponent.join_time,
          status: opponent.status,
      
      },
    };
  } catch (error) {
    console.error('Error fetching opponent:', error);
    throw new HttpBadRequest('An error occurred while fetching the opponent.');
  }
};



