const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const User = require("./user");
const Day = require("./day");

const Activity = sequelize.define(
  "Activity",
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
    activity_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activity_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activity_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    source_device: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration_seconds: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    active_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Active duration in milliseconds",
    },
    calories_burned: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    distance_meters: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    steps_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    heart_rate_avg: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    heart_rate_max: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    heart_rate_zones: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: "JSON containing heart rate zones data",
    },
    active_zone_minutes: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: "JSON containing active zone minutes data",
    },
    activity_levels: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: "JSON containing activity levels data",
    },
    elevation_gain: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    pace: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    speed: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    log_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    log_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    source: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: "JSON containing source information",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    last_modified: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "activity_sessions",
    timestamps: false, // Disable Sequelize's automatic timestamps
  }
);

module.exports = Activity;
