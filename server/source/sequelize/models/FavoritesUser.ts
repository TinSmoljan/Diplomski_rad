import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "../database";

interface FavoritesUserAttributes {
  User_id: string;
  Establishment_id: string;
}

// interface FavoritesUserCreationAtributes extends Optional<FavoritesUserAttributes, "FavoritesUser_id"> {}
//if something doesnt work vjv je prob ova gori linija koda 


interface FavoritesUserInstance extends Model<FavoritesUserAttributes, FavoritesUserAttributes>, FavoritesUserAttributes {}
const FavoritesUser = sequelize.define<FavoritesUserInstance>(
  "Favorites_user",
  {
    User_id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
    },
    Establishment_id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  { timestamps: false }
);



export default FavoritesUser;
