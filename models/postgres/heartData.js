const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const User = require("./user");
const Day = require("./day");

const HealthMetrics = sequelize.define("heart_data", {
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
  resting_heart_rate: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  min_heart_rate: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  max_heart_rate: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  heart_rate_data: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  heart_rate_zones: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = HealthMetrics;
