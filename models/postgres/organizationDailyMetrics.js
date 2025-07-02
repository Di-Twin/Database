const { DataTypes } = require("sequelize")
const { sequelize } = require("@dtwin/config")
const Organization = require("./organization")

const OrganizationDailyMetrics = sequelize.define(
  "organizationDailyMetrics",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Organization,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    total_nutritionists: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    active_nutritionists: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    new_clients: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    total_plan_assignments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    active_plan_assignments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    avg_client_adherence: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    avg_client_health_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    total_interactions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "Total client-nutritionist interactions",
    },
    plans_created: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    documents_uploaded: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    subscription_revenue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: "Daily subscription revenue",
    },
  },
  {
    tableName: "organization_daily_metrics",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        unique: true,
        fields: ["organizationId", "date"],
      },
      {
        fields: ["date"],
      },
    ],
  },
)

module.exports = OrganizationDailyMetrics
