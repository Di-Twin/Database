const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const User = require("./userProfile");

const Medication = sequelize.define(
  "medications",
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
    medicationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    afterFood: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timings: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    reminder: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    dose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
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