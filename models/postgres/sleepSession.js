const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const User = require("./user");
const Day = require("./day");

const SleepSession = sequelize.define(
  "SleepSession",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    dateOfSleep: {
      type: DataTypes.DATEONLY,
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
    sourceDevice: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    durationSeconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    efficiencyScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    isMainSleep: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    infoCode: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    externalLogId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    minutesAfterWakeup: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    minutesAsleep: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minutesAwake: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minutesToFallAsleep: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    logType: {
      type: DataTypes.ENUM("auto_detected", "manual"),
      defaultValue: "auto_detected",
      allowNull: false,
    },
    timeInBed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("classic", "stages"),
      defaultValue: "stages",
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "sleep_sessions",
  }
);

module.exports = SleepSession;
