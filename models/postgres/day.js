const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const Month = require("./month");

const Day = sequelize.define(
  "Day",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monthId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Month,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    sleepSessionId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "SleepSessions",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    activitySessionIds: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
      allowNull: false,
    },
    foodSessionIds: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "days",
    uniqueKeys: {
      month_day_unique: {
        fields: ["monthId", "day"],
      },
    },
  }
);

module.exports = Day;
