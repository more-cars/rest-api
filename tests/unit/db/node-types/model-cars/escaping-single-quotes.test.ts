import {expect, test} from 'vitest'
import {InputModelCarCreate} from "../../../../../src/db/node-types/model-cars/types/InputModelCarCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputModelCarCreate = {
        name: "'BMW 2002",
        product_code: "'DHX60",
        release_year: null,
        scale: "'1:64",
        series: "'BMW"
    }

    const query = createNodeQuery(DbNodeType.ModelCar, data, "2025-05-14T11:05:07.793Z")

    expect(query)
        .toEqual(
            "CREATE (n:ModelCar_A_" + appInstanceId + " {\n" +
            "  name: '\\'BMW 2002',\n" +
            "  product_code: '\\'DHX60',\n" +
            "  release_year: null,\n" +
            "  scale: '\\'1:64',\n" +
            "  series: '\\'BMW',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
