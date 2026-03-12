import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {ProgrammeEpisode} from "../../../../../../src/models/node-types/programme-episodes/ProgrammeEpisode"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›belongs-to-programme‹ relationship', () => {
    test('Providing valid data', async () => {
        ProgrammeEpisode.deleteBelongsToProgrammeRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/programme-episodes/123/belongs-to-programme/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(ProgrammeEpisode, 'deleteBelongsToProgrammeRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/programme-episodes/123/belongs-to-programme/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(ProgrammeEpisode, 'deleteBelongsToProgrammeRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('belongs-to-programme', 123, 567)
            })

        const response = await request(app)
            .delete('/programme-episodes/123/belongs-to-programme/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(ProgrammeEpisode, 'deleteBelongsToProgrammeRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/programme-episodes/123/belongs-to-programme/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
