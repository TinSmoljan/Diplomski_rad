import { Model, Optional, DataTypes } from "sequelize";
import sequelize from "../database";


interface PictureAttributes {
  Picture_id: string;
  Picture: string;
  Thumbnail: boolean;
  Establishment_id: string;
}

interface PictureCreationAtributes extends Optional<PictureAttributes, "Picture_id"> {}

interface PictureInstance extends Model<PictureAttributes, PictureCreationAtributes>, PictureAttributes {}
const Picture = sequelize.define<PictureInstance>(
  "Picture",
  {
    Picture_id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    Picture: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    Thumbnail: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    Establishment_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  },
  { timestamps: false }
);


export default Picture;
