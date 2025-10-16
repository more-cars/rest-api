import {Given, world} from "@cucumber/cucumber"

Given('relationship {string} does NOT exist',
    async (label: string) => {
        const relationship: any = {
            relationship_id: -Math.ceil(Math.random() * 1000),
        }

        world.rememberRelationship(relationship, label)
    })
