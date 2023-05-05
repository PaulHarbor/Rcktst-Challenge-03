import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthUser } from '@/UTILS/createAndAuthUser'

describe('Refresh Org Token (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh an org token', async () => {
    
    const { token } = await createAndAuthUser(app, true)

    await request(app.server)
      .post('/orgs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Neafa',
        email: 'neafa@example.com',
        password: '123456',
        address:'Rua do meio 504',
        phone:'9999-9999'
      })
    
    const authResponse = await request(app.server)
      .post('/orgs/sessions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'neafa@example.com',
        password: '123456'
      })
    
    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/orgs/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(authResponse.statusCode).toEqual(200)
    expect(authResponse.body).toEqual({
         token: expect.any(String)
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})