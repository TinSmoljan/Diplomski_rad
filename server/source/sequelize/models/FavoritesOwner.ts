import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "../database";

interface FavoritesOwnerAttributes {
  Owner_id: string;
  Establishment_id: string;
}

// interface FavoritesOwnerCreationAtributes extends Optional<FavoritesOwnerAttributes, "FavoritesOwner_id"> {}
//if something doesnt work vjv je prob ova gori linija koda 


interface FavoritesOwnerInstance extends Model<FavoritesOwnerAttributes, FavoritesOwnerAttributes>, FavoritesOwnerAttributes {}
const FavoritesOwner = sequelize.define<FavoritesOwnerInstance>(
  "FavoritesOwner",
  {
    Owner_id: {
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

export default FavoritesOwner;
