const { DataTypes } = require("sequelize")
const { sequelize } = require("@dtwin/config")
const User = require("./user")
const Nutritionist = require("./nutritionist")

const Document = sequelize.define(
  "documents",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
      onDelete: "CASCADE",
    },
    uploadedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Nutritionist,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    original_filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Storage path or URL",
    },
    file_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "File size in bytes",
    },
    mime_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    document_type: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Category like lab_report, meal_plan, progress_photo, etc.",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
      comment: "Additional file metadata",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "documents",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
)

module.exports = Document
