const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const User = require("./user");

const UserProfile = sequelize.define(
  "UserProfile",
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'userId',
      },
      primaryKey: true,
    },
    medical_conditions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
      defaultValue: [],
    },
    medications: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
      defaultValue: [],
    },
    height_cm: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    weight_kg: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    family_history: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
    lifestyle_factors: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
    health_goals: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    age: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    health_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    target_calories: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    total_calories_burned_today: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "UserProfile",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = UserProfile;
