const jwt = require("jsonwebtoken");
const { pool } = require("../connection.js");

const login = async (req, res) => {
  console.log("resquest received to login");

  try {
    const { username, password } = req.body;
    pool.query(
      `select * from public.users where username='${username}' and password='${password}'`,
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(400).json({ error: "Database error" });
        }
        if (results.rows.length === 0) {
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        }
        const user = results.rows[0];
        const token = jwt.sign(
          { username: user.username, name: user.name, uid: user.id },
          "A28jhYp9Mzj0",
          {
            expiresIn: "1d",
          }
        );
        res.status(200).json({ token: token, user: user });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Login Failed" });
  }
};

module.exports = { login };
