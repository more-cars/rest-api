import {faker} from "@faker-js/faker"
import {Neo4jError} from "neo4j-driver"
import {createNode} from "../../../../../../src/db/nodes/brands/createNode"

// TODO to be discussed -> should the db layer perform those types of checks?
test.skip('Creating a new node is not possible when mandatory fields are missing', async () => {
    // @ts-expect-error circumventing the typescript checks to force the error on database side
    await expect(createNode({
        defunct: faker.number.int({min: 1000, max: 3000}),
    })).rejects
        .toThrow(Neo4jError)
})

