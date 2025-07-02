const { DataTypes } = require("sequelize")
const { sequelize } = require("@dtwin/config")
const Nutritionist = require("./nutritionist")
const User = require("./user")

const ReferralCode = sequelize.define(
  "referralCodes",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: "Unique referral code (e.g., XYZ123)",
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
    clientId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: User,
        key: "userId",
      },
      onDelete: "SET NULL",
      comment: "Set when code is used by a client",
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Optional expiration date for the referral code",
    },
    used_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Timestamp when the code was claimed",
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
      comment: "Additional data like client notes, source campaign, etc.",
    },
  },
  {
    tableName: "referral_codes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
)

module.exports = ReferralCode
