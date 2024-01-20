import jwt, { SignOptions } from 'jsonwebtoken'
import config from 'config'

interface JwtPayload {
  userId: string
}

export const signJwt = async (
  payload: JwtPayload,
  key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions = {}
) => {
  const privateKey = Buffer.from(config.get<string>(key), 'base64').toString('ascii')
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

export const verifyJwt = async (
  token: string,
  key: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): Promise<JwtPayload | null> => {
  try {
    const publicKey = Buffer.from(config.get<string>(key), 'base64').toString('ascii')
    return jwt.verify(token, publicKey) as JwtPayload
  } catch (error) {
    return null
  }
}

export const generateTokens = async (payload: JwtPayload) => {
  // Sign the access token
  const access_token = await signJwt(payload, 'accessTokenPrivateKey', {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`
  })

  // Sign the refresh token
  const refresh_token = await signJwt(payload, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`
  })

  // Return access token
  return { access_token, refresh_token }
}
