import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertCompanyNeo4jNodeToDbNode} from "../../../../src/db/node-types/companies/convertCompanyNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../src/db/types/DbNodeType"
import type {CompanyNode} from "../../../../src/db/node-types/companies/types/CompanyNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "BMW AG",
            founded: 1916,
            defunct: null,
            headquarters_location: "Munich",
            legal_headquarters_location: "Munich",
        },
        elementId: "",
    }

    const mappedNode = convertCompanyNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.Company,
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "BMW AG",
                founded: 1916,
                defunct: null,
                headquarters_location: "Munich",
                legal_headquarters_location: "Munich",
            },
        } satisfies CompanyNode)
})
