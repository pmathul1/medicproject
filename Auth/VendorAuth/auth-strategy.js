const PassportJwt = require('passport-jwt');
const Service = require('./auth-services');
const { Strategy: JwtStrategy, ExtractJwt } = PassportJwt;
module.exports=(passport)=>
{
    passport.use(
        'jwt',
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_ENCRYPTION,
            },
            async (payload, done) => {
                try {
                    // database query to find user by email
                    const user = await Service.login(payload.email);  ///=====login
                    if (!user) {
                        res.status("401",{message:"api error"})
                    }
                    return done(null, payload);
                } catch (err) {
                    return done(err, false, {
                        message: "invalid token" || 'Invalid Token',
                    });
                }
            }
        )
    );
};

