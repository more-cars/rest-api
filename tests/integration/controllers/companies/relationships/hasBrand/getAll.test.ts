import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Company} from "../../../../../../src/models/companies/Company"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {Brand} from "../../../../../../src/models/brands/Brand"

test('Database request failed', async () => {
    vi.spyOn(Company, 'getAllHasBrandRelationships')
        .mockImplementation(async () => {
            throw new Error()
        })

    const response = await request(app)
        .get('/companies/1234/has-brand')

    expect(response.statusCode)
        .toBe(500)
})

test('Company does not exist', async () => {
    vi.spyOn(Company, 'getAllHasBrandRelationships')
        .mockImplementation(async () => {
            throw new NodeNotFoundError(1234)
        })

    const response = await request(app)
        .get('/companies/1234/has-brand')

    expect(response.statusCode)
        .toBe(404)
})

test('Company exists, but has no relationships', async () => {
    Company.getAllHasBrandRelationships = vi.fn().mockReturnValue([])

    const response = await request(app)
        .get('/companies/1234/has-brand')

    expect(response.statusCode)
        .toBe(200)
})

test('Company exists and has relationships', async () => {
    Company.getAllHasBrandRelationships = vi.fn().mockReturnValue([
        {
            relationship_id: 4,
            relationship_name: 'has-brand',
        }, {
            relationship_id: 5,
            relationship_name: 'has-brand',
        }, {
            relationship_id: 6,
            relationship_name: 'has-brand',
        }
    ])

    Brand.findById = vi.fn().mockReturnValue(null)

    const response = await request(app)
        .get('/companies/1234/has-brand')

    expect(response.statusCode)
        .toBe(200)
})
