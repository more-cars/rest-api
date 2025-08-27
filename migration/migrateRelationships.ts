import {getMc1Driver} from "../src/db/driver-mc1"
import neo4j from "neo4j-driver"
import cliProgress from "cli-progress"
import {createDbRelationship} from "../src/db/relationships/createDbRelationship"
import {DbRelationship} from "../src/db/types/DbRelationship"
import {
    deleteBrandHasCarModelRelationships
} from "../tests/_toolbox/dbSeeding/brands/relationships/deleteBrandHasCarModelRelationships"
import {
    deleteAllNodeHasImageRelationships
} from "../tests/_toolbox/dbSeeding/images/relationships/deleteAllNodeHasImageRelationships"
import {addTimestampsToRelationship} from "../src/db/relationships/addTimestampsToRelationship"
import {addMoreCarsIdToRelationship} from "../src/db/relationships/addMoreCarsIdToRelationship"
import {
    deleteAllHasPrimeImageRelationships
} from "../tests/_toolbox/dbSeeding/car-models/relationships/deleteAllHasPrimeImageRelationships"

export async function migrateRelationships() {
    await deleteBrandHasCarModelRelationships()
    await deleteAllNodeHasImageRelationships()
    await deleteAllHasPrimeImageRelationships()

    await migrate('brand', 'BUILDS_CAR_MODEL', 'carmodel', DbRelationship.BrandHasCarModel)
    await migrate('brand', 'HAS_IMAGE', 'image', DbRelationship.NodeHasImage)
    await migrate('carmodel', 'HAS_IMAGE', 'image', DbRelationship.NodeHasImage)
    await migrate('image', 'IS_MAIN_IMAGE_OF_NODE', 'carmodel', DbRelationship.CarModelHasPrimeImage, true)
}

async function migrate(
    oldStartNodeTypeLabel: string,
    oldRelationshipName: string,
    oldEndNodeTypeLabel: string,
    newRelationshipName: DbRelationship,
    newRelationshipIsReversed: boolean = false,
) {
    const driver = getMc1Driver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getOldRelationshipsQuery(oldStartNodeTypeLabel, oldRelationshipName, oldEndNodeTypeLabel))
        return result.records
    })

    const progress = new cliProgress.SingleBar({
        format: `{bar} | ${oldStartNodeTypeLabel} ${oldRelationshipName} ${oldEndNodeTypeLabel} | ETA: {eta}s | {value}/{total} | {speed} ms/rel`
    }, cliProgress.Presets.shades_classic)
    progress.start(records.length, 0, {
        speed: "N/A"
    })

    for (const record of records) {
        const dateBefore = new Date()
        const relationshipOld = record.get('rel')

        try {
            let newRelationship
            if (newRelationshipIsReversed) {
                newRelationship = await createDbRelationship(relationshipOld.end, relationshipOld.start, newRelationshipName)
            } else {
                newRelationship = await createDbRelationship(relationshipOld.start, relationshipOld.end, newRelationshipName)
            }

            if (newRelationship) {
                await addMoreCarsIdToRelationship(newRelationship.elementId, relationshipOld.elementId + 10000000)
                await addTimestampsToRelationship(newRelationship.elementId, relationshipOld.properties.created_at, relationshipOld.properties.updated_at)
            }
        } catch (e) {
            console.error(e)
            console.error(relationshipOld)
        }

        const dateAfter = new Date()
        const duration = dateAfter.getMilliseconds() - dateBefore.getMilliseconds()
        progress.increment(1, {speed: duration})
    }

    progress.stop()
    await session.close()
    await driver.close()

    return
}

function getOldRelationshipsQuery(startNode: string, relationshipName: string, endNode: string) {
    return `MATCH (a:${startNode})-[rel:${relationshipName}]->(:${endNode}) RETURN rel ORDER BY id(rel)`
}
