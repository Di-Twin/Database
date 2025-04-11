const { DataTypes } = require("sequelize");
const { sequelize } = require("@dtwin/config");
const FoodSession = require("./foodSession");

const FoodItem = sequelize.define(
  "FoodItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: FoodSession,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    foodName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    servingSize: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    servingAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    macronutrients: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        energy_kcal: 0,
        protein_g: 0,
        fat_g: 0,
        carbohydrates_g: 0,
        fiber_g: 0
      }
    },
    micronutrients: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        calcium_mg: 0,
        iron_mg: 0,
        magnesium_mg: 0,
        phosphorus_mg: 0,
        potassium_mg: 0,
        sodium_mg: 0,
        zinc_mg: 0,
        vitamin_c_mg: 0,
        thiamin_mg: 0,
        riboflavin_mg: 0,
        niacin_mg: 0,
        vitamin_b6_mg: 0,
        folate_ug: 0,
        vitamin_a_ug: 0,
        vitamin_e_mg: 0,
        vitamin_d_ug: 0
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gi: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    gl: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "food_items",
  }
);

module.exports = FoodItem;