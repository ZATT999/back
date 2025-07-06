import jwt from "jsonwebtoken"
import User from "../models/user.js"

export const protect = async (req, res, next) => {
  let token

  if (req.cookies.token) {
    try {
      token = req.cookies.token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.id).select("-password")
      req.user = user
      next()
    } catch (err) {
      res.status(401).json({ message: "Token inválido", error: true, tokenError:true })
    }
  } else {
    res.status(401).json({ message: "No token", error: true,tokenError:true })
  }
}

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acceso denegado", error: true })
    }
    next()
  }
}
