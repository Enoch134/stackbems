import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";
import Business from "./Business.js";


const { DataTypes } = Sequelize;

const Sale = db.define(
  "sale",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    selected_items: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    sub_total: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    tax: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    },
    discount: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    },
    payment_receive: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    charges_description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    shipping: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    },
    balance: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    },
    ground_total: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    customer_phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    businessId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
      business_name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    Active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notEmpty: true
      }
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true
      }
    },
    CreatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    },

    UpdatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    },
    DeletedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    },
    DateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
      validate: {
        notEmpty: true
      }
    },
    DateUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    },
    DateDeleted: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        notEmpty: false
      }
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
Business.hasMany(Sale);
Sale.belongsTo(Business, { foreignKey: "businessId", as: "business" });
export default Sale;
