import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {ResponseManager} from "../../lib/ResponseManager"
import type {NodeResponse} from "../../../../src/controllers/types/NodeResponse"

Then('the returned nodes should be sorted {string} by {string}',
    (sortDirection: string, property: string) => {
        const response = ResponseManager.getPreviousResponse()
        const data = response.body.data as NodeResponse[]
        const returnedPropertyValues = data.map(node => node.attributes[property])

        if (sortDirection === 'asc') {
            assert.deepEqual(returnedPropertyValues, returnedPropertyValues.toSorted())
        } else if (sortDirection === 'desc') {
            assert.deepEqual(returnedPropertyValues, returnedPropertyValues.toSorted().toReversed())
        } else {
            assert.fail('invalid sort direction')
        }
    })
