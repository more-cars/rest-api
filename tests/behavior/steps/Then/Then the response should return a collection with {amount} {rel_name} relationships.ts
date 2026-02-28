import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {kebabCase} from "change-case"
import type {ApiResponse} from "../../lib/ApiResponse"

Then('the response should return a collection with {int} {string} relationships',
    (amount: number, relationshipName: string) => {
        const response = world.recallResponse() as ApiResponse
        const relationships = response.body.data

        assert.equal(relationships.length, amount)

        relationships.forEach((relationship: any) => {
            assert.equal(relationship.data.relationship_name, kebabCase(relationshipName))
        })
    })
