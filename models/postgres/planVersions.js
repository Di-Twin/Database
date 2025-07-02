const { DataTypes } = require("sequelize")
const { sequelize } = require("@dtwin/config")
const PlanDefinition = require("./planDefinition")
const Nutritionist = require("./nutritionist")

const PlanVersion = sequelize.define(
  "planVersions",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    planDefinitionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: PlanDefinition,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    version_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Incremental version number",
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
    },
    duration_days: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    schedule_pattern: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
    conditional_rules: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
    template_data: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
      comment: "Immutable snapshot of plan data at this version",
    },
    change_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Notes about what changed in this version",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "plan_versions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        unique: true,
        fields: ["planDefinitionId", "version_number"],
      },
    ],
  },
)

module.exports = PlanVersion
