const config = require("config");
const HOST = config.get("HOST");

const normalizeUser = (rawUser) => {
  return {
    ...rawUser,
    name: {
      ...rawUser.name,
      middle: rawUser.name.middle || "",
    },
    image: {
      ...rawUser.image,
      url: rawUser.image.url || `${HOST}/images/business-card.jpg`,
      alt: rawUser.image.alt || "avatar",
    },
    address: {
      ...rawUser.address,
      state: rawUser.address.state || "not defined",
    },
  };
};

module.exports = normalizeUser;
