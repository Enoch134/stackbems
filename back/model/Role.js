import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./User.js";
const { DataTypes } = Sequelize;

const Role = db.define(
  "role",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    business_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
User.hasMany(Role);
Role.belongsTo(User, { foreignKey: "userId", as: "user" });


export default Role;