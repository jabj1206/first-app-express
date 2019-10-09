const User = require('../user')


const requireUser = async function(req,res,next){
  const userId = req.session.userId
  if(userId){
    const user = await User.findOne({_id: userId})
    res.locals.user = user;
    console.log(req.cookies);
    
    next()
  }else{
    return res.redirect('/login')
  }
}

module.exports = requireUser