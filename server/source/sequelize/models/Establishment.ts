import { Model, Optional, DataTypes, IntegerDataType } from "sequelize";
import sequelize from "../database";
import FavoritesOwner from "./FavoritesOwner";
import FavoritesUser from "./FavoritesUser";
import Picture from "./Pictures";
import Reservation from "./Reservation";
import WorkHour from "./WorkHours";


interface EstablishmentAttributes {
  Establishment_id: string;
  Name: string;
  Adress: string;
  Type: string;
  Description: string;
  Owner_id: string;
  Count: number;
}

interface EstablishmentCreationAtributes extends Optional<EstablishmentAttributes, "Establishment_id"> {}

interface EstablishmentInstance extends Model<EstablishmentAttributes, EstablishmentCreationAtributes>, EstablishmentAttributes {}

const Establishment = sequelize.define<EstablishmentInstance>(
  "Establishment",
  {
    Establishment_id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    Name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Adress: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    Count: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    Owner_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  },
  { timestamps: false }
);

Establishment.hasMany(Reservation, {
  sourceKey: "Establishment_id",
  foreignKey: "Establishment_id",
});

Reservation.belongsTo(Establishment, {
  foreignKey: "Establishment_id",
});

Establishment.hasMany(Picture, {
  sourceKey: "Establishment_id",
  foreignKey: "Establishment_id",
});

Picture.belongsTo(Establishment, {
  foreignKey: "Establishment_id",
});

Establishment.hasMany(FavoritesOwner, {
  sourceKey: "Establishment_id",
  foreignKey: "Establishment_id",
});

FavoritesOwner.belongsTo(Establishment, {
  foreignKey: "Establishment_id",
});

Establishment.hasMany(FavoritesUser, {
  sourceKey: "Establishment_id",
  foreignKey: "Establishment_id",
});

FavoritesUser.belongsTo(Establishment, {
  foreignKey: "Establishment_id",
});

Establishment.hasMany(WorkHour, {
  sourceKey: "Establishment_id",
  foreignKey: "Establishment_id",
});

WorkHour.belongsTo(Establishment, {
  foreignKey: "Establishment_id",
});
export default Establishment;
