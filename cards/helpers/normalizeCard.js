const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (rawCard) => {
  const { url, alt } = rawCard.image;
  const image = {
    url:
      url ||
      "https://cdn.pixabay.com/photo/2016/04/20/08/21/enterpreneur-1340649_960_720.jpg",
    alt: alt || "Business card image",
  };

  return {
    ...rawCard,
    image,
    address: {
      ...rawCard.address,
      state: rawCard.address.state || "not defined",
    },
    bizNumber: rawCard.bizNumber || (await generateBizNumber()),
    user_id: "634695107dda7ef92a00e915",
  };
};

module.exports = normalizeCard;
