const { DataTypes } = require("sequelize")
const { sequelize } = require("@dtwin/config")
const User = require("./user")

const UserDailyMetrics = sequelize.define(
  "userDailyMetrics",
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sleep_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    sleep_hours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    activity_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    activity_minutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calories_consumed: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    calories_burned: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    steps_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    water_intake: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    heart_rate_avg: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    heart_rate_resting: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    hrv_avg: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    plan_adherence_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Overall adherence to assigned plans",
    },
    completed_plan_entries: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    total_plan_entries: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    health_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    processed_log_ids: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
      defaultValue: [],
      comment: "Track processed logs to avoid duplicates",
    },
  },
  {
    tableName: "user_daily_metrics",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        unique: true,
        fields: ["userId", "date"],
      },
      {
        fields: ["date"],
      },
    ],
  },
)

module.exports = UserDailyMetrics
