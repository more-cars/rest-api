import cliProgress from "cli-progress"
import {NodeTypeMapping} from "./src/NodeTypeMapping"
import type {NodeTypeLabelOld} from "./src/types/NodeTypeLabelOld"
import {RelationshipTypeMapping} from "./src/RelationshipTypeMapping"
import {RelationshipTypeLabelOld} from "./src/types/RelationshipTypeLabelOld"
import {fetchOldRelationshipsOfType} from "./src/fetchOldRelationshipsOfType"
import {deleteAllRelationshipsOfType} from "../tests/_toolbox/dbSeeding/deleteAllRelationshipsOfType"
import {createDbRelationship} from "../src/db/relationships/createDbRelationship"
import {addMoreCarsIdToRelationship} from "../src/db/relationships/addMoreCarsIdToRelationship"
import {addTimestampsToRelationship} from "../src/db/relationships/addTimestampsToRelationship"
import {NodeTypeLabel} from "../src/db/NodeTypeLabel"
import {DbRelationship} from "../src/db/types/DbRelationship"

migrateRelationshipsOfType().then(() => true)

async function migrateRelationshipsOfType() {
    const newStartNodeType = await determineStartNodeType()
    const oldStartNodeType = NodeTypeMapping.get(newStartNodeType) as NodeTypeLabelOld
    const newEndNodeType = await determineEndNodeType()
    const oldEndNodeType = NodeTypeMapping.get(newEndNodeType) as NodeTypeLabelOld
    const newRelationshipType = await determineRelationshipType()
    const oldRelationshipType = RelationshipTypeMapping.get(newRelationshipType) as RelationshipTypeLabelOld

    const deleteRelationships = await determineDeleteRelationships()
    if (deleteRelationships) {
        await deleteAllRelationshipsOfType(newRelationshipType, newStartNodeType, newEndNodeType)
    }

    let records
    if (isRelationshipReversedInOldDb(newRelationshipType)) {
        records = await fetchOldRelationshipsOfType(oldRelationshipType, oldEndNodeType, oldStartNodeType)
    } else {
        records = await fetchOldRelationshipsOfType(oldRelationshipType, oldStartNodeType, oldEndNodeType)
    }

    const progress = new cliProgress.SingleBar({
        format: `{bar} | ${newStartNodeType} ${newRelationshipType} ${newEndNodeType} | ETA: {eta}s | {value}/{total}`
    })

    progress.start(records.length, 0)
    for (const record of records) {
        const oldRelationship = record.get('rel')
        let newRelationship
        if (isRelationshipReversedInOldDb(newRelationshipType)) {
            newRelationship = await createDbRelationship(parseInt(oldRelationship.end) + 10_000_000, parseInt(oldRelationship.start) + 10_000_000, newRelationshipType)
        } else {
            newRelationship = await createDbRelationship(parseInt(oldRelationship.start) + 10_000_000, parseInt(oldRelationship.end) + 10_000_000, newRelationshipType)
        }
        if (newRelationship) {
            await addMoreCarsIdToRelationship(newRelationship.elementId, parseInt(oldRelationship.elementId) + 10_000_000)
            await addTimestampsToRelationship(newRelationship.elementId, oldRelationship.properties.created_at, oldRelationship.properties.updated_at)
        } else {
            console.error('Relationship could not be migrated: #', oldRelationship.elementId)
        }
        progress.increment(1)
    }
    progress.stop()
}

async function determineStartNodeType() {
    const startNodeType = process.env.START_NODE_TYPE

    if (!startNodeType && startNodeType === "") {
        throw new Error('Start node type missing')
    }

    return startNodeType as NodeTypeLabel
}

async function determineEndNodeType() {
    const endNodeType = process.env.END_NODE_TYPE

    if (!endNodeType && endNodeType === "") {
        throw new Error('End node type missing')
    }

    return endNodeType as NodeTypeLabel
}

async function determineRelationshipType() {
    const relationshipType = process.env.MIGRATE_RELATIONSHIP_TYPE

    if (!relationshipType && relationshipType === "") {
        throw new Error('Start node type missing')
    }

    return relationshipType as DbRelationship
}

async function determineDeleteRelationships() {
    const deleteRels = process.env.DELETE_EXISTING_DATA

    return deleteRels === 'true'
}

function isRelationshipReversedInOldDb(newRelationshipType: DbRelationship) {
    return [
        DbRelationship.CarModelHasSuccessor,
        DbRelationship.RacingEventIsFollowedByEvent,
        DbRelationship.NodeHasPrimeImage,
    ].includes(newRelationshipType)
}
