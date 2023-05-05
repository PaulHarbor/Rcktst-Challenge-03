import { createAndAuthOrg } from "@/UTILS/createAndAuthOrg"
import { app } from "@/app"
import request from 'supertest'
import { beforeAll, afterAll, describe, expect, it } from "vitest"


describe('Register Pet (e2e)', ()=>{

  beforeAll(async ()=>{
    await app.ready()
  })

  afterAll(async ()=>{
    await app.close()
  })

  it('should be able to register pet', async ()=>{

    const {token, org} = await createAndAuthOrg(app)
    
    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        petName:'Doggo',
        petSpecies: 'DOG',
        petCity: 'Maceió',
        petAge: 3,
        petEnergy: 2,
        petBuild: 'SMALL',
        petIndependence: 'LOW',
        petDescription: 'Gud boi',
        petOrgId: org.id

      })      

    expect(response.statusCode).toEqual(201)
  })
})