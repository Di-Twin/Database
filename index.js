const { sequelize, connectMongoDB, connectPostgres } = require("@dtwin/config")

// Import models (updated to lowercase plural names)
const users = require("./models/postgres/user")
const userProfiles = require("./models/postgres/userProfile")
const years = require("./models/postgres/year")
const months = require("./models/postgres/month")
const days = require("./models/postgres/day")
const sleepSessions = require("./models/postgres/sleepSession")
const sleepStages = require("./models/postgres/sleepStage")
const activitySessions = require("./models/postgres/activitySession")
const healthMetrics = require("./models/postgres/healthMetrics")
const monthlyHealthMetrics = require("./models/postgres/monthlyHealthMetrics")
const foodSessions = require("./models/postgres/foodSession")
const foodItems = require("./models/postgres/foodItem")
const heartData = require("./models/postgres/heartData")
const medications = require("./models/postgres/medication")
const hrvData = require("./models/postgres/hrvData")
const feedbacks = require("./models/postgres/feedback")
const dietPlans = require("./models/postgres/dietPlan")
const exercisePlans = require("./models/postgres/exercisePlan")
const User = require("./models/postgres/user")
const organizations = require("./models/postgres/organization")
const nutritionists = require("./models/postgres/nutritionist")
const referralCodes = require("./models/postgres/referralCode")
const planDefinitions = require("./models/postgres/planDefinition")
const planVersions = require("./models/postgres/planVersions")
const planAssignments = require("./models/postgres/planAssignment")
const planEntries = require("./models/postgres/planEntry")
const notifications = require("./models/postgres/notification")
const documents = require("./models/postgres/document")
const userDailyMetrics = require("./models/postgres/userDailyMetrics")
const planDailyMetrics = require("./models/postgres/planDailyMetrics")
const nutritionistDailyMetrics = require("./models/postgres/nutritionistDailyMetrics")
const organizationDailyMetrics = require("./models/postgres/organizationDailyMetrics")

// Define associations
const defineAssociations = () => {
  users.hasOne(userProfiles, {
    foreignKey: "userId",
    as: "profile",
    onDelete: "CASCADE",
  })
  userProfiles.belongsTo(users, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  })

  users.hasMany(years, {
    foreignKey: "userId",
    as: "years",
    onDelete: "CASCADE",
  })
  years.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" })

  years.hasMany(months, {
    foreignKey: "yearId",
    as: "months",
    onDelete: "CASCADE",
  })
  months.belongsTo(years, { foreignKey: "yearId", onDelete: "CASCADE" })

  months.hasMany(days, {
    foreignKey: "monthId",
    as: "days",
    onDelete: "CASCADE",
  })
  days.belongsTo(months, { foreignKey: "monthId", onDelete: "CASCADE" })

  users.hasMany(sleepSessions, {
    foreignKey: "userId",
    as: "sleepSessions",
    onDelete: "CASCADE",
  })
  sleepSessions.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" })

  sleepSessions.hasMany(sleepStages, {
    foreignKey: "sleepSessionId",
    as: "sleepStages",
    onDelete: "CASCADE",
  })
  sleepStages.belongsTo(sleepSessions, {
    foreignKey: "sleepSessionId",
    onDelete: "CASCADE",
  })

  users.hasMany(activitySessions, {
    foreignKey: "userId",
    as: "activitySessions",
    onDelete: "CASCADE",
  })
  activitySessions.belongsTo(users, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  })

  days.hasOne(healthMetrics, {
    foreignKey: "dayId",
    as: "healthMetrics",
    onDelete: "CASCADE",
  })
  healthMetrics.belongsTo(days, { foreignKey: "dayId", onDelete: "CASCADE" })

  months.hasOne(monthlyHealthMetrics, {
    foreignKey: "monthId",
    as: "monthlyHealthMetrics",
    onDelete: "CASCADE",
  })
  monthlyHealthMetrics.belongsTo(months, {
    foreignKey: "monthId",
    onDelete: "CASCADE",
  })

  users.hasMany(foodSessions, {
    foreignKey: "userId",
    as: "foodSessions",
    onDelete: "CASCADE",
  })
  foodSessions.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" })

  foodSessions.hasMany(foodItems, {
    foreignKey: "foodSessionId",
    as: "foodItems",
    onDelete: "CASCADE",
  })
  foodItems.belongsTo(foodSessions, {
    foreignKey: "foodSessionId",
    onDelete: "CASCADE",
  })

  users.hasMany(heartData, {
    foreignKey: "userId",
    as: "heartData",
    onDelete: "CASCADE",
  })
  heartData.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" })

  users.hasMany(medications, {
    foreignKey: "userId",
    as: "medications",
    onDelete: "CASCADE",
  })
  medications.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" })

  users.hasMany(hrvData, {
    foreignKey: "userId",
    as: "hrvData",
    onDelete: "CASCADE",
  })
  hrvData.belongsTo(users, { foreignKey: "userId", onDelete: "CASCADE" })

  days.hasMany(hrvData, {
    foreignKey: "dayId",
    as: "hrvData",
    onDelete: "CASCADE",
  })
  hrvData.belongsTo(days, { foreignKey: "dayId", onDelete: "CASCADE" })

  // User-Nutritionist direct relationship
  nutritionists.hasMany(users, {
    foreignKey: "assignedNutritionistId",
    as: "clients",
    onDelete: "SET NULL",
  })
  users.belongsTo(nutritionists, {
    foreignKey: "assignedNutritionistId",
    as: "assignedNutritionist",
    onDelete: "SET NULL",
  })

  // Organization associations
  organizations.hasMany(nutritionists, {
    foreignKey: "organizationId",
    as: "nutritionists",
    onDelete: "CASCADE",
  })
  nutritionists.belongsTo(organizations, {
    foreignKey: "organizationId",
    as: "organization",
    onDelete: "CASCADE",
  })

  organizations.hasMany(planDefinitions, {
    foreignKey: "organizationId",
    as: "planDefinitions",
    onDelete: "CASCADE",
  })
  planDefinitions.belongsTo(organizations, {
    foreignKey: "organizationId",
    as: "organization",
    onDelete: "CASCADE",
  })

  // Nutritionist associations
  nutritionists.hasMany(referralCodes, {
    foreignKey: "nutritionistId",
    as: "referralCodes",
    onDelete: "CASCADE",
  })
  referralCodes.belongsTo(nutritionists, {
    foreignKey: "nutritionistId",
    as: "nutritionist",
    onDelete: "CASCADE",
  })

  nutritionists.hasMany(planDefinitions, {
    foreignKey: "createdBy",
    as: "createdPlans",
    onDelete: "CASCADE",
  })
  planDefinitions.belongsTo(nutritionists, {
    foreignKey: "createdBy",
    as: "creator",
    onDelete: "CASCADE",
  })

  // Plan associations
  planDefinitions.hasMany(planVersions, {
    foreignKey: "planDefinitionId",
    as: "versions",
    onDelete: "CASCADE",
  })
  planVersions.belongsTo(planDefinitions, {
    foreignKey: "planDefinitionId",
    as: "planDefinition",
    onDelete: "CASCADE",
  })

  planVersions.hasMany(planAssignments, {
    foreignKey: "planVersionId",
    as: "assignments",
    onDelete: "CASCADE",
  })
  planAssignments.belongsTo(planVersions, {
    foreignKey: "planVersionId",
    as: "planVersion",
    onDelete: "CASCADE",
  })

  planAssignments.hasMany(planEntries, {
    foreignKey: "planAssignmentId",
    as: "entries",
    onDelete: "CASCADE",
  })
  planEntries.belongsTo(planAssignments, {
    foreignKey: "planAssignmentId",
    as: "assignment",
    onDelete: "CASCADE",
  })

  // User associations with new models
  users.hasMany(referralCodes, {
    foreignKey: "clientId",
    as: "referralCodes",
    onDelete: "SET NULL",
  })
  referralCodes.belongsTo(users, {
    foreignKey: "clientId",
    as: "client",
    onDelete: "SET NULL",
  })

  users.hasMany(planAssignments, {
    foreignKey: "clientId",
    as: "planAssignments",
    onDelete: "CASCADE",
  })
  planAssignments.belongsTo(users, {
    foreignKey: "clientId",
    as: "client",
    onDelete: "CASCADE",
  })

  users.hasMany(documents, {
    foreignKey: "clientId",
    as: "documents",
    onDelete: "CASCADE",
  })
  documents.belongsTo(users, {
    foreignKey: "clientId",
    as: "client",
    onDelete: "CASCADE",
  })

  // Analytics associations
  users.hasMany(userDailyMetrics, {
    foreignKey: "userId",
    as: "dailyMetrics",
    onDelete: "CASCADE",
  })
  userDailyMetrics.belongsTo(users, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
  })

  nutritionists.hasMany(nutritionistDailyMetrics, {
    foreignKey: "nutritionistId",
    as: "dailyMetrics",
    onDelete: "CASCADE",
  })
  nutritionistDailyMetrics.belongsTo(nutritionists, {
    foreignKey: "nutritionistId",
    as: "nutritionist",
    onDelete: "CASCADE",
  })

  organizations.hasMany(organizationDailyMetrics, {
    foreignKey: "organizationId",
    as: "dailyMetrics",
    onDelete: "CASCADE",
  })
  organizationDailyMetrics.belongsTo(organizations, {
    foreignKey: "organizationId",
    as: "organization",
    onDelete: "CASCADE",
  })

  planVersions.hasMany(planDailyMetrics, {
    foreignKey: "planVersionId",
    as: "dailyMetrics",
    onDelete: "CASCADE",
  })
  planDailyMetrics.belongsTo(planVersions, {
    foreignKey: "planVersionId",
    as: "planVersion",
    onDelete: "CASCADE",
  })
}

// Sync the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true })
    console.log("Database synced successfully.")
  } catch (error) {
    console.error("Error syncing the database:", error)
  }
}

defineAssociations()

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
  Organization: organizations,
  Nutritionist: nutritionists,
  ReferralCode: referralCodes,
  PlanDefinition: planDefinitions,
  PlanVersion: planVersions,
  PlanAssignment: planAssignments,
  PlanEntry: planEntries,
  Notification: notifications,
  Document: documents,
  UserDailyMetrics: userDailyMetrics,
  PlanDailyMetrics: planDailyMetrics,
  NutritionistDailyMetrics: nutritionistDailyMetrics,
  OrganizationDailyMetrics: organizationDailyMetrics,
  syncDatabase,
}
