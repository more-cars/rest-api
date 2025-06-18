import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../driver"
import {BrandNode} from "../../../types/brands/BrandNode"
import {BrandNodeUserData} from "../../../types/brands/BrandNodeUserData"
import {addMoreCarsIdToNode} from "../addMoreCarsIdToNode"
import {addTimestampsToNode} from "../addTimestampsToNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"

export async function createNode(data: BrandNodeUserData): Promise<BrandNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const createdNode = await createBrand(data, driver)

    await session.close()
    await closeDriver(driver)

    return createdNode
}

async function createBrand(data: BrandNodeUserData, driver: Driver): Promise<BrandNode> {
    // 1. Creating the node in the database
    const {records} = await driver.executeQuery(`
            CREATE (node:Brand {
                name: $name, 
                full_name: $full_name, 
                founded: $founded,
                defunct: $defunct,
                wmi: $wmi,
                hsn: $hsn
            }) 
            RETURN node 
            LIMIT 1`,
        {
            name: data.name,
            full_name: data.full_name ?? null,
            founded: data.founded ?? null,
            defunct: data.defunct ?? null,
            wmi: data.wmi ?? null,
            hsn: data.hsn ?? null,
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
    await addMoreCarsIdToNode(elementId, moreCarsId, "Brand", driver)

    // 3. Adding timestamps
    const timestamp = new Date().toISOString()
    const enrichedDbNode: Node = await addTimestampsToNode(elementId, timestamp, driver)

    // 4. Converting the Neo4j node to a More Cars node
    return mapDbNodeToModelNode(enrichedDbNode)
}
