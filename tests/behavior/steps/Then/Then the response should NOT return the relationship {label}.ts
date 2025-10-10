import {Then, world} from "@cucumber/cucumber"
import assert from "assert"

Then('the response should NOT return the relationship {string}',
    (label: string) => {
        const rememberedRelationship = world.recallRelationship(label)
        const returnedRelationship = world.recallResponse().data.data

        assert.notDeepStrictEqual(
            rememberedRelationship,
            returnedRelationship,
        )
    })
