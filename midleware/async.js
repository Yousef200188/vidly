module.exports = function asyncMidleware(handler) {
    return async (res, req, next) => {
        try {
            await handler(req, res)

        } catch (ex) {
            next(ex)
        }
    }
}