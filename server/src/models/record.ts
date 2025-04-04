import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class Record extends Model {
  public id!: number;
  public title!: string;
  public artist!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
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
  },
  {
    sequelize,
    tableName: "records",
    timestamps: true,
  }
);

export default Record;
