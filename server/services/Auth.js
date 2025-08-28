

export function loginService(req, res, next) {
    const { email, password } = req?.body
    console.log(req.body)
    if (email == 'hanzala@h.com' && password == '111') {
        return res.json({
            user_id: 1,
            token: "fake-jwt-token",
            message: "Login successful"
        })
    }
    res.status(401).send('Login Failed')

}