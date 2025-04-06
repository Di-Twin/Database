// config/index.js (for centralizing imports)
const { connectMongoDB, connectPostgres, sequelize } = require("@dtwin/config");

// 🏗️ Import Models
const User = require("./models/postgres/user");
const UserProfile = require("./models/postgres/userProfile");
const Year = require("./models/postgres/year");
const Month = require("./models/postgres/month");
const Day = require("./models/postgres/day");
const SleepSession = require("./models/postgres/sleepSession");
const SleepStage = require("./models/postgres/sleepStage");
const ActivitySession = require("./models/postgres/activitySession");
const HealthMetrics = require("./models/postgres/healthMetrics");
const MonthlyHealthMetrics = require("./models/postgres/monthlyHealthMetrics");
const FoodSession = require("./models/postgres/foodSession");
const HeartData = require("./models/postgres/heartData");
const Medication = require("./models/postgres/medication");

// 🔗 Define Associations
const defineAssociations = () => {
  // User ↔ UserProfile
  User.hasOne(UserProfile, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  UserProfile.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  // Year ↔ Month
  Year.hasMany(Month, {
    foreignKey: "yearId",
    as: "months",
    onDelete: "CASCADE",
  });
  Month.belongsTo(Year, { foreignKey: "yearId", onDelete: "CASCADE" });

  // Month ↔ Day
  Month.hasMany(Day, {
    foreignKey: "monthId",
    as: "days",
    onDelete: "CASCADE",
  });
  Day.belongsTo(Month, { foreignKey: "monthId", onDelete: "CASCADE" });

  // Day ↔ SleepSession
  Day.hasOne(SleepSession, {
    foreignKey: "dayId",
    as: "sleepSession",
    onDelete: "CASCADE",
  });
  SleepSession.belongsTo(Day, { foreignKey: "dayId", onDelete: "CASCADE" });

  // User ↔ SleepSession
  User.hasMany(SleepSession, {
    foreignKey: "userId",
    as: "sleepSessions",
    onDelete: "CASCADE",
  });
  SleepSession.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

  // SleepSession ↔ SleepStage
  SleepSession.hasMany(SleepStage, {
    foreignKey: "sessionId",
    as: "stages",
    onDelete: "CASCADE",
  });
  SleepStage.belongsTo(SleepSession, {
    foreignKey: "sessionId",
    onDelete: "CASCADE",
  });

  // User ↔ ActivitySession
  User.hasMany(ActivitySession, {
    foreignKey: "userId",
    as: "activitySessions",
    onDelete: "CASCADE",
  });
  ActivitySession.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  // Day ↔ ActivitySession
  Day.hasMany(ActivitySession, {
    foreignKey: "dayId",
    as: "activitySessions",
    onDelete: "CASCADE",
  });
  ActivitySession.belongsTo(Day, { foreignKey: "dayId", onDelete: "CASCADE" });

  // User ↔ HealthMetrics
  User.hasMany(HealthMetrics, {
    foreignKey: "userId",
    as: "healthMetrics",
    onDelete: "CASCADE",
  });
  HealthMetrics.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  // Day ↔ HealthMetrics
  Day.hasMany(HealthMetrics, {
    foreignKey: "dayId",
    as: "healthMetrics",
    onDelete: "CASCADE",
  });
  HealthMetrics.belongsTo(Day, {
    foreignKey: "dayId",
    onDelete: "CASCADE",
  });

  // User ↔ MonthlyHealthMetrics
  User.hasMany(MonthlyHealthMetrics, {
    foreignKey: "userId",
    as: "monthlyHealthMetrics",
    onDelete: "CASCADE",
  });
  MonthlyHealthMetrics.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  // Month ↔ MonthlyHealthMetrics
  Month.hasMany(MonthlyHealthMetrics, {
    foreignKey: "monthId",
    as: "monthlyHealthMetrics",
    onDelete: "CASCADE",
  });
  MonthlyHealthMetrics.belongsTo(Month, {
    foreignKey: "monthId",
    onDelete: "CASCADE",
  });

  // User ↔ FoodSession
  User.hasMany(FoodSession, {
    foreignKey: "userId",
    as: "foodSessions",
    onDelete: "CASCADE",
  });
  FoodSession.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  // Day ↔ FoodSession
  Day.hasMany(FoodSession, {
    foreignKey: "dayId",
    as: "foodSessions",
    onDelete: "CASCADE",
  });
  FoodSession.belongsTo(Day, {
    foreignKey: "dayId",
    onDelete: "CASCADE",
  });

  // User ↔ HeartData
  User.hasMany(HeartData, {
    foreignKey: "userId",
    as: "heartData",
    onDelete: "CASCADE",
  });
  HeartData.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  // Day ↔ HeartData
  Day.hasMany(HeartData, {
    foreignKey: "dayId",
    as: "heartData",
    onDelete: "CASCADE",
  });
  HeartData.belongsTo(Day, {
    foreignKey: "dayId",
    onDelete: "CASCADE",
  });

  // UserProfile ↔ Medication
  UserProfile.hasMany(Medication, {
    foreignKey: "userId",
    as: "medicationRecords", // <-- changed alias
    onDelete: "CASCADE",
  });
  
  Medication.belongsTo(UserProfile, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
  });
  
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

module.exports = {
  sequelize,
  connectMongoDB,
  connectPostgres,
  User,
  UserProfile,
  Year,
  Month,
  Day,
  SleepSession,
  SleepStage,
  ActivitySession,
  HealthMetrics,
  MonthlyHealthMetrics,
  FoodSession,
  HeartData,
  Medication,
  syncDatabase,
};