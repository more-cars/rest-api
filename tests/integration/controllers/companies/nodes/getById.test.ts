import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Company} from "../../../../../src/models/companies/Company"

test('Node does not exist', async () => {
    Company.findById = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/companies/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    Company.findById = vi.fn().mockReturnValue({
        id: 12345
    })

    const response = await request(app)
        .get('/companies/12345')

    expect(response.statusCode)
        .toBe(200)
})
