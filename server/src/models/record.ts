import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user"; 

interface RecordAttributes {
  id?: number;
  album: string;
  artist: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class Record extends Model<RecordAttributes> implements RecordAttributes {
  public id?: number;
  public album!: string;
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
    album: {
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
