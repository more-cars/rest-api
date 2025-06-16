import {faker} from "@faker-js/faker"
import {Neo4jError} from "neo4j-driver"
import {createNode} from "../../../../../src/db/car-models/createNode"
import FakeCarModel from "../../../../fixtures/nodes/FakeCarModel"

test('Creating a new node is not possible when mandatory fields are missing', async () => {
    // @ts-expect-error circumventing the typescript checks to force the error on database side
    await expect(createNode({
        built_to: faker.number.int({min: 1000, max: 3000}),
    })).rejects
        .toThrow(Neo4jError)
})

test('When providing valid data the new node can be created', async () => {
    const createdNode = await createNode(FakeCarModel)

    expect(createdNode)
        .toEqual(expect.objectContaining(FakeCarModel))
})
