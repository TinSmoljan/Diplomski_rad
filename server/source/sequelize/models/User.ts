import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "../database";
import FavoritesUser from "./FavoritesUser";
import Reservation from "./Reservation";

interface UserAttributes {
  User_id: string;
  First_name: string;
  Last_name: string;
  E_mail: string;
  Password: string;
  Salt: string;
}

interface UserCreationAtributes extends Optional<UserAttributes, "User_id"> {}

interface UserInstance extends Model<UserAttributes, UserCreationAtributes>, UserAttributes {}
const User = sequelize.define<UserInstance>(
  "User",
  {
    User_id: {
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

User.hasMany(Reservation, {
  sourceKey:'User_id',
  foreignKey: 'User_id',
});

Reservation.belongsTo(User, {
  foreignKey:'User_id'
});

User.hasMany(FavoritesUser, {
  sourceKey:'User_id',
  foreignKey: 'User_id',
});

FavoritesUser.belongsTo(User, {
  foreignKey:'User_id'
});

export default User;
