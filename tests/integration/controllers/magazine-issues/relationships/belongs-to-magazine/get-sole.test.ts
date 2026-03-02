import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {MagazineIssue} from "../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {RelNotFoundError} from "../../../../../../src/models/types/RelNotFoundError"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting the ›belongs-to-magazine‹ relationship', () => {
    test('Providing valid data', async () => {
        MagazineIssue.getBelongsToMagazineRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.MagazineIssueBelongsToMagazine))

        const response = await request(app)
            .get('/magazine-issues/123/belongs-to-magazine')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        vi.spyOn(MagazineIssue, 'getBelongsToMagazineRelationship')
            .mockImplementation(async () => {
                throw new RelNotFoundError('belongs to magazine', 123)
            })

        const response = await request(app)
            .get('/magazine-issues/123/belongs-to-magazine')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(MagazineIssue, 'getBelongsToMagazineRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/magazine-issues/123/belongs-to-magazine')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(MagazineIssue, 'getBelongsToMagazineRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/magazine-issues/123/belongs-to-magazine')

        expect(response.statusCode)
            .toBe(404)
    })
})
