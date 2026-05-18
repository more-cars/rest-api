import {describe, expect, test} from "vitest"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {fetchNodesFromDb} from "../../../../../src/db/nodes/fetchNodesFromDb"
import {DbFilterOperator} from "../../../../../src/db/types/DbFilterOperator"

describe('get sorted node collection - sorting is case-insensitive', () => {
    test('for node type MAGAZINE', async () => {
        await seedNode(DbNodeType.Magazine, {name: 'sport auto'})
        await seedNode(DbNodeType.Magazine, {name: 'Top Gear'})
        await seedNode(DbNodeType.Magazine, {name: 'Auto Bild'})
        await seedNode(DbNodeType.Magazine, {name: 'evo UK'})

        const nodes = await fetchNodesFromDb(DbNodeType.Magazine, {
            filterByProperty: "mc_id",
            filterOperator: DbFilterOperator.not_equal,
            filterValue: "-1",
            limit: 100,
            offset: 0,
            sortByProperty: "name",
            sortDirection: "ASC"
        })

        expect(nodes.length).to.equal(4)
        expect(nodes[0].properties.name).toEqual('Auto Bild')
        expect(nodes[1].properties.name).toEqual('evo UK')
        expect(nodes[2].properties.name).toEqual('sport auto')
        expect(nodes[3].properties.name).toEqual('Top Gear')
    })
})
