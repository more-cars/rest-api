import {Given} from "@cucumber/cucumber"

Given('{string} {string} does NOT exist', async function (nodeType: string, label: string) {
    const node: any = {
        id: -Math.ceil(Math.random() * 1000),
        external_id: "Non-existing Image",
    }

    this[nodeType.toLowerCase().replace(' ', '')][label] = node
})
