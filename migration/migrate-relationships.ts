import {confirm, select} from "@inquirer/prompts"
import {NodeTypeMapping} from "./lib/NodeTypeMapping"
import type {NodeTypeLabel} from "../src/db/NodeTypeLabel"
import type {NodeTypeLabelOld} from "./lib/types/NodeTypeLabelOld"
import cliProgress from "cli-progress"
import type {DbRelationship} from "../src/db/types/DbRelationship"
import {deleteRelationshipsOfType} from "./lib/deleteRelationshipsOfType"
import {fetchOldRelationshipsOfType} from "./lib/fetchOldRelationshipsOfType"
import {RelationshipTypeMapping} from "./lib/RelationshipTypeMapping"
import type {RelationshipTypeLabelOld} from "./lib/types/RelationshipTypeLabelOld"
import {createDbRelationship} from "../src/db/relationships/createDbRelationship"
import {addMoreCarsIdToRelationship} from "../src/db/relationships/addMoreCarsIdToRelationship"
import {addTimestampsToRelationship} from "../src/db/relationships/addTimestampsToRelationship"

migrateRelationshipsOfType().then(() => true)

async function migrateRelationshipsOfType() {
    const newStartNodeType = await promptStartNodeType()
    const oldStartNodeType = NodeTypeMapping.get(newStartNodeType) as NodeTypeLabelOld
    const newEndNodeType = await promptEndNodeType()
    const oldEndNodeType = NodeTypeMapping.get(newEndNodeType) as NodeTypeLabelOld
    const newRelationshipType = await promptRelationshipType()
    const oldRelationshipType = RelationshipTypeMapping.get(newRelationshipType) as RelationshipTypeLabelOld

    const deleteRelationships = await promptDeleteRelationships()
    if (deleteRelationships) {
        await deleteRelationshipsOfType(newRelationshipType, newStartNodeType)
    }

    let records
    if (relationshipIsInversed(newRelationshipType)) {
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
        if (relationshipIsInversed(newRelationshipType)) {
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

async function promptStartNodeType() {
    const choices = [
        {value: 'Company'},
        {value: 'Brand'},
        {value: 'CarModel'},
        {value: 'Image'},
    ]

    const nodeType = await select({
        message: 'Start node type of the relationship?',
        choices,
    })

    return nodeType as NodeTypeLabel
}

async function promptEndNodeType() {
    const choices = [
        {value: 'Company'},
        {value: 'Brand'},
        {value: 'CarModel'},
        {value: 'Image'},
    ]

    const nodeType = await select({
        message: 'End node type of the relationship?',
        choices,
    })

    return nodeType as NodeTypeLabel
}

async function promptRelationshipType() {
    const choices = [
        {value: 'HAS_CAR_MODEL'},
        {value: 'HAS_IMAGE'},
        {value: 'HAS_PRIME_IMAGE'},
    ]

    const relationshipType = await select({
        message: 'Migrating all relationships of which type?',
        choices,
    })

    return relationshipType as DbRelationship
}

async function promptDeleteRelationships() {
    return confirm({
        message: 'Should all existing relationships of the selected type be DELETED from the target database before migration?',
        default: true,
    })
}

function relationshipIsInversed(relationshipType: DbRelationship) {
    if (relationshipType === 'HAS_PRIME_IMAGE') {
        return true
    }

    return false
}
