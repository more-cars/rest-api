import {Neo4jError} from "neo4j-driver"
import {createNode} from "../../../../../src/db/nodes/images/createNode"
import {faker} from "@faker-js/faker"
import FakeImageFull from "../../../../fixtures/nodes/FakeImageFull"

// TODO to be discussed -> should the db layer perform those types of checks?
test.skip('Creating a new node is not possible when mandatory fields are missing', async () => {
    // @ts-expect-error circumventing the typescript checks to force the error on database side
    await expect(createNode({
        image_provider: faker.commerce.product()
    })).rejects
        .toThrow(Neo4jError)
})

test('When providing valid data the new node can be created', async () => {
    const createdNode = await createNode(FakeImageFull)

    expect(createdNode)
        .toEqual(expect.objectContaining(FakeImageFull))
})
