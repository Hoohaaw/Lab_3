import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function requireAuth(req, res, next) {
  const token = req.cookies.authToken;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("Invalid token:", err);
    res.redirect("/login");
  }
}

export function redirectIfAuth(req, res, next) {
  const token = req.cookies.authToken;
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
      return res.redirect("/");
    } catch (err) {
      next();
    }
  } else {
    next();
  }
}
