import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { createAndAuthUser } from './createAndAuthUser'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function createAndAuthOrg(app: FastifyInstance,
  isAdmin = false) {

  let { token } = await createAndAuthUser(app, true)

  const org = await prisma.org.create({
    data: {
      title: 'Neafa',
      email: 'neafa@example.com',
      password_hash: await hash('123456', 6),
      address: 'Rua do meio 504',
      phone: '9999-9999'
    }

  })

  //authenticating using login credentials created above
  const authResponse = await request(app.server)
    .post('/orgs/sessions')
    .set('Authorization', `Bearer ${token}`)
    .send({
      email: 'neafa@example.com',
      password: '123456'
    })

  token = authResponse.body.token  

  return {
    token,
    org
  }
}