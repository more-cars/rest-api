import {describe, expect, test} from 'vitest'
import {seedBrand} from "../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {Node} from "../../../../../src/models/Node"
import {ModelNodeType} from "../../../../../src/models/types/ModelNodeType"
import {FilterOperator} from "../../../../../src/models/types/FilterOperator"

describe('get total amount of nodes - filtered node collection', () => {
    test('for node type BRAND', async () => {
        await seedBrand({name: 'BMW'})
        await seedBrand()
        await seedBrand()

        const nodeCount = await Node.getTotalAmount(ModelNodeType.Brand, {
            filterByProperty: "name",
            filterOperator: FilterOperator.equal,
            filterValue: "BMW",
        })

        expect(nodeCount)
            .to.equal(1)
    })
})
