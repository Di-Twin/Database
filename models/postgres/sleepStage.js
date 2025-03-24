const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const SleepSession = require("./sleepSession");
const User = require("./user");

const SleepStage = sequelize.define(
  "SleepStage",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: SleepSession,
        key: "id",
      },
      onDelete: "CASCADE",
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
    stageType: {
      type: DataTypes.ENUM("DEEP", "LIGHT", "REM", "AWAKE"),
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    durationSeconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "sleep_stages",
  }
);

module.exports = SleepStage;
