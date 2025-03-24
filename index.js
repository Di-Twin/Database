// config/index.js (for centralizing imports)
const { connectMongoDB, connectPostgres, sequelize } = require("@dtwin/config");

// 🏗️ Import Models
const User = require("../models/postgres/user");
const UserProfile = require("../models/postgres/userProfile");
const Year = require("../models/postgres/year");
const Month = require("../models/postgres/month");
const Day = require("../models/postgres/day");
const SleepSession = require("../models/postgres/sleepSession");
const SleepStage = require("../models/postgres/sleepStage");

// 🔗 Define Associations
const defineAssociations = () => {
  // User ↔ UserProfile
  User.hasOne(UserProfile, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });
  UserProfile.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

  // Year ↔ Month
  Year.hasMany(Month, { foreignKey: "yearId", as: "months", onDelete: "CASCADE" });
  Month.belongsTo(Year, { foreignKey: "yearId", onDelete: "CASCADE" });

  // Month ↔ Day
  Month.hasMany(Day, { foreignKey: "monthId", as: "days", onDelete: "CASCADE" });
  Day.belongsTo(Month, { foreignKey: "monthId", onDelete: "CASCADE" });

  // Day ↔ SleepSession
  Day.hasOne(SleepSession, { foreignKey: "dayId", as: "sleepSession", onDelete: "CASCADE" });
  SleepSession.belongsTo(Day, { foreignKey: "dayId", onDelete: "CASCADE" });

  // User ↔ SleepSession
  User.hasMany(SleepSession, { foreignKey: "userId", as: "sleepSessions", onDelete: "CASCADE" });
  SleepSession.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

  // SleepSession ↔ SleepStage
  SleepSession.hasMany(SleepStage, { foreignKey: "sessionId", as: "stages", onDelete: "CASCADE" });
  SleepStage.belongsTo(SleepSession, { foreignKey: "sessionId", onDelete: "CASCADE" });
};

// Sync DB
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    defineAssociations();
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully!");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
};
syncDatabase();

module.exports = { sequelize, connectMongoDB, connectPostgres, User, UserProfile, Year, Month, Day, SleepSession, SleepStage };
