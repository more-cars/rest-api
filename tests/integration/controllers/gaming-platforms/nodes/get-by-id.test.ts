import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {GamingPlatform} from "../../../../../src/models/gaming-platforms/GamingPlatform"

test('Node does not exist', async () => {
    GamingPlatform.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/gaming-platforms/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    GamingPlatform.findById = vi.fn().mockReturnValue({
        id: 12345
    })

    const response = await request(app)
        .get('/gaming-platforms/12345')

    expect(response.statusCode)
        .toBe(200)
})
