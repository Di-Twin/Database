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
