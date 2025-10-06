import {Given} from "@cucumber/cucumber"

Given('there exists NO {string} relationship {string} between {string} and {string}',
    async function (relationshipName: string, relationshipLabel: string, startNodeLabel: string, endNodeLabel: string) {
        // TODO delete relationship if it exists
    })
