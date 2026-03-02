import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {Magazine} from "../../../../../../src/models/node-types/magazines/Magazine"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {app} from '../../../../../../src/app'
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-issue‹ relationships', () => {
    test('Providing valid data', async () => {
        Magazine.getAllHasIssueRelationships = vi.fn().mockReturnValue([
            getFakeRel(RelType.MagazineHasIssue),
            getFakeRel(RelType.MagazineHasIssue),
            getFakeRel(RelType.MagazineHasIssue),
        ])

        const response = await request(app)
            .get('/magazines/123/has-issue')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but no relationships exist', async () => {
        Magazine.getAllHasIssueRelationships = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/magazines/123/has-issue')

        expect(response.statusCode)
            .toBe(200)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Magazine, 'getAllHasIssueRelationships')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .get('/magazines/123/has-issue')

        expect(response.statusCode)
            .toBe(500)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Magazine, 'getAllHasIssueRelationships')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .get('/magazines/123/has-issue')

        expect(response.statusCode)
            .toBe(404)
    })
})
