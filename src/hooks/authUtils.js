// authUtils.js

import jwt_decode from "jwt-decode";

const getRolesFromToken = (token) => {
  const decoded = jwt_decode(token);
  return decoded?.UserInfo?.roles || [];
};
const getEmailFromToken = (token) => {
  const decodedemail = jwt_decode(token);
  console.log(decodedemail);
  return decodedemail?.UserInfo?.email || [];
};

export { getRolesFromToken, getEmailFromToken };
