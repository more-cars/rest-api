import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the returned nodes should be sorted {string} by {string}',
    (sortDirection: string, property: string) => {
        const responseData = world.recallResponse().data
        const returnedPropertyValues = responseData.map((node: any) => node[property])
        const expectedPropertyValues = returnedPropertyValues.toSorted()

        console.log(returnedPropertyValues)
        console.log(expectedPropertyValues)
        console.log(expectedPropertyValues.toReversed())

        if (sortDirection === 'asc') {
            assert.deepEqual(returnedPropertyValues, returnedPropertyValues.toSorted())
        } else if (sortDirection === 'desc') {
            assert.deepEqual(returnedPropertyValues, returnedPropertyValues.toSorted().toReversed())
        } else {
            assert.fail('invalid sort direction')
        }
    })
