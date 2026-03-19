import {describe, expect, test} from "vitest"
import {pluralize} from "inflection"
import {kebabCase} from "change-case"
import {getAllExpectedNodeTypes} from "../../../../_toolbox/getAllExpectedNodeTypes"
import {buildPaginationLinkFirst} from "../../../../../src/controllers/nodes/meta-data/buildPaginationLinkFirst"
import {convertStringToControllerNodeType} from "../../../../_toolbox/convertStringToNodeType"

describe('Pagination "first" link is constructed correctly', () => {
    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when the current page number is 1', async (nodeType) => {
        const constructedLink = buildPaginationLinkFirst(convertStringToControllerNodeType(nodeType), {page: 1})
        const expectedLink = `/${kebabCase(pluralize(nodeType.toLowerCase()))}`

        expect(constructedLink)
            .toEqual(expectedLink)
    })

    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when the current page number is greater than 1', async (nodeType) => {
        const pageNumber = Math.ceil(Math.random() * 50) + 1
        const constructedLink = buildPaginationLinkFirst(convertStringToControllerNodeType(nodeType), {page: pageNumber})
        const expectedLink = `/${kebabCase(pluralize(nodeType.toLowerCase()))}`

        expect(constructedLink)
            .toEqual(expectedLink)
    })

    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when there is constraint information', async (nodeType) => {
        const pageNumber = Math.ceil(Math.random() * 50) + 1
        const constructedLink = buildPaginationLinkFirst(convertStringToControllerNodeType(nodeType), {
            page: pageNumber,
            filterByProperty: 'name',
            filterValue: 'test',
        })
        const expectedLink = `/${kebabCase(pluralize(nodeType.toLowerCase()))}?filter_by_property=name&filter_value=test`

        expect(constructedLink)
            .toEqual(expectedLink)
    })
})
