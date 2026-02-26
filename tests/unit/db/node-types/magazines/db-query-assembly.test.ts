import {expect, test} from 'vitest'
import {InputMagazineCreate} from "../../../../../src/db/node-types/magazines/types/InputMagazineCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a MAGAZINE node', async () => {
    const data: InputMagazineCreate = {
        name: "Top Gear",
        founded: 1993,
        defunct: null,
        focus: "sports cars",
        publication_frequency: "monthly",
        single_copy_price: 5.99,
        single_copy_price_unit: "£",
        publication_format: "print",
        circulation: 150884,
        circulation_year: 2013,
        publisher: "Immediate Media Company",
        issn: "1350-9624"
    }

    const query = createNodeQuery(DbNodeType.Magazine, data)

    expect(query)
        .toEqual(
            "CREATE (node:Magazine_" + appInstanceId + " {\n" +
            "  name: 'Top Gear',\n" +
            "  founded: 1993,\n" +
            "  defunct: null,\n" +
            "  focus: 'sports cars',\n" +
            "  publication_frequency: 'monthly',\n" +
            "  single_copy_price: 5.99,\n" +
            "  single_copy_price_unit: '£',\n" +
            "  publication_format: 'print',\n" +
            "  circulation: 150884,\n" +
            "  circulation_year: 2013,\n" +
            "  publisher: 'Immediate Media Company',\n" +
            "  issn: '1350-9624'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
