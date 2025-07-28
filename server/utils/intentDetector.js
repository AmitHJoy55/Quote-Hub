module.exports = function detectIntent(message) {
  const text = message.toLowerCase();

  if (
    text.includes("motivation") ||
    text.includes("motivational") ||
    text.includes("struggle")
  )
    return "motivational";
  if (
    text.includes("love") ||
    text.includes("heart") ||
    text.includes("romance") ||
    text.includes("romantic")
  )
    return "romantic";
  if (text.includes("joke") || text.includes("laugh") || text.includes("funny"))
    return "funny";

  // return "unknown";
};
