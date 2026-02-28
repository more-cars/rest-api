import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should NOT return the relationship {string}',
    (label: string) => {
        const rememberedRelationship = world.recallRelationship(label)
        const response = world.recallResponse() as ApiResponse
        const returnedRelationship = response.body.data

        assert.notDeepStrictEqual(
            rememberedRelationship,
            returnedRelationship,
        )
    })
