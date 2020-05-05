import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticaded(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization

  // Se token existir
  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  // Se token valido

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as TokenPayload
    request.user = {
      id: sub,
    }
    return next()
  } catch (err) {
    throw new AppError('Invalid JWT token', 401)
  }
}
