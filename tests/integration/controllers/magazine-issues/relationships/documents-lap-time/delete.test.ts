import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {MagazineIssue} from "../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›documents-lap-time‹ relationship', () => {
    test('Providing valid data', async () => {
        MagazineIssue.deleteDocumentsLapTimeRelationship = vi.fn().mockReturnValue(null)

        const response = await request(app)
            .delete('/magazine-issues/123/documents-lap-time/567')

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data (non-existent nodes)', async () => {
        vi.spyOn(MagazineIssue, 'deleteDocumentsLapTimeRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .delete('/magazine-issues/123/documents-lap-time/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing invalid data (non-existent relationship)', async () => {
        vi.spyOn(MagazineIssue, 'deleteDocumentsLapTimeRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('documents-lap-time', 123, 567)
            })

        const response = await request(app)
            .delete('/magazine-issues/123/documents-lap-time/567')

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(MagazineIssue, 'deleteDocumentsLapTimeRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .delete('/magazine-issues/123/documents-lap-time/567')

        expect(response.statusCode)
            .toBe(500)
    })
})
