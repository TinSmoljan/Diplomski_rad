import * as crypto from "crypto";

var genRandomString = function (length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

export default genRandomString;