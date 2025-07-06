import User from "../models/user.js"
import { generateAccessToken } from "../utils/generate-access-token.js"
import { generateRefreshToken } from "../utils/generate-refresh-token.js"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const exist = await User.findOne({ email })
    if (exist) return res.status(400).json({ message: "Email ya en uso" })

    const user = await User.create({ username, email, password })
    const token = generateAccessToken(user._id)
    const refreshToken = generateRefreshToken(user._id)

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user)
      return res
        .status(400)
        .json({ message: "Usuario no encontrado", error: true })

    if (await user.matchPassword(password)) {
      const accessToken = generateAccessToken(user._id)
      const refreshToken = generateRefreshToken(user._id)

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      })
      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })

      res.json({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      })
    } else {
      res
        .status(401)
        .json({ message: "Email o contraseña inválidos", error: true })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const logout = (req, res) => {
  res.clearCookie("refreshToken")
  res.clearCookie("token")
  res.status(200).json({ message: "Cierre de sesión correcto" })
}

export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token es requerido" })
  }

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
        (err, decoded) => {
          if (err) {
            reject(new Error("Refresh token inválido"))
          } else {
            resolve(decoded)
          }
        }
      )
    })

    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" })
    }

    const newToken = generateAccessToken(user)

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
    })

    return res.status(200).json({ message: "Token actualizado correctamente" })
  } catch (error) {
    console.error("Error en el servidor:", error)
    if (error.message === "Refresh token inválido") {
      return res.status(403).json({ error: error.message })
    }
    return res.status(500).json({ error: "Error en el servidor" })
  }
}
