export default function Logger(req, res, next) {
    console.log(req.url)
    next()
}