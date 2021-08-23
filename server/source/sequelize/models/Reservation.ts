import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "../database";

interface ReservationAttributes {
  Reservation_id: string;
  From: Date;
  To: Date;
  Date: Date;
  Establishment_id: string;
  User_id: string | null;
  Owner_id: string | null;
}

interface ReservationCreationAtributes extends Optional<ReservationAttributes, "Reservation_id"> {}

interface ReservationInstance extends Model<ReservationAttributes, ReservationCreationAtributes>, ReservationAttributes {}

const Reservation = sequelize.define<ReservationInstance>(
  "Reservation",
  {
    Reservation_id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    From: {
      allowNull: false,
      type: DataTypes.TIME,
    },
    To: {
      allowNull: false,
      type: DataTypes.TIME,
    },
    Date: {
      allowNull: false,
      type: DataTypes.TIME,
    },
    Establishment_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    User_id: {
      allowNull: true,
      type: DataTypes.UUID,
    },
    Owner_id: {
      allowNull: true,
      type: DataTypes.UUID,
    },
  },
  { timestamps: false }
);


export default Reservation;
