import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Image} from "../../../../../../src/models/images/Image"

test('Node does not exist', async () => {
    Image.getBelongsToNodeTypeRelationships = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/images/1234/belongs-to-node-type')

    expect(response.statusCode)
        .toBe(404)
})
test('Semantic or runtime error', async () => {
    vi.spyOn(Image, 'getBelongsToNodeTypeRelationships')
        .mockImplementation(async () => {
            throw new Error('semantic error')
        })

    const response = await request(app)
        .get('/images/1234/belongs-to-node-type')

    expect(response.statusCode)
        .toBe(422)
})
test('Node exists, but has no relationships', async () => {
    Image.getBelongsToNodeTypeRelationships = vi.fn().mockReturnValue({
        brands: [],
        car_models: [],
    })

    const response = await request(app)
        .get('/images/1234/belongs-to-node-type')

    expect(response.statusCode)
        .toBe(200)
})
