import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../driver"
import {BrandNode} from "./types/BrandNode"
import {fetchNodesFromDb} from "../fetchNodesFromDb.ts"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {mapDbNodeToBrandNode} from "./mapDbNodeToBrandNode.ts"

export async function getAllNodesOfType(): Promise<Array<BrandNode>> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const dbNodes = await fetchNodesFromDb(NodeTypeLabel.Brand)

    await session.close()
    await closeDriver(driver)

    const nodes: Array<BrandNode> = []

    dbNodes.forEach((dbNode) => {
        nodes.push(mapDbNodeToBrandNode(dbNode))
    })

    return nodes
}
