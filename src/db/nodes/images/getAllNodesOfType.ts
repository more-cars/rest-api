import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../driver"
import {ImageNode} from "./types/ImageNode"
import {fetchNodesFromDb} from "../fetchNodesFromDb.ts"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"

export async function getAllNodesOfType(): Promise<Array<ImageNode>> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.Image)

    await session.close()
    await closeDriver(driver)

    const nodes: Array<ImageNode> = []

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToModelNode(dbNode))
    })

    return nodes
}
