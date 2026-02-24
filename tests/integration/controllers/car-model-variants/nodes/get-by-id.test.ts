import {expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from "../../../../../src/app.ts"
import {CarModelVariant} from "../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

test('Node does not exist', async () => {
    CarModelVariant.findById = vi.fn().mockImplementation(() => {
        throw new NodeNotFoundError(-42)
    })

    const response = await request(app)
        .get('/car-model-variants/-42')

    expect(response.statusCode)
        .toBe(404)
})

test('Node does exist', async () => {
    CarModelVariant.findById = vi.fn().mockReturnValue({
        node_type: ModelNodeType.CarModelVariant,
        attributes: {
            id: 12345,
        },
    })

    const response = await request(app)
        .get('/car-model-variants/12345')

    expect(response.statusCode)
        .toBe(200)
})
