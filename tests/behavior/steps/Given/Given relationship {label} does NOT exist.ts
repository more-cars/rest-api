import {Given} from "@cucumber/cucumber"
import {RelationshipManager} from "../../lib/RelationshipManager"
import type {RelationResponse} from "../../../../src/controllers/types/RelationResponse"
import type {ControllerNodeType} from "../../../../src/controllers/types/ControllerNodeType"

Given('relationship {string} does NOT exist',
    async (label: string) => {
        const relationship = {
            links: {
                self: '/dummy',
                related: '/dummy',
            },
            data: {
                type: 'dummy' as ControllerNodeType,
                id: 4321,
                attributes: {
                    id: 4321,
                },
            }
        } satisfies RelationResponse

        RelationshipManager.cacheRelationship(relationship, label)
    })
