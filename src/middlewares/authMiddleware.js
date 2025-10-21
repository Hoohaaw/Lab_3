import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "yourSuperSecretKey";

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
      // Token is valid, redirect to feed
      return res.redirect("/");
    } catch (err) {
      // Token is invalid, continue to login/register
      next();
    }
  } else {
    // No token, continue to login/register
    next();
  }
}
