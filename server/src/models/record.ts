import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/config.js";
import User from "./user.js"; // 👈 Required for association

interface RecordAttributes {
  id: number;
  title: string;
  artist: string;
  userId: number;
}

interface RecordCreationAttributes extends Optional<RecordAttributes, "id"> {}

class Record extends Model<RecordAttributes, RecordCreationAttributes> implements RecordAttributes {
  public id!: number;
  public title!: string;
  public artist!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Record.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Record",
  }
);

// Add association
Record.belongsTo(User, { foreignKey: "userId" });

export default Record;
