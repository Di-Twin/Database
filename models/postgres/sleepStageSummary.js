const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const SleepSession = require("./sleepSession");
const User = require("./user");

const SleepStageSummary = sequelize.define(
  "SleepStageSummary",
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
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thirtyDayAvgMinutes: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "sleep_stage_summaries",
  }
);

module.exports = SleepStageSummary; 