const { Sequelize } = require("sequelize");
const mongoose = require("mongoose");
require("dotenv").config();

// PostgreSQL connection
const sequelize = new Sequelize(
  "deployment", // database name
  "neondb_owner", // username
  "npg_aoBzfd25NykC", // password
  {
    host: "ep-lively-cake-a1tf47n7-pooler.ap-southeast-1.aws.neon.tech",
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

// MongoDB connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

// Test the PostgreSQL connection
const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the PostgreSQL database:", error);
  }
};

// Import models (updated to lowercase plural names)
const users = require("./models/postgres/user");
const userProfiles = require("./models/postgres/userProfile");
const years = require("./models/postgres/year");
const months = require("./models/postgres/month");
const days = require("./models/postgres/day");
const sleepSessions = require("./models/postgres/sleepSession");
const sleepStages = require("./models/postgres/sleepStage");
const activitySessions = require("./models/postgres/activitySession");
const healthMetrics = require("./models/postgres/healthMetrics");
const monthlyHealthMetrics = require("./models/postgres/monthlyHealthMetrics");
const foodSessions = require("./models/postgres/foodSession");
const foodItems = require("./models/postgres/foodItem");
const heartData = require("./models/postgres/heartData");
const medications = require("./models/postgres/medication");
const hrvData = require("./models/postgres/hrvData");
const feedbacks = require("./models/postgres/feedback");
const dietPlans = require("./models/postgres/dietPlan");
const exercisePlans = require("./models/postgres/exercisePlan");
const User = require("./models/postgres/user");

// Define associations
const defineAssociations = () => {
  users.hasOne(userProfiles, {
    foreignKey: "userId",
    as: "profile",
    onDelete: "CASCADE",
  });
  userProfiles.belongsTo(users, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  users.hasMany(years, { foreignKey: "userId", as: "years", onDelete: "CASCADE" });
  years.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" });

  years.hasMany(months, { foreignKey: "yearId", as: "months", onDelete: "CASCADE" });
  months.belongsTo(years, { foreignKey: "yearId", onDelete: "CASCADE" });

  months.hasMany(days, { foreignKey: "monthId", as: "days", onDelete: "CASCADE" });
  days.belongsTo(months, { foreignKey: "monthId", onDelete: "CASCADE" });

  users.hasMany(sleepSessions, { foreignKey: "userId", as: "sleepSessions", onDelete: "CASCADE" });
  sleepSessions.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" });

  sleepSessions.hasMany(sleepStages, { foreignKey: "sleepSessionId", as: "sleepStages", onDelete: "CASCADE" });
  sleepStages.belongsTo(sleepSessions, { foreignKey: "sleepSessionId", onDelete: "CASCADE" });

  users.hasMany(activitySessions, { foreignKey: "userId", as: "activitySessions", onDelete: "CASCADE" });
  activitySessions.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" });

  days.hasOne(healthMetrics, { foreignKey: "dayId", as: "healthMetrics", onDelete: "CASCADE" });
  healthMetrics.belongsTo(days, { foreignKey: "dayId", onDelete: "CASCADE" });

  months.hasOne(monthlyHealthMetrics, { foreignKey: "monthId", as: "monthlyHealthMetrics", onDelete: "CASCADE" });
  monthlyHealthMetrics.belongsTo(months, { foreignKey: "monthId", onDelete: "CASCADE" });

  users.hasMany(foodSessions, { foreignKey: "userId", as: "foodSessions", onDelete: "CASCADE" });
  foodSessions.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" });

  foodSessions.hasMany(foodItems, { foreignKey: "foodSessionId", as: "foodItems", onDelete: "CASCADE" });
  foodItems.belongsTo(foodSessions, { foreignKey: "foodSessionId", onDelete: "CASCADE" });

  users.hasMany(heartData, { foreignKey: "userId", as: "heartData", onDelete: "CASCADE" });
  heartData.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" });

  users.hasMany(medications, { foreignKey: "userId", as: "medications", onDelete: "CASCADE" });
  medications.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" });

  users.hasMany(hrvData, { foreignKey: "userId", as: "hrvData", onDelete: "CASCADE" });
  hrvData.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" });

  days.hasMany(hrvData, { foreignKey: "dayId", as: "hrvData", onDelete: "CASCADE" });
  hrvData.belongsTo(days, { foreignKey: "dayId", onDelete: "CASCADE" });
};

// Sync the database
const syncDatabase = async (alter = false) => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Error syncing the database:", error);
  }
};

defineAssociations();

module.exports = {
  sequelize,
  connectMongoDB,
  connectPostgres,
  User: users,
  UserProfile: userProfiles,
  Year: years,
  Month: months,
  Day: days,
  SleepSession: sleepSessions,
  SleepStage: sleepStages,
  ActivitySession: activitySessions,
  HealthMetric: healthMetrics,
  MonthlyHealthMetric: monthlyHealthMetrics,
  FoodSession: foodSessions,
  FoodItem: foodItems,
  HeartData: heartData,
  Medication: medications,
  HrvData: hrvData,
  Feedback: feedbacks,
  DietPlan: dietPlans,
  ExercisePlan: exercisePlans,
  syncDatabase,
};
