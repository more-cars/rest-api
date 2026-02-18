import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {LapTime} from "../../../../../../src/models/node-types/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›achieved-on-track-layout‹ relationship', () => {
    test('Providing valid data', async () => {
        LapTime.deleteAchievedOnTrackLayoutRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/lap-times/123/achieved-on-track-layout/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(LapTime, 'deleteAchievedOnTrackLayoutRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/lap-times/123/achieved-on-track-layout/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(LapTime, 'deleteAchievedOnTrackLayoutRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('achieved-on-track-layout', 123, 567)
            })

        const response = await request(app)
            .delete('/lap-times/123/achieved-on-track-layout/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(LapTime, 'deleteAchievedOnTrackLayoutRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/lap-times/123/achieved-on-track-layout/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
