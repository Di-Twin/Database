const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const User = require("./user");

const UserProfile = sequelize.define(
  "UserProfile",
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
      primaryKey: true,
    },
    medical_conditions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
      defaultValue: [],
    },
    medications: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
      defaultValue: [],
    },
    meal_timings: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        breakfast: "08:00",
        lunch: "13:00",
        dinner: "19:00",
        snack: "16:00",
      },
      comment: "Stores meal notification times in 24-hour format (HH:MM)",
    },
    height_cm: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    weight_kg: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    target_weight_kg: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    family_history: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
    lifestyle_factors: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
    health_goals: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    age: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    health_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    hasWatch: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    target_calories: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    wearableIntegration: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
      comment:
        "Stores wearable device integration details like Fitbit, Apple Health, etc.",
    },
    fcmTokens: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
      defaultValue: [],
      comment: "Array of FCM tokens for push notifications across user devices",
    },
    disliked_meals: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: null,
      comment: "List of disliked meals",
    },
    disliked_exercises: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: null,
      comment: "List of disliked exercises",
    },
    diet_preferences: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        disliked_meals: [],
        disliked_ingredients: [],
        allergies: [],
        dietary_restrictions: [],
      },
    },
    exercise_preferences: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        equipment_available: [],
        preferred_types: [],
        time_available: 30,
        days_per_week: 3,
      },
    },
    last_plan_update: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gut_status: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        score: null,
        message: "",
      },
      comment: "Gut health score and interpretation message",
    },
    cardiac_status: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        score: null,
        message: "",
      },
      comment: "Cardiac health score and interpretation message",
    },
    diabetes_status: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        score: null,
        message: "",
      },
      comment: "Diabetes risk score and interpretation message",
    },
  },
  {
    tableName: "userProfiles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeSave: (userProfile) => {
        const { weight_kg, height_cm, age, gender } = userProfile;

        if (
          userProfile.changed("diet_plan") ||
          userProfile.changed("exercise_plan")
        ) {
          userProfile.last_plan_update = new Date();
        }

        if (weight_kg && height_cm && age && gender) {
          try {
            const bmr = calculateBMR(
              parseFloat(weight_kg),
              parseFloat(height_cm),
              parseInt(age, 10),
              gender
            );
            userProfile.target_calories = Math.round(bmr + 1000);
          } catch (error) {
            console.error("Error calculating BMR:", error.message);
            userProfile.target_calories = null;
          }
        } else {
          userProfile.target_calories = null;
        }
      },
    },
  }
);

function calculateBMR(weightKg, heightCm, ageYears, gender) {
  // Validate input
  if (weightKg <= 0 || heightCm <= 0 || ageYears <= 0) {
    throw new Error("Weight, height, and age must be positive values.");
  }
  if (gender !== "male" && gender !== "female") {
    throw new Error("Gender must be 'male' or 'female'.");
  }

  // Constants for Mifflin-St Jeor Equation
  const BASE_BMR = {
    male: 5, // Extra calories added for men
    female: -161, // Subtracted for women
  };

  // BMR Calculation
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + BASE_BMR[gender];

  return bmr;
}

module.exports = UserProfile;
