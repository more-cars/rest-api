import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {Company} from "../../../../../src/models/companies/Company"

test('Expecting an error when the node does not exist', async () => {
    Company.delete = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .delete('/companies/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Deleting the node when it actually exists', async () => {
    Company.delete = vi.fn().mockReturnValue(true)

    const response = await request(app)
        .delete('/companies/12345')

    expect(response.statusCode)
        .toBe(204)
})
