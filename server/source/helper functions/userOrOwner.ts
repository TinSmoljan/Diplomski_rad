import Owner from "../sequelize/models/Owner";
import User from "../sequelize/models/User";

const userOrOwner = async (accountId: string): Promise<string> => {
  const isUser = await User.findAll({ where: { User_id: accountId } });
  const isOwner = await Owner.findAll({ where: { Owner_id: accountId } });
  if (isUser.length > 0) {
    return "User";
  } else if (isOwner.length > 0) {
    return "Owner";
  } else {
    return "Not in the database";
  }
};

const doesEmailExist = async (email: string): Promise<boolean> => {
  const user = await User.findAll({ where: { E_mail: email } });
  const owner = await Owner.findAll({ where: { E_mail: email } });

  return user.length == 0 && owner.length == 0 ? false : true;
};

export { userOrOwner, doesEmailExist };
