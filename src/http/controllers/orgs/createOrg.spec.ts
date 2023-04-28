import { createAndAuthUser } from "@/UTILS/createAndAuthUser"
import { app } from "@/app"
import request from 'supertest'
import { beforeAll, afterAll, describe, expect, it } from "vitest"


describe('Create Org (e2e)', ()=>{

  beforeAll(async ()=>{
    await app.ready()
  })

  afterAll(async ()=>{
    await app.close()
  })

  it('should be able to create an org', async ()=>{

    const { token } = await createAndAuthUser(app, true)

    const response = await request(app.server)
      .post('/orgs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title:'Neafa',
        email:'neafa@example.com',
        password:'123456',
        address:'Rua Street 504',
        phone:'9999-9999'
      })

    expect(response.statusCode).toEqual(201)
  })
})