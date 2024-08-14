const showLogin = (req,res)=>{
    res.render('index.ejs')
}

const logIn = (req,res)=>{
    res.render('pages/seller.ejs')
}

export {logIn,showLogin}