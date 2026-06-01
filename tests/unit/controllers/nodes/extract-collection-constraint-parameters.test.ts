import {describe, expect, test} from 'vitest'
import {Request} from 'express'
import {extractCollectionConstraintParameters} from "../../../../src/controllers/nodes/extractCollectionConstraintParameters"
import {NodeType} from "../../../../src/specification/NodeType"

describe('Extracting sort, filter and pagination parameters from request', () => {
    test('pagination', async () => {
        const req = assembleRequest({
            page: '3',
        })

        const params = extractCollectionConstraintParameters(req, {
            type: NodeType.Node,
            properties: [],
        })

        expect(params.page)
            .toBe(3)
    })

    test('sorting', async () => {
        const req = assembleRequest({
            sort_by_property: 'name',
            sort_direction: 'asc',
        })

        const params = extractCollectionConstraintParameters(req, {
            type: NodeType.Node,
            properties: [{
                name: 'name',
                datatype: 'string',
                mandatory: false,
                validation: [],
            }],
        })

        expect(params.sortByProperty)
            .toBe('name')

        expect(params.sortDirection)
            .toBe('asc')
    })

    test('filtering', async () => {
        const req = assembleRequest({
            filter_by_property: 'drivetrain',
            filter_operator: 'eq',
            filter_value: 'rwd',
        })

        const params = extractCollectionConstraintParameters(req, {
            type: NodeType.Node,
            properties: [{
                name: 'drivetrain',
                datatype: 'string',
                mandatory: false,
                validation: [],
            }],
        })

        expect(params.filterByProperty)
            .toBe('drivetrain')

        expect(params.filterOperator)
            .toBe('eq')

        expect(params.filterValue)
            .toBe('rwd')
    })
})

type Query = {
    page?: string;
    sort_by_property?: string;
    sort_direction?: string;
    filter_by_property?: string;
    filter_operator?: string;
    filter_value?: string;
}

function assembleRequest(queryParams: Query): Request {
    return {
        query: queryParams,
        params: {},
        body: {},
        headers: {},
        get: () => undefined,
    } as unknown as Request
}
