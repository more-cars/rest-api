import {Given} from "@cucumber/cucumber"
import {RelationType} from "../../../../src/controllers/types/RelationType"
import {RelationshipManager} from "../../lib/RelationshipManager"
import type {RelationResponse} from "../../../../src/controllers/types/RelationResponse"

Given('relationship {string} does NOT exist',
    async (label: string) => {
        const relationship = {
            data: {
                relationship_id: -Math.ceil(Math.random() * 1000),
                relationship_name: 'DUMMY' as RelationType,
                relationship_partner: {
                    node_type: 'DUMMY' as RelationType,
                    data: {
                        id: 1234,
                        created_at: 'DUMMY',
                        updated_at: 'DUMMY',
                    },
                },
                created_at: 'DUMMY',
                updated_at: 'DUMMY',
            }
        } satisfies RelationResponse

        RelationshipManager.cacheRelationship(relationship, label)
    })
