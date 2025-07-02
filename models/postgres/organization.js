const { DataTypes } = require("sequelize")
const { sequelize } = require("@dtwin/config")

const Organization = sequelize.define(
  "organizations",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
      comment: "Organization address details",
    },
    contact_info: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
      comment: "Phone, email, website etc.",
    },
    subscription_plan: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "basic",
    },
    subscription_status: {
      type: DataTypes.ENUM("active", "inactive", "suspended", "trial"),
      allowNull: false,
      defaultValue: "trial",
    },
    subscription_expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    settings: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
      comment: "Organization-specific settings and preferences",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "organizations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
)

module.exports = Organization
