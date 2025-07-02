const { DataTypes } = require("sequelize")
const { sequelize } = require("@dtwin/config")
const PlanVersion = require("./planVersion")
const User = require("./user")
const Nutritionist = require("./nutritionist")

const PlanAssignment = sequelize.define(
  "planAssignments",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    planVersionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: PlanVersion,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
      onDelete: "CASCADE",
    },
    assignedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Nutritionist,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Calculated based on plan duration or manually set",
    },
    status: {
      type: DataTypes.ENUM("active", "paused", "completed", "cancelled"),
      allowNull: false,
      defaultValue: "active",
    },
    custom_parameters: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
      comment: "Client-specific customizations to the plan",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Assignment notes from nutritionist",
    },
    progress_data: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
      comment: "Cached progress metrics for quick access",
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "plan_assignments",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
)

module.exports = PlanAssignment
