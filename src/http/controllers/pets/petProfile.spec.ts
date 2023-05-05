import { createAndAuthOrg } from "@/UTILS/createAndAuthOrg"
import { app } from "@/app"
import { prisma } from "@/lib/prisma"
import request from 'supertest'
import { beforeAll, afterAll, describe, expect, it } from "vitest"


describe('Fetch Pet Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pet profile', async () => {

    const { token, org } = await createAndAuthOrg(app)

    const pet = await prisma.pet.create({
      data: {
        name: 'Doggo',
        species: 'DOG',
        city: 'Maceió',
        age: 3,
        energy: 2,
        build: 'SMALL',
        independence: 'LOW',
        description: 'Gud boi',
        org_id: org.id

      }
    })

    //console.log('Created Pet: ',pet)

    const response = await request(app.server)
      .get(`/pets/profile/`)
      .query({petId: pet.id})
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)

  })
})