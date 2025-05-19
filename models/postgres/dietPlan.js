// models/postgres/dietPlan.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const User = require("./user");
const Day = require("./day");

const DietPlan = sequelize.define(
  "DietPlan",
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Date of the plan (for easy cleanup of old records)",
    },
    meals: {
      type: DataTypes.JSONB,
      allowNull: false,
      comment: "Structured meal plan (breakfast/lunch/dinner) with scores",
    },
  },
  {
    tableName: "diet_plans",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

// Associations (added to index.js)
module.exports = DietPlan;