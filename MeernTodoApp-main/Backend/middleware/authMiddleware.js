import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const token = req.cookies.token;

  console.log(token);

  if (!token) {
    return res.status(200).json({
      success: false,
      message: "You are not authorized to access this route",
    });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  if (!decoded) {
    return res.status(200).json({
      success: false,
      message: "Invalid token!!",
    });
  }

  req.id = decoded.userId;

  next();
}
