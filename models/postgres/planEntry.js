const { DataTypes } = require("sequelize")
const { sequelize } = require("@dtwin/config")
const PlanAssignment = require("./planAssignment")

const PlanEntry = sequelize.define(
  "planEntries",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    planAssignmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: PlanAssignment,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    scheduled_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time_slot: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Time slot identifier (morning, afternoon, evening, or specific time)",
    },
    entry_type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Type of entry (meal, exercise, medication, etc.)",
    },
    expected_action: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Description of what the client should do",
    },
    payload_data: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
      comment: "Detailed data for the scheduled action",
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "skipped", "missed"),
      allowNull: false,
      defaultValue: "pending",
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    actual_log_reference: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: "Reference to actual logged data (table name, record ID, etc.)",
    },
    client_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Notes from client when completing the entry",
    },
    nutritionist_feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Feedback from nutritionist on the completed entry",
    },
    reminder_sent_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    missed_notification_sent_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "plan_entries",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        fields: ["planAssignmentId", "scheduled_date"],
      },
      {
        fields: ["scheduled_date", "status"],
      },
    ],
  },
)

module.exports = PlanEntry
