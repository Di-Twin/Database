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

// Import models
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
const FoodItem = require("./models/postgres/foodItem");
const HeartData = require("./models/postgres/heartData");
const Medication = require("./models/postgres/medication");
const HrvData = require("./models/postgres/hrvData");
const Feedback = require("./models/postgres/feedback");
const DietPlan = require("./models/postgres/dietPlan");
const ExercisePlan = require("./models/postgres/exercisePlan");

// Define associations
const defineAssociations = () => {
  // User ↔ UserProfile (one-to-one)
  User.hasOne(UserProfile, {
    foreignKey: "userId",
    as: "profile",
    onDelete: "CASCADE",
  });
  UserProfile.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  // User ↔ Year (one-to-many)
  User.hasMany(Year, {
    foreignKey: "userId",
    as: "years",
    onDelete: "CASCADE",
  });
  Year.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  // Year ↔ Month (one-to-many)
  Year.hasMany(Month, {
    foreignKey: "yearId",
    as: "months",
    onDelete: "CASCADE",
  });
  Month.belongsTo(Year, {
    foreignKey: "yearId",
    onDelete: "CASCADE",
  });

  // Month ↔ Day (one-to-many)
  Month.hasMany(Day, {
    foreignKey: "monthId",
    as: "days",
    onDelete: "CASCADE",
  });
  Day.belongsTo(Month, {
    foreignKey: "monthId",
    onDelete: "CASCADE",
  });

  // User ↔ SleepSession (one-to-many)
  User.hasMany(SleepSession, {
    foreignKey: "userId",
    as: "sleepSessions",
    onDelete: "CASCADE",
  });
  SleepSession.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  // SleepSession ↔ SleepStage (one-to-many)
  SleepSession.hasMany(SleepStage, {
    foreignKey: "sleepSessionId",
    as: "sleepStages",
    onDelete: "CASCADE",
  });
  SleepStage.belongsTo(SleepSession, {
    foreignKey: "sleepSessionId",
    onDelete: "CASCADE",
  });

  // User ↔ ActivitySession (one-to-many)
  User.hasMany(ActivitySession, {
    foreignKey: "userId",
    as: "activitySessions",
    onDelete: "CASCADE",
  });
  ActivitySession.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  // Day ↔ HealthMetrics (one-to-one)
  Day.hasOne(HealthMetrics, {
    foreignKey: "dayId",
    as: "healthMetrics",
    onDelete: "CASCADE",
  });
  HealthMetrics.belongsTo(Day, {
    foreignKey: "dayId",
    onDelete: "CASCADE",
  });

  // Month ↔ MonthlyHealthMetrics (one-to-one)
  Month.hasOne(MonthlyHealthMetrics, {
    foreignKey: "monthId",
    as: "monthlyHealthMetrics",
    onDelete: "CASCADE",
  });
  MonthlyHealthMetrics.belongsTo(Month, {
    foreignKey: "monthId",
    onDelete: "CASCADE",
  });

  // User ↔ FoodSession (one-to-many)
  User.hasMany(FoodSession, {
    foreignKey: "userId",
    as: "foodSessions",
    onDelete: "CASCADE",
  });
  FoodSession.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  // FoodSession ↔ FoodItem (one-to-many)
  FoodSession.hasMany(FoodItem, {
    foreignKey: "foodSessionId",
    as: "foodItems",
    onDelete: "CASCADE",
  });
  FoodItem.belongsTo(FoodSession, {
    foreignKey: "foodSessionId",
    onDelete: "CASCADE",
  });

  // User ↔ HeartData (one-to-many)
  User.hasMany(HeartData, {
    foreignKey: "userId",
    as: "heartData",
    onDelete: "CASCADE",
  });
  HeartData.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  // User ↔ Medication (one-to-many)
  User.hasMany(Medication, {
    foreignKey: "userId",
    as: "medications",
    onDelete: "CASCADE",
  });
  Medication.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  // User ↔ HrvData
  User.hasMany(HrvData, {
    foreignKey: "userId",
    as: "hrvData",
    onDelete: "CASCADE",
  });
  HrvData.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  // Day ↔ HrvData
  Day.hasMany(HrvData, {
    foreignKey: "dayId",
    as: "hrvData",
    onDelete: "CASCADE",
  });
  HrvData.belongsTo(Day, {
    foreignKey: "dayId",
    onDelete: "CASCADE",
  });
};

// Sync the database
const syncDatabase = async (alter = false) => {
  try {
    await sequelize.sync({ alter: alter });
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
  FoodItem,
  HeartData,
  Medication,
  HrvData,
  syncDatabase,
  Feedback,
  DietPlan,
  ExercisePlan,
};
