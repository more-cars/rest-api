import {Given, world} from "@cucumber/cucumber"

Given('{string} {string} does NOT exist',
    async (nodeType: string, label: string) => {
        const node: any = {
            id: -Math.ceil(Math.random() * 1000),
            external_id: "Non-existing Image",
        }

        world.rememberNode(node, label)
    })
