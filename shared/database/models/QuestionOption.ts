import { DataTypes, Model, Sequelize } from "sequelize";
import { makeModelOptions } from "../../helpers/makeModelOptions";

class QuestionOption extends Model {
  public uuid: string;
  public questionUUID: string;
  public key: string;
  public image: string;
  public text: string;
  public isCorrect: boolean;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}
export function init(sequelize: Sequelize) {
  QuestionOption.init(
    {
      uuid: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      questionUUID: {
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
        type: DataTypes.STRING(500),
      },
      isCorrect: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    makeModelOptions(sequelize, "question_option")
  );
}
export default QuestionOption;
