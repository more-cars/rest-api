import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {Node} from "../../../../src/models/Node"
import {app} from "../../../../src/app"
import {RelType} from "../../../../src/models/relationships/types/RelType"
import {FakeBrand} from "../../../_toolbox/fixtures/nodes/FakeBrand"
import {FakeCarModel} from "../../../_toolbox/fixtures/nodes/FakeCarModel"
import {FakeRaceTrack} from "../../../_toolbox/fixtures/nodes/FakeRaceTrack"
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
        const imageRelA = {
            id: 1,
            type: RelType.NodeHasPrimeImage,
            origin: FakeBrand.modelOutput,
            destination: FakeImage.modelOutput,
            created_at: "DUMMY",
            updated_at: "DUMMY",
        }

        const imageRelB = {
            id: 2,
            type: RelType.NodeHasPrimeImage,
            origin: FakeCarModel.modelOutput,
            destination: FakeImage.modelOutput,
            created_at: "DUMMY",
            updated_at: "DUMMY",
        }

        const imageRelC = {
            id: 3,
            type: RelType.NodeHasPrimeImage,
            origin: FakeRaceTrack.modelOutput,
            destination: FakeImage.modelOutput,
            created_at: "DUMMY",
            updated_at: "DUMMY",
        }

        Node.findPrimeImages = vi.fn().mockReturnValue([
            imageRelA,
            imageRelB,
            imageRelC,
        ])

        const response = await request(app)
            .get('/nodes/111,222,333/has-prime-image')

        expect(response.status)
            .toEqual(200)

        expect(response.body.data)
            .toHaveLength(3)

        expect(response.body.data[0].data.partner_node.node_type)
            .toEqual('images')

        expect(response.body.data[0].data.partner_node.data.id)
            .toEqual(imageRelA.destination.attributes.id)
    })

    test('when not all nodes have one', async () => {
        const imageRelA = {
            id: 1,
            type: RelType.NodeHasPrimeImage,
            origin: FakeBrand.modelOutput,
            destination: FakeImage.modelOutput,
            created_at: "DUMMY",
            updated_at: "DUMMY",
        }

        const imageRelC = {
            id: 3,
            type: RelType.NodeHasPrimeImage,
            origin: FakeRaceTrack.modelOutput,
            destination: FakeImage.modelOutput,
            created_at: "DUMMY",
            updated_at: "DUMMY",
        }

        Node.findPrimeImages = vi.fn().mockReturnValue([
            imageRelA,
            imageRelC,
        ])

        const response = await request(app)
            .get('/nodes/111,222,333/has-prime-image')

        expect(response.status)
            .toEqual(200)

        expect(response.body.data)
            .toHaveLength(2)
    })
})
