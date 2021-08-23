import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "../database";
import Establishment from "./Establishment";
import FavoritesOwner from "./FavoritesOwner";
import Reservation from "./Reservation";

interface OwnerAttributes {
  Owner_id: string;
  First_name: string;
  Last_name: string;
  E_mail: string;
  Password: string;
  Salt: string;
}

interface OwnerCreationAtributes extends Optional<OwnerAttributes, "Owner_id"> {}

interface OwnerInstance extends Model<OwnerAttributes, OwnerCreationAtributes>, OwnerAttributes {}
const Owner = sequelize.define<OwnerInstance>(
  "Owner",
  {
    Owner_id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    First_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Last_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    E_mail: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Salt: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

Owner.hasMany(Reservation, {
  sourceKey: "Owner_id",
  foreignKey: "Owner_id",
});

Reservation.belongsTo(Owner, {
  foreignKey: "Owner_id",
});

Owner.hasMany(Establishment, {
  sourceKey: "Owner_id",
  foreignKey: "Owner_id",
});

Establishment.belongsTo(Owner, {
  foreignKey: "Owner_id",
});

Owner.hasMany(FavoritesOwner, {
  sourceKey: "Owner_id",
  foreignKey: "Owner_id",
});

FavoritesOwner.belongsTo(Owner, {
  foreignKey: "Owner_id",
});
export default Owner;
