import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {ImageNode} from "../../types/images/ImageNode"
import {ImageNodeUserData} from "../../types/images/ImageNodeUserData"
import {ImageNodeGeneratedData} from "../../types/images/ImageNodeGeneratedData"
import {setMoreCarsId} from "../addMoreCarsIdToNode"
import {addTimestampsToNode} from "../addTimestampsToNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"

export async function createNode(data: ImageNodeUserData & ImageNodeGeneratedData): Promise<ImageNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const createdNode = await createImage(data, driver)

    await session.close()
    await closeDriver(driver)

    return createdNode
}

async function createImage(data: ImageNodeUserData & ImageNodeGeneratedData, driver: Driver): Promise<ImageNode> {
    // 1. Creating the node in the database
    const {records} = await driver.executeQuery(`
            CREATE (node:Image {
                external_id: $external_id,
                image_provider: $image_provider,
                name: $name, 
                description: $description, 
                creator: $creator, 
                license: $license,
                tags: $tags,
                source: $source,
                image_url_original: $image_url_original,
                image_url_xxl: $image_url_xxl,
                image_url_xl: $image_url_xl,
                image_url_l: $image_url_l,
                image_url_m: $image_url_m,
                image_url_s: $image_url_s,
                image_url_xs: $image_url_xs
            }) 
            RETURN node 
            LIMIT 1`,
        {
            external_id: data.external_id,
            image_provider: data.image_provider,
            name: data.name,
            description: data.description,
            creator: data.creator,
            license: data.license,
            tags: data.tags,
            source: data.source,
            image_url_original: data.image_url_original,
            image_url_xxl: data.image_url_xxl,
            image_url_xl: data.image_url_xl,
            image_url_l: data.image_url_l,
            image_url_m: data.image_url_m,
            image_url_s: data.image_url_s,
            image_url_xs: data.image_url_xs,
        },
    )
    const createdDbNode: Node = records[0].get('node')

    // 2. Adding a custom More Cars ID for that node
    // Note: This seems pointless at first glance, because the More Cars ID is exactly the same as the Neo4j ID.
    //       The benefit: we can modify the More Cars ID anytime, while the Neo4j ID is always read-only.
    //       This will become relevant when migrating nodes from the old database.
    //       In that scenario we need to be able to carry over the existing IDs.
    const elementId = createdDbNode.elementId
    const elementIdSplit: Array<string> = elementId.split(':')
    const moreCarsId: number = parseInt(elementIdSplit[2])
    await setMoreCarsId(elementId, moreCarsId, driver)

    // 3. Adding timestamps
    const timestamp = new Date().toISOString()
    const enrichedDbNode: Node = await addTimestampsToNode(elementId, timestamp, driver)

    // 4. Converting the Neo4j node to a More Cars node
    return mapDbNodeToModelNode(enrichedDbNode)
}
