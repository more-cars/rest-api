import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Image} from "../../../../../../src/models/images/Image"

test('Node does not exist', async () => {
    Image.getBelongsToNodeRelationships = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/images/1234/belongs-to-node')

    expect(response.statusCode)
        .toBe(404)
})
test('Semantic error', async () => {
    vi.spyOn(Image, 'getBelongsToNodeRelationships')
        .mockImplementation(async () => {
            throw new Error('semantic error')
        })

    const response = await request(app)
        .get('/images/1234/belongs-to-node')

    expect(response.statusCode)
        .toBe(422)
})
test('Node exists and has relationship partners', async () => {
    Image.getBelongsToNodeRelationships = vi.fn().mockReturnValue([
        {
            relationship_id: 4
        }, {
            relationship_id: 5
        }, {
            relationship_id: 6
        }
    ])

    const response = await request(app)
        .get('/images/1234/belongs-to-node')

    expect(response.statusCode)
        .toBe(200)
})
