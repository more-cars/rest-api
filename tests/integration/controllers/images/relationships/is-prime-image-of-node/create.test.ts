import {describe, expect, test, vi} from 'vitest'
import request from 'supertest'
import {app} from '../../../../../../src/app'
import {Image} from "../../../../../../src/models/node-types/images/Image"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../../../../src/models/types/RelAlreadyExistsError"
import {RelType} from "../../../../../../src/models/relationships/types/RelType"
import {getFakeRel} from "../../../../../_toolbox/fixtures/relationships/getFakeRel"
import {ControllerNodeType} from "../../../../../../src/controllers/types/ControllerNodeType"

describe('Creating a ›is-prime-image-of-node‹ relationship', () => {
    test('Providing valid data', async () => {
        Image.createIsPrimeImageOfNodeRelationship = vi.fn().mockReturnValue(getFakeRel(RelType.ImageIsPrimeImageOfNode))

        const response = await request(app)
            .post('/images/123/relationships/is-prime-image-of-node')
            .send({
                data: {
                    type: ControllerNodeType.Node,
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(204)
    })

    test('Providing invalid data', async () => {
        vi.spyOn(Image, 'createIsPrimeImageOfNodeRelationship')
            .mockImplementation(async () => {
                throw new NodeNotFoundError(123)
            })

        const response = await request(app)
            .post('/images/123/relationships/is-prime-image-of-node')
            .send({
                data: {
                    type: "is-prime-image-of-node",
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(404)
    })

    test('Providing valid data, but the database call randomly fails', async () => {
        vi.spyOn(Image, 'createIsPrimeImageOfNodeRelationship')
            .mockImplementation(async () => {
                throw new Error('Arbitrary error')
            })

        const response = await request(app)
            .post('/images/123/relationships/is-prime-image-of-node')
            .send({
                data: {
                    type: "is-prime-image-of-node",
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(500)
    })

    test('Trying to create the same relationship again', async () => {
        vi.spyOn(Image, 'createIsPrimeImageOfNodeRelationship')
            .mockImplementation(async () => {
                throw new RelAlreadyExistsError('is-prime-image-of-node', 123, 567)
            })

        const response = await request(app)
            .post('/images/123/relationships/is-prime-image-of-node')
            .send({
                data: {
                    type: ControllerNodeType.Node,
                    id: 567,
                }
            })

        expect(response.statusCode)
            .toBe(304)
    })
})
