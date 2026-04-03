import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../../src/app"
import {Node} from "../../../../src/models/Node"
import {FakeImage} from "../../../_toolbox/fixtures/nodes/FakeImage"

describe('Requesting the connected prime images', () => {
    test('when the provided nodes do not have one', async () => {
        Node.findPrimeImages = vi.fn().mockReturnValue([])

        const response = await request(app)
            .get('/nodes/111,222,333/has-prime-image')

        expect(response.status)
            .toEqual(200)

        expect(response.body.data)
            .toHaveLength(0)
    })

    test('when the provided nodes have one', async () => {
        const primeImageA = FakeImage.modelOutput
        const primeImageB = FakeImage.modelOutput
        const primeImageC = FakeImage.modelOutput

        Node.findPrimeImages = vi.fn().mockReturnValue([
            primeImageA,
            primeImageB,
            primeImageC,
        ])

        const response = await request(app)
            .get('/nodes/111,222,333/has-prime-image')

        expect(response.status)
            .toEqual(200)

        expect(response.body.data)
            .toHaveLength(3)

        expect(response.body.data[0].type)
            .toEqual('images')

        expect(response.body.data[0].id)
            .toEqual(primeImageA.attributes.id)
    })

    test('when not all nodes have one', async () => {
        const primeImageA = FakeImage.modelOutput
        const primeImageC = FakeImage.modelOutput

        Node.findPrimeImages = vi.fn().mockReturnValue([
            primeImageA,
            primeImageC,
        ])

        const response = await request(app)
            .get('/nodes/111,222,333/has-prime-image')

        expect(response.status)
            .toEqual(200)

        expect(response.body.data)
            .toHaveLength(2)
    })
})
