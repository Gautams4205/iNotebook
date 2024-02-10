const jwt = require("jsonwebtoken");
const JWT_SECRET = "Thisshouldbehiddeninenvvariable";

const fetchuser = (req, res, next) => {
  // Get the user from jwt token and add it to req object
  const token = req.header("authtoken");
  if (!token) {
    return res.status(401).send("Please authenticate with valid token in header.");
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send("Please authenticate with valid token.");
  }
};

module.exports = fetchuser;
