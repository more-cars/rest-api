import {Given, world} from "@cucumber/cucumber"

Given('{string} {string} does NOT exist',
    async (nodeType: string, label: string) => {
        const node: any = {
            node_type: 'blubb',
            properties: {
                id: -Math.ceil(Math.random() * 1000),
                external_id: "Non-existing Image",
            }
        }

        world.rememberNode(node, label, nodeType.toLowerCase())
    })
