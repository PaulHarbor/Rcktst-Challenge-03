import { FastifyReply, FastifyRequest } from "fastify";

export async function refreshOrgToken(req: FastifyRequest, rep: FastifyReply) {

await req.jwtVerify({ onlyCookie: true })

console.log('JWT verified for Org')

  const { role } = req.org

  const token = await rep.jwtSign(
    { role },
    {
      sign: {
        sub: req.org.sub
      }
    })

  const refreshToken = await rep.jwtSign(
    { role  },
    {
      sign: {
        sub: req.org.sub,
        expiresIn: '7d'
      }
    })

    return rep
      .setCookie('orgRefreshToken', refreshToken,{
        path:'/',
        secure:true,
        sameSite:true,
        httpOnly:true
      })
      .status(200)
      .send({token})
}