const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const User = require("./user");
const Day = require("./day");

const HealthMetrics = sequelize.define(
  "HealthMetrics",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
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
    blood_pressure: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Stores an array of BP readings
      allowNull: true,
    },
    bp_max: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    bp_avg: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    total_steps: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    water_intake: {
      type: DataTypes.ARRAY(DataTypes.FLOAT), // Stores an array of water intake amounts
      allowNull: true,
    },
    total_water_taken: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    sleep_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    activity_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    food_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    total_calories_burnt: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    nutrition_taken: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Stores an array of nutrition-related data
      allowNull: true,
    },
    health_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "health_metrics",
    timestamps: false, // Disable Sequelize's automatic timestamps
  }
);

module.exports = HealthMetrics;
