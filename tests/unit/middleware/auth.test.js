const { User } = require('../../../route/models/user')
const auth = require('../../../midleware/auth')
describe('auth middleWare', () => {
    it('should populate req.user with the payload of avlid jwt', () => {
        const token = new User().generateAuthToken()
        const req = {
            header: jest.fn().mockReturnValue(token)
        }
        const res = {}
        const next = jest.fn()
        auth(req, res, next)
        expect(req.user).toBeDefined()

    })
})