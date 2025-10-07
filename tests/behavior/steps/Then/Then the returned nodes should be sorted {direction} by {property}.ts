import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the returned nodes should be sorted {string} by {string}',
    (sortDirection: string, property: string) => {
        const responseData = world.recallResponse().data
        const returnedPropertyValues = responseData.map((node: any) => node[property])

        if (sortDirection === 'asc') {
            assert.deepEqual(returnedPropertyValues, returnedPropertyValues.toSorted())
        } else if (sortDirection === 'desc') {
            assert.deepEqual(returnedPropertyValues, returnedPropertyValues.toSorted().toReversed())
        } else {
            assert.fail('invalid sort direction')
        }
    })
