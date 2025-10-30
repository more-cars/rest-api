import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {CarModelVariant} from "../../../../../src/models/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

test('Expecting an error when the node does not exist', async () => {
    vi.spyOn(CarModelVariant, 'delete')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(-42)
        })

    const response = await request(app)
        .delete('/car-model-variants/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Deleting the node when it actually exists', async () => {
    CarModelVariant.delete = vi.fn().mockReturnValue(true)

    const response = await request(app)
        .delete('/car-model-variants/12345')

    expect(response.statusCode)
        .toBe(204)
})
