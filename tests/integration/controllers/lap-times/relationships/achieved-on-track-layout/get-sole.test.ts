import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {LapTime} from "../../../../../../src/models/node-types/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"

describe('Requesting the ›achieved-on-track-layout‹ relationship', () => {
    test('Providing valid data', async () => {
        LapTime.getAchievedOnTrackLayoutRelationship = vi.fn().mockReturnValue({
            id: 4,
            type: RelType.LapTimeAchievedOnTrackLayout,
        })

        const response = await request(app)
            .get('/lap-times/123/achieved-on-track-layout')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(LapTime, 'getAchievedOnTrackLayoutRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('achieved on track layout', 123)
            })

        const response = await request(app)
            .get('/lap-times/123/achieved-on-track-layout')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(LapTime, 'getAchievedOnTrackLayoutRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/lap-times/123/achieved-on-track-layout')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(LapTime, 'getAchievedOnTrackLayoutRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/lap-times/123/achieved-on-track-layout')

        expect(response.statusCode)
            .toBe(404)
    })
})
