import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the returned nodes should be sorted {string} by {string}',
    (sortDirection: string, property: string) => {
        const response = world.recallResponse() as ApiResponse
        const data = response.body.data
        const returnedPropertyValues = data.map((node: any) => node[property])

        if (sortDirection === 'asc') {
            assert.deepEqual(returnedPropertyValues, returnedPropertyValues.toSorted())
        } else if (sortDirection === 'desc') {
            assert.deepEqual(returnedPropertyValues, returnedPropertyValues.toSorted().toReversed())
        } else {
            assert.fail('invalid sort direction')
        }
    })
