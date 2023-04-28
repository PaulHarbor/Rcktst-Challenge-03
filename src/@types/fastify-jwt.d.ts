import '@fastify/jwt'

declare module '@fastify/jwt'
interface FastifyJWT {
  user: {
    sub: string //user id
    role: 'ADMIN' | 'MEMBER'
  },
  org:{
    sub: string
    role: 'ADMIN' | 'MEMBER'
  }
}