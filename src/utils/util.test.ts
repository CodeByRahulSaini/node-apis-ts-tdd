import { signJwt, verifyJwt, generateTokens } from './jwt.util'
describe('test utils', () => {
  describe('test jwt.util', () => {
    const userDetails = {
      userId: '1234'
    }
    let jwtToken
    test('should sign JWT', async () => {
      jwtToken = await signJwt(userDetails, 'accessTokenPrivateKey')
      expect(typeof jwtToken).toBe('string')
    })

    test('should verify JWT', async () => {
      const data = await verifyJwt(jwtToken, 'accessTokenPublicKey')
      expect(data?.userId).toBe(userDetails.userId)
    })

    test('should fail with wrong JWT', async () => {
      const data = await verifyJwt('random', 'accessTokenPublicKey')
      expect(data).toBeNull()
    })

    test('should generate access and refresh tokens', async () => {
      const { access_token, refresh_token } = await generateTokens(userDetails)
      const accessTokenData = await verifyJwt(access_token, 'accessTokenPublicKey')
      expect(accessTokenData?.userId).toBe(userDetails.userId)

      const refreshTokenData = await verifyJwt(refresh_token, 'refreshTokenPublicKey')
      expect(refreshTokenData?.userId).toBe(userDetails.userId)
    })
  })
})
