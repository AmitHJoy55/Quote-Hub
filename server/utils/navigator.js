module.exports = function getRedirectPage(intent) {
  const map = {
    motivational: "/motivational-quotes",
    romantic: "/romantic-quotes",
    funny: "/funny-quotes"
  };
  return map[intent] || null;
};
