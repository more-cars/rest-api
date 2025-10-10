import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Image} from "../../../../../../src/models/images/Image"
import {Node} from "../../../../../../src/models/Node"

test('Node does not exist', async () => {
    Image.getBelongsToNodeRelationship = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .get('/images/1234/belongs-to-node/567')

    expect(response.statusCode)
        .toBe(404)
})
test('Semantic error', async () => {
    vi.spyOn(Image, 'getBelongsToNodeRelationship')
        .mockImplementation(async () => {
            throw new Error('semantic error')
        })

    const response = await request(app)
        .get('/images/1234/belongs-to-node/567')

    expect(response.statusCode)
        .toBe(422)
})
test('Both nodes exists and have a relationship with each other', async () => {
    Image.getBelongsToNodeRelationship = vi.fn().mockReturnValue({
        relationship_id: 4,
        relationship_name: 'belongs-to-node',
    })

    Node.findById = vi.fn().mockReturnValue(null)

    const response = await request(app)
        .get('/images/1234/belongs-to-node/567')

    expect(response.statusCode)
        .toBe(200)
})
