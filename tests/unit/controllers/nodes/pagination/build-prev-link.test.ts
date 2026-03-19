import {describe, expect, test} from "vitest"
import {pluralize} from "inflection"
import {kebabCase} from "change-case"
import {getAllExpectedNodeTypes} from "../../../../_toolbox/getAllExpectedNodeTypes"
import {buildPaginationLinkPrev} from "../../../../../src/controllers/nodes/meta-data/buildPaginationLinkPrev"
import {convertStringToControllerNodeType} from "../../../../_toolbox/convertStringToNodeType"

describe('Pagination "prev" link is constructed correctly', () => {
    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when the current page number is 1', async (nodeType) => {
        const constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {page: 1})
        const expectedLink = `/${kebabCase(pluralize(nodeType.toLowerCase()))}`

        expect(constructedLink)
            .toEqual(expectedLink)
    })

    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when the current page number is 2', async (nodeType) => {
        const constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {page: 2})
        const expectedLink = `/${kebabCase(pluralize(nodeType.toLowerCase()))}`

        expect(constructedLink)
            .toEqual(expectedLink)
    })

    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when the current page number is greater than 2', async (nodeType) => {
        const pageNumber = Math.ceil(Math.random() * 50) + 2
        const constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {page: pageNumber})
        const expectedLink = `/${kebabCase(pluralize(nodeType.toLowerCase()))}?page=${pageNumber - 1}`

        expect(constructedLink)
            .toEqual(expectedLink)
    })

    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when there is constraint information', async (nodeType) => {
        const pageNumber = Math.ceil(Math.random() * 50) + 2
        const constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {
            page: pageNumber,
            filterByProperty: 'name',
            filterValue: 'test',
        })
        const expectedLink = `/${kebabCase(pluralize(nodeType.toLowerCase()))}?filter_by_property=name&filter_value=test&page=${pageNumber - 1}`

        expect(constructedLink)
            .toEqual(expectedLink)
    })
})
