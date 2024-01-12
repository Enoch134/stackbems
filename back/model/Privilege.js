import { Sequelize } from "sequelize";
import Role from "./Role.js";
import db from "../config/Database.js";
const {DataTypes} = Sequelize

const Privilege = db.define(
  "privilege",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    roleId: {
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
Role.hasMany(Privilege);
Privilege.belongsTo(Role, { foreignKey: "roleId", as: "role" });

export default Privilege