const showLogin = (req,res)=>{
    res.render('index.ejs')
}

const logIn = (req,res)=>{
    const {email,password } = req.body
}

export {logIn,showLogin}