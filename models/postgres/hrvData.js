const { DataTypes } = require("sequelize")
const { sequelize } = require("@dtwin/config")
const User = require("./user")
const Day = require("./day")

const HrvData = sequelize.define(
  "hrv_data",
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hrv_minutes: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: "HRV data stored as JSON with time and values (rmssd, coverage, hf, lf)",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "hrv_data",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        unique: true,
        fields: ["userId", "dayId", "date"],
      },
    ],
  },
)

module.exports = HrvData
