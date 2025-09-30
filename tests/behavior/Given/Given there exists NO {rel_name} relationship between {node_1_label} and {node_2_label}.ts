import {Given} from "@cucumber/cucumber"

Given('there exists NO {string} relationship between {string} and {string}',
    async function (relationshipName: string, startNodeLabel: string, endNodeLabel: string) {
        // TODO delete relationship if it exists
    })
