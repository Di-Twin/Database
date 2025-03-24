const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const Year = require("./year");

const Month = sequelize.define(
  "Month",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    yearId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Year,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: false,
    tableName: "months",
    uniqueKeys: {
      year_month_unique: {
        fields: ["yearId", "month"],
      },
    },
  }
);

module.exports = Month;
