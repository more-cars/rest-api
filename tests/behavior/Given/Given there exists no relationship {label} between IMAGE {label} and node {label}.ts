import {Given} from "@cucumber/cucumber"

Given('there exists no IMAGE relationship between IMAGE {string} and {string} {string}',
    async function (imageLabel: string, partnerNodeType: string, partnerNodeLabel: string) {
        // TODO delete relationship if it exists
    })
