import {describe, expect, test} from "vitest"
import {pluralize} from "inflection"
import {kebabCase} from "change-case"
import {getAllExpectedNodeTypes} from "../../../../_toolbox/getAllExpectedNodeTypes"
import {buildPaginationLinkNext} from "../../../../../src/controllers/nodes/meta-data/buildPaginationLinkNext"
import {convertStringToControllerNodeType} from "../../../../_toolbox/convertStringToNodeType"

describe('Pagination "next" link is constructed correctly', () => {
    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when there is no next page', async (nodeType) => {
        const expectedLink = null

        let constructedLink = buildPaginationLinkNext(convertStringToControllerNodeType(nodeType), {page: 2}, 199)
        expect(constructedLink).toEqual(expectedLink)

        constructedLink = buildPaginationLinkNext(convertStringToControllerNodeType(nodeType), {page: 2}, 200)
        expect(constructedLink).toEqual(expectedLink)
    })

    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when there is a next page', async (nodeType) => {
        const expectedLink = `/${kebabCase(pluralize(nodeType.toLowerCase()))}?page=3`

        let constructedLink = buildPaginationLinkNext(convertStringToControllerNodeType(nodeType), {page: 2}, 201)
        expect(constructedLink).toEqual(expectedLink)

        constructedLink = buildPaginationLinkNext(convertStringToControllerNodeType(nodeType), {page: 2}, 555)
        expect(constructedLink).toEqual(expectedLink)
    })

    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when there is constraint information and a next page', async (nodeType) => {
        const pageNumber = Math.ceil(Math.random() * 50) + 1
        const constructedLink = buildPaginationLinkNext(convertStringToControllerNodeType(nodeType), {
            page: pageNumber,
            filterByProperty: 'name',
            filterValue: 'test',
        }, (pageNumber * 100) + 10)
        const expectedLink = `/${kebabCase(pluralize(nodeType.toLowerCase()))}?filter_by_property=name&filter_value=test&page=${pageNumber + 1}`

        expect(constructedLink)
            .toEqual(expectedLink)
    })

    test.each(
        getAllExpectedNodeTypes()
    )('for $0 when there is constraint information and no next page', async (nodeType) => {
        const pageNumber = Math.ceil(Math.random() * 50) + 1
        const constructedLink = buildPaginationLinkNext(convertStringToControllerNodeType(nodeType), {
            page: pageNumber,
            filterByProperty: 'name',
            filterValue: 'test',
        }, (pageNumber * 100) - 10)
        const expectedLink = null

        expect(constructedLink)
            .toEqual(expectedLink)
    })
})
