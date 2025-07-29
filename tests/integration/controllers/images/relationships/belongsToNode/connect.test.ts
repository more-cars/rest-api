import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Image} from "../../../../../../src/models/images/Image"

test('One of the nodes does not exist', async () => {
    Image.createBelongsToNodeRelationship = vi.fn().mockReturnValue(false)

    const response = await request(app)
        .post('/images/1234/belongs-to-node/5')

    expect(response.statusCode)
        .toBe(404)
})

test('Both nodes are from the same type', async () => {
    vi.spyOn(Image, 'createBelongsToNodeRelationship')
        .mockImplementation(async () => {
            throw new Error('semantic error')
        })

    const response = await request(app)
        .post('/images/1234/belongs-to-node/1234')

    expect(response.statusCode)
        .toBe(422)
})

test('Both nodes exist and are valid relationship partners', async () => {
    Image.createBelongsToNodeRelationship = vi.fn().mockReturnValue({
        relationship_id: 4
    })

    const response = await request(app)
        .post('/images/1234/belongs-to-node/5')

    expect(response.statusCode)
        .toBe(201)
})
