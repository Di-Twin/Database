const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const UserProfile = require("./userProfile");

const Medication = sequelize.define(
  "Medication",
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
        model: UserProfile,
        key: "userId",
      },
      onDelete: "CASCADE",
    },
    medicationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    afterFood: {
      type: DataTypes.BOOLEAN, // true for after food, false for before food
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING, // e.g., "3 times a day", "once a week"
      allowNull: false,
    },
    timings: {
      type: DataTypes.ARRAY(DataTypes.STRING), // e.g., ["08:00 AM", "02:00 PM", "08:00 PM"]
      allowNull: true,
    },
    reminder: {
      type: DataTypes.BOOLEAN, // true for reminders, false otherwise
      allowNull: false,
    },
  },
  {
    tableName: "Medications",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Medication;