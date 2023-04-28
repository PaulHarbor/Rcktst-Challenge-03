import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthUser } from '@/UTILS/createAndAuthUser'

describe('Authenticate Org (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate org', async () => {

    const { token } = await createAndAuthUser(app, true)

    const createdOrg = await request(app.server)
      .post('/orgs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Neafa',
        email: 'neafa@example.com',
        password: '123456',
        address: 'Rua do meio 504',
        phone: '9999-9999'
      })

    console.log('Created Org : ', createdOrg.statusCode)

    const response = await request(app.server)
      .post('/orgs/sessions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'neafa@example.com',
        password: '123456'
      })
    
    console.log('Org Auth : ', response.body)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})