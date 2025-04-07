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
    logType: {
      type: DataTypes.ENUM("auto_detected", "manual"),
      defaultValue: "auto_detected",
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
