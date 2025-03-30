const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./user");
const Day = require("./day");

const Activity = sequelize.define(
  "Activity",
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
    activity_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    source_device: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration_seconds: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calories_burned: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    distance_meters: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    steps_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    heart_rate_avg: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    heart_rate_max: {
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
    tableName: "activity_sessions",
    timestamps: false, // Disable Sequelize's automatic timestamps
  }
);

module.exports = Activity;
