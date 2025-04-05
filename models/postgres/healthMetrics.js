const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const User = require("./user");
const Day = require("./day");

const HealthMetrics = sequelize.define(
  "health_metrics",
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
    bp: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    total_steps: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    distance_covered: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    water_intake: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: true,
    },
    total_water_taken: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    sleep_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    sleep_hours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    activity_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    activity_score_array: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: true,
    },
    food_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    food_score_array: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: true,
    },
    total_calories_burnt: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    target_calories: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    nutrition_taken: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    health_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    metabolic_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    vo2Max: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "health_metrics",
    timestamps: false,
    hooks: {
      beforeSave: (healthMetrics) => {
        // Helper function to calculate average
        const calculateAverage = (arr) =>
          Array.isArray(arr) && arr.length > 0
            ? arr.reduce((sum, num) => sum + num, 0) / arr.length
            : null;

        // Auto-calculate scores before saving
        healthMetrics.activity_score = calculateAverage(
          healthMetrics.activity_score_array
        );
        healthMetrics.food_score = calculateAverage(
          healthMetrics.food_score_array
        );

        // Calculate an overall health score
        const scores = [
          healthMetrics.sleep_score,
          healthMetrics.activity_score,
          healthMetrics.food_score,
          healthMetrics.metabolic_score,
        ].filter((score) => score !== null); // Ignore null values

        healthMetrics.health_score =
          scores.length > 0
            ? scores.reduce((sum, num) => sum + num, 0) / scores.length
            : null;
      },
    },
  }
);

module.exports = HealthMetrics;
