import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: QueryInputData = {
        name: "'Top Gear",
        founded: null,
        defunct: null,
        focus: "'sports cars",
        publication_frequency: "'monthly",
        single_copy_price: null,
        single_copy_price_unit: "'£",
        publication_format: "'print",
        circulation: null,
        circulation_year: null,
        publisher: "'Immediate Media Company",
        issn: "'1350-9624",
        country_code: "'GB",
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
    }

    const query = createNodeQuery(DbNodeType.Magazine, data)

    expect(query)
        .toEqual(
            "CREATE (n:Magazine_A_" + appInstanceId + " {\n" +
            "  name: '\\'Top Gear',\n" +
            "  founded: null,\n" +
            "  defunct: null,\n" +
            "  focus: '\\'sports cars',\n" +
            "  publication_frequency: '\\'monthly',\n" +
            "  single_copy_price: null,\n" +
            "  single_copy_price_unit: '\\'£',\n" +
            "  publication_format: '\\'print',\n" +
            "  circulation: null,\n" +
            "  circulation_year: null,\n" +
            "  publisher: '\\'Immediate Media Company',\n" +
            "  issn: '\\'1350-9624',\n" +
            "  country_code: '\\'GB',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
