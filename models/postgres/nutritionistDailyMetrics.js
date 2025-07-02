const { DataTypes } = require("sequelize")
const { sequelize } = require("@dtwin/config")
const Nutritionist = require("./nutritionist")

const NutritionistDailyMetrics = sequelize.define(
  "nutritionistDailyMetrics",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nutritionistId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Nutritionist,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    total_clients: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    active_clients: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    total_plans_assigned: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    active_plan_assignments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    client_interactions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "Messages, plan updates, feedback given",
    },
    avg_client_adherence: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Average adherence rate across all clients",
    },
    avg_client_health_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    plans_created: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    plans_modified: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    documents_uploaded: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    referral_codes_generated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    referral_codes_used: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "nutritionist_daily_metrics",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        unique: true,
        fields: ["nutritionistId", "date"],
      },
      {
        fields: ["date"],
      },
    ],
  },
)

module.exports = NutritionistDailyMetrics
