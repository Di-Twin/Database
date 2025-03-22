const { connectMongoDB, connectPostgres } = require("@dtwin/config");

const User = require("./models/postgres/user");
const UserProfile = require("./models/postgres/userProfile");

const { sequelize } = require("@dtwin/config");

// 🔗 Define Associations
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

connectPostgres()

const syncDatabase = async () => {
  try {
    await sequelize.authenticate(); // Ensure DB connection is active
    await User.sync({ alter: true });
    await UserProfile.sync({ alter: true });

    console.log("✅ Database synced successfully!");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
};

syncDatabase();

module.exports = {
  sequelize,
  User,
  UserProfile,
  connectMongoDB,
  connectPostgres,
};

// $ psql -U postgres
