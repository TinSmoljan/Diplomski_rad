import { v4 as uuidv4 } from "uuid";

const generateID = () => {
  let id = uuidv4();
  return id;
};

export { generateID };
