import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Brand} from "../../../../../../src/models/brands/Brand"
import {Image} from "../../../../../../src/models/images/Image"

test('Node does not exist', async () => {
    vi.spyOn(Brand, 'getRelationshipsForHasImage')
        .mockImplementation(async () => {
            throw new Error('semantic error')
        })

    const response = await request(app)
        .get('/brands/123/has-image')

    expect(response.statusCode)
        .toBe(404)
})

test('Node exists and has relationship partners', async () => {
    Brand.getRelationshipsForHasImage = vi.fn().mockReturnValue([
        {
            relationship_id: 4,
            relationship_name: 'has-image',
        }, {
            relationship_id: 5,
            relationship_name: 'has-image',
        }, {
            relationship_id: 6,
            relationship_name: 'has-image',
        }
    ])

    Image.findById = vi.fn().mockReturnValue(null)

    const response = await request(app)
        .get('/brands/123/has-image')

    expect(response.statusCode)
        .toBe(200)
})
