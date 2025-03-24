const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");

const Year = sequelize.define("Year", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: false, // No need for createdAt/updatedAt here
  tableName: "years",
});

module.exports = Year;
