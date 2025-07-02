const { DataTypes } = require("sequelize")
const { sequelize } = require("@dtwin/config")
const User = require("./user")
const Nutritionist = require("./nutritionist")

const Notification = sequelize.define(
  "notifications",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    recipient_type: {
      type: DataTypes.ENUM("client", "nutritionist"),
      allowNull: false,
    },
    recipient_id: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "Either User.userId or Nutritionist.id based on recipient_type",
    },
    sender_type: {
      type: DataTypes.ENUM("system", "nutritionist", "client"),
      allowNull: false,
      defaultValue: "system",
    },
    sender_id: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "ID of sender if not system-generated",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Notification type (plan_assigned, reminder, alert, etc.)",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
      comment: "Additional data like plan_id, entry_id, etc.",
    },
    priority: {
      type: DataTypes.ENUM("low", "normal", "high", "urgent"),
      allowNull: false,
      defaultValue: "normal",
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    read_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fcm_sent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    fcm_sent_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Optional expiration for time-sensitive notifications",
    },
  },
  {
    tableName: "notifications",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        fields: ["recipient_type", "recipient_id", "is_read"],
      },
      {
        fields: ["created_at"],
      },
    ],
  },
)

module.exports = Notification
