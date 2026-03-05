import {describe, expect, test} from "vitest"
import {seedBrand} from "../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {fetchNodeCountByNodeType} from "../../../../../src/db/nodes/fetchNodeCountByNodeType"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {DbFilterOperator} from "../../../../../src/db/types/DbFilterOperator"

describe('get total amount of nodes - filtered node collection', () => {
    test('for node type BRAND', async () => {
        await seedBrand({name: 'BMW'})
        await seedBrand()
        await seedBrand()

        const nodeCountWithoutFilter = await fetchNodeCountByNodeType(DbNodeType.Brand)
        expect(nodeCountWithoutFilter).to.equal(3)

        const nodeCountWithFilter = await fetchNodeCountByNodeType(DbNodeType.Brand, {
            filterByProperty: "name",
            filterOperator: DbFilterOperator.not_equal,
            filterValue: "BMW",
            limit: 0,
            offset: 0,
            sortByProperty: "",
            sortDirection: ""
        })
        expect(nodeCountWithFilter).to.equal(2)
    })
})
