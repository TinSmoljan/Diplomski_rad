import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "../database";

interface WorkHourAttributes {
  Work_hour_id: string;
  From: Date;
  To: Date;
  Date: Date;
  Day_type: String;
  Establishment_id: string;
}

interface WorkHourCreationAttributes extends Optional<WorkHourAttributes, "Work_hour_id"> {}

interface WorkHourInstance extends Model<WorkHourAttributes, WorkHourCreationAttributes>, WorkHourAttributes {}
const WorkHour = sequelize.define<WorkHourInstance>(
  "Work_hour",
  {
    Work_hour_id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    From: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    To: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    Date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    Day_type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Establishment_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  },
  { timestamps: false }
);

export default WorkHour;
