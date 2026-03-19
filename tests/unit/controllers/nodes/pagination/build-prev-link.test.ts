import {describe, expect, test} from "vitest"
import {pluralize} from "inflection"
import {kebabCase} from "change-case"
import {getAllExpectedNodeTypes} from "../../../../_toolbox/getAllExpectedNodeTypes"
import {buildPaginationLinkPrev} from "../../../../../src/controllers/nodes/meta-data/buildPaginationLinkPrev"
import {convertStringToControllerNodeType} from "../../../../_toolbox/convertStringToNodeType"

describe('Pagination "prev" link is constructed correctly', () => {
    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when the user is on page 1', async (nodeType) => {
        const expectedLink = null

        let constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {page: 1}, 0)
        expect(constructedLink).toEqual(expectedLink)

        constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {page: 1}, 50)
        expect(constructedLink).toEqual(expectedLink)

        constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {page: 1}, 99)
        expect(constructedLink).toEqual(expectedLink)

        constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {page: 1}, 100)
        expect(constructedLink).toEqual(expectedLink)
    })

    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when there is no previous page', async (nodeType) => {
        const expectedLink = null

        let constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {page: 3}, 0)
        expect(constructedLink).toEqual(expectedLink)

        constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {page: 3}, 50)
        expect(constructedLink).toEqual(expectedLink)

        constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {page: 3}, 99)
        expect(constructedLink).toEqual(expectedLink)

        constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {page: 3}, 100)
        expect(constructedLink).toEqual(expectedLink)
    })

    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when there is a previous page', async (nodeType) => {
        const expectedLink = `/${kebabCase(pluralize(nodeType.toLowerCase()))}?page=2`

        let constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {page: 3}, 101)
        expect(constructedLink).toEqual(expectedLink)

        constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {page: 3}, 555)
        expect(constructedLink).toEqual(expectedLink)
    })

    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when there is constraint information and a previous page', async (nodeType) => {
        const pageNumber = Math.ceil(Math.random() * 50) + 3
        const constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {
            page: pageNumber,
            filterByProperty: 'name',
            filterValue: 'test',
        }, pageNumber * 100)
        const expectedLink = `/${kebabCase(pluralize(nodeType.toLowerCase()))}?filter_by_property=name&filter_value=test&page=${pageNumber - 1}`

        expect(constructedLink)
            .toEqual(expectedLink)
    })

    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when there is constraint information and no previous page', async (nodeType) => {
        const pageNumber = Math.ceil(Math.random() * 50) + 5
        const constructedLink = buildPaginationLinkPrev(convertStringToControllerNodeType(nodeType), {
            page: pageNumber,
            filterByProperty: 'name',
            filterValue: 'test',
        }, (pageNumber * 100) - 210)
        const expectedLink = null

        expect(constructedLink)
            .toEqual(expectedLink)
    })
})
