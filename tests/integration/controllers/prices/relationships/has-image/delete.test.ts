import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Price} from "../../../../../../src/models/node-types/prices/Price"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-image‹ relationship', () => {
    test('Providing valid data', async () => {
        Price.deleteHasImageRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/prices/123/has-image/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(Price, 'deleteHasImageRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/prices/123/has-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(Price, 'deleteHasImageRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('has-image', 123, 567)
            })

        const response = await request(app)
            .delete('/prices/123/has-image/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Price, 'deleteHasImageRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/prices/123/has-image/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
