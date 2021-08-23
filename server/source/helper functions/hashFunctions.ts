import * as crypto from "crypto";


var sha512 = function (password: string, salt: string) {
  var hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest("hex");
  return value;
};

export default sha512;
