import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class TournamentExamParticipationQuestionOption extends Model {
  public uuid?: string;
  public tournamentExamParticipationQuestionUUID: string;
  public key: string;
  public image: string;
  public text: string;
  public correctAnswer: boolean;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  TournamentExamParticipationQuestionOption.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      tournamentExamParticipationQuestionUUID: {
        allowNull: false,
        type: DataTypes.UUID,
      },

      key: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      image: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      text: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      correctAnswer: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    makeModelOptions(
      sequelize,
      "tournament_exam_participation_question_options"
    )
  );
}
export default TournamentExamParticipationQuestionOption;
