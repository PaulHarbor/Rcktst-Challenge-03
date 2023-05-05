import { createAndAuthOrg } from "@/UTILS/createAndAuthOrg"
import { app } from "@/app"
import { prisma } from "@/lib/prisma"
import request from 'supertest'
import { beforeAll, afterAll, describe, expect, it } from "vitest"

describe('List Pet By City (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list pets with filters', async () => {

    const { token, org } = await createAndAuthOrg(app)

    const pet1 = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        petName: 'Doggo',
        petSpecies: 'DOG',
        petCity: 'Recife',
        petAge: 3,
        petEnergy: 2,
        petBuild: 'SMALL',
        petIndependence: 'LOW',
        petDescription: 'Gud boi',
        petOrgId: org.id
      })

    //console.log('Pet 1 status code : ', pet1.statusCode)

    const pet2 = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        petName: 'Cate',
        petSpecies: 'CAT',
        petCity: 'Maceió',
        petAge: 2,
        petEnergy: 1,
        petBuild: 'SMALL',
        petIndependence: 'HIGH',
        petDescription: 'Sad boi',
        petOrgId: org.id
      })

    //console.log('Pet 2 status code : ', pet2.statusCode)

    const response = await request(app.server)
      .get('/pets/list')
      .query({
        petCity: 'Maceió',
        build: 'SMALL'
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

   // console.log('Pet List response : ', response.body)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        city: 'Maceió',
        build: 'SMALL'
      })
    ])


  })
})