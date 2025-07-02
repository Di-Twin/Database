const { DataTypes } = require("sequelize")
const { sequelize } = require("@dtwin/config")
const Nutritionist = require("./nutritionist")
const Organization = require("./organization")

const PlanDefinition = sequelize.define(
  "planDefinitions",
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
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Nutritionist,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("meal", "exercise", "combined", "custom"),
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
      comment: "Tags for categorization (diabetes, weight-loss, etc.)",
    },
    duration_days: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Default duration in days",
    },
    schedule_pattern: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
      comment: "Default scheduling rules and patterns",
    },
    conditional_rules: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
      comment: "Rules for conditional plan execution",
    },
    template_data: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
      comment: "Core plan template structure",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Whether this plan can be shared across organizations",
    },
  },
  {
    tableName: "plan_definitions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
)

module.exports = PlanDefinition
