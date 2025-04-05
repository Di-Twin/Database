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
    foodTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    foodName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foodImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    protein: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    carbohydrates: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    fats: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    fiber: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    sugar: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    sodium: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gi: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    gl: {
      type: DataTypes.FLOAT,
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
