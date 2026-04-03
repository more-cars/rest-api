import {describe, expect, test} from "vitest"
import {pluralize} from "inflection"
import {kebabCase} from "change-case"
import {getAllExpectedNodeTypes} from "../../../../_toolbox/getAllExpectedNodeTypes"
import {buildPaginationLinkLast} from "../../../../../src/controllers/nodes/meta-data/buildPaginationLinkLast"
import {convertStringToControllerNodeType} from "../../../../_toolbox/convertStringToNodeType"

describe('Pagination "last" link is constructed correctly', () => {
    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when there is only one page', async (nodeType) => {
        const expectedLink = `/${kebabCase(pluralize(nodeType.toLowerCase()))}`

        let constructedLink = buildPaginationLinkLast(convertStringToControllerNodeType(nodeType), {}, 99)
        expect(constructedLink).toEqual(expectedLink)

        constructedLink = buildPaginationLinkLast(convertStringToControllerNodeType(nodeType), {}, 100)
        expect(constructedLink).toEqual(expectedLink)
    })

    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when there are two pages', async (nodeType) => {
        const expectedLink = `/${kebabCase(pluralize(nodeType.toLowerCase()))}?page=2`

        let constructedLink = buildPaginationLinkLast(convertStringToControllerNodeType(nodeType), {}, 199)
        expect(constructedLink).toEqual(expectedLink)

        constructedLink = buildPaginationLinkLast(convertStringToControllerNodeType(nodeType), {}, 200)
        expect(constructedLink).toEqual(expectedLink)
    })

    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when there is constraint information', async (nodeType) => {
        const constructedLink = buildPaginationLinkLast(convertStringToControllerNodeType(nodeType), {
            filterByProperty: 'name',
            filterValue: 'test',
        }, 250)
        const expectedLink = `/${kebabCase(pluralize(nodeType.toLowerCase()))}?filter_by_property=name&filter_value=test&page=3`

        expect(constructedLink)
            .toEqual(expectedLink)
    })
})
