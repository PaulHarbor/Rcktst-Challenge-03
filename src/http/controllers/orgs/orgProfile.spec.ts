import { createAndAuthOrg } from "@/UTILS/createAndAuthOrg"
import { app } from "@/app"
import request from 'supertest'
import { beforeAll, afterAll, describe, expect, it } from "vitest"

describe('Fetch Org Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch org profile', async () => {

    const { token, org } = await createAndAuthOrg(app)

    const response = await request(app.server)
      .get('/orgs/profile')
      .query({ orgId: org.id })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})