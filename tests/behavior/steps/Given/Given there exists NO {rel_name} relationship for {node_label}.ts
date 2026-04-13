import {Given} from "@cucumber/cucumber"

Given('there exists NO {string} relationship for {string}',
    async function (relationshipName: string, startNodeLabel: string) {
        // Nothing to do here.
        // This step only exists to be able to better describe the intention of the scenario.
        // There never exists anything in the database that was not explicitly created by the scenario itself.
        // So there is no need to delete something that doesn't exist anyway.
    })
