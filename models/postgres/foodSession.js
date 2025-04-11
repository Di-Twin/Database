const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const User = require("./user");
const Day = require("./day");

const FoodSession = sequelize.define(
  "FoodSession",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
      onDelete: "CASCADE",
    },
    dayId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Day,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    sessionTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalCalories: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    totalProtein: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    totalCarbs: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    totalFats: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "food_sessions",
  }
);

module.exports = FoodSession;