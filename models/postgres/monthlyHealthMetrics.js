const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const User = require("./user");
const Month = require("./month");

const MonthlyHealthMetrics = sequelize.define(
  "MonthlyHealthMetrics",
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
    monthId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Month,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    monthly_health_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    monthly_sleep_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    monthly_activity_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    monthly_activity_data: {
      type: DataTypes.JSONB, // Stores detailed activity data as JSON
      allowNull: true,
    },
    monthly_food_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    monthly_food_intake_data: {
      type: DataTypes.JSONB, // Stores detailed food intake data as JSON
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "monthly_health_metrics",
    timestamps: false, // Disable Sequelize's automatic timestamps
  }
);


module.exports = MonthlyHealthMetrics;