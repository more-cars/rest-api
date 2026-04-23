import {CreateMagazineInput} from "./types/CreateMagazineInput"
import {MagazineNode} from "./types/MagazineNode"
import {convertInputData} from "./create/convertInputData"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/magazines/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {createRel} from "../../relationships/createRel"
import {Image} from "../images/Image"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getAllRels} from "../../relationships/getAllRels"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {getRel} from "../../relationships/getRel"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import {MagazineIssue} from "../magazine-issues/MagazineIssue"
import {Video} from "../videos/Video"
import {fetchNodesFromDb} from "../../../db/nodes/fetchNodesFromDb"
import {DbNodeType} from "../../../db/types/DbNodeType"
import {getDbQueryCollectionParams} from "../../../db/nodes/getDbQueryCollectionParams"
import {createNeo4jNode} from "../../../db/nodes/createNeo4jNode"

export const Magazine = {
    async create(data: CreateMagazineInput): Promise<MagazineNode> {
        const input = convertInputData(data)
        const result = await createNeo4jNode(DbNodeType.Magazine, input)

        return convertDbNodeToModelNode(result) as MagazineNode
    },

    async findById(id: number): Promise<MagazineNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as MagazineNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<MagazineNode[]> {
        const nodes: MagazineNode[] = []
        const nodesDb = await fetchNodesFromDb(DbNodeType.Magazine, getDbQueryCollectionParams(options))

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as MagazineNode)
        })

        return nodes
    },

    async delete(id: number): Promise<void> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        await deleteNode(id)
    },

    async createHasIssueRelationship(magazineId: number, magazineIssueId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Magazine.findById(magazineId)
        await MagazineIssue.findById(magazineIssueId)

        const existingRelation = await getSpecificRel(magazineId, magazineIssueId, RelType.MagazineHasIssue)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineHasIssue, magazineId, magazineIssueId)
        }

        await deleteIncomingRel(magazineIssueId, RelType.MagazineHasIssue)

        const createdRelationship = await createRel(magazineId, magazineIssueId, RelType.MagazineHasIssue)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasIssueRelationships(magazineId: number) {
        // checking that the node exists -> exception is thrown if not
        await Magazine.findById(magazineId)

        return getAllRels(magazineId, RelType.MagazineHasIssue)
    },

    async deleteHasIssueRelationship(magazineId: number, magazineIssueId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Magazine.findById(magazineId)
        await MagazineIssue.findById(magazineIssueId)

        const relationship = await getSpecificRel(magazineId, magazineIssueId, RelType.MagazineHasIssue)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineHasIssue, magazineId, magazineIssueId)
        }

        await deleteSpecificRel(magazineId, magazineIssueId, RelType.MagazineHasIssue)
    },

    async createHasImageRelationship(magazineId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Magazine.findById(magazineId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(magazineId, imageId, RelType.MagazineHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineHasImage, magazineId, imageId)
        }

        const createdRelationship = await createRel(magazineId, imageId, RelType.MagazineHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(magazineId: number) {
        // checking that the node exists -> exception is thrown if not
        await Magazine.findById(magazineId)

        return getAllRels(magazineId, RelType.MagazineHasImage)
    },

    async deleteHasImageRelationship(magazineId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Magazine.findById(magazineId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(magazineId, imageId, RelType.MagazineHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineHasImage, magazineId, imageId)
        }

        await deleteSpecificRel(magazineId, imageId, RelType.MagazineHasImage)
    },

    async createHasPrimeImageRelationship(magazineId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Magazine.findById(magazineId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(magazineId, imageId, RelType.MagazineHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineHasPrimeImage, magazineId, imageId)
        }
        await deleteOutgoingRel(magazineId, RelType.MagazineHasPrimeImage)


        const createdRelationship = await createRel(magazineId, imageId, RelType.MagazineHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(magazineId: number) {
        // checking that the node exists -> exception is thrown if not
        await Magazine.findById(magazineId)

        const relationship = await getRel(magazineId, RelType.MagazineHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineHasPrimeImage, magazineId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(magazineId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Magazine.findById(magazineId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(magazineId, imageId, RelType.MagazineHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineHasPrimeImage, magazineId, imageId)
        }

        await deleteSpecificRel(magazineId, imageId, RelType.MagazineHasPrimeImage)
    },

    async createHasVideoRelationship(magazineId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Magazine.findById(magazineId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(magazineId, videoId, RelType.MagazineHasVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineHasVideo, magazineId, videoId)
        }

        const createdRelationship = await createRel(magazineId, videoId, RelType.MagazineHasVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasVideoRelationships(magazineId: number) {
        // checking that the node exists -> exception is thrown if not
        await Magazine.findById(magazineId)

        return getAllRels(magazineId, RelType.MagazineHasVideo)
    },

    async deleteHasVideoRelationship(magazineId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Magazine.findById(magazineId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(magazineId, videoId, RelType.MagazineHasVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineHasVideo, magazineId, videoId)
        }

        await deleteSpecificRel(magazineId, videoId, RelType.MagazineHasVideo)
    },

    async createHasMainVideoRelationship(magazineId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Magazine.findById(magazineId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(magazineId, videoId, RelType.MagazineHasMainVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.MagazineHasMainVideo, magazineId, videoId)
        }
        await deleteOutgoingRel(magazineId, RelType.MagazineHasMainVideo)

        const createdRelationship = await createRel(magazineId, videoId, RelType.MagazineHasMainVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasMainVideoRelationship(magazineId: number) {
        // checking that the node exists -> exception is thrown if not
        await Magazine.findById(magazineId)

        const relationship = await getRel(magazineId, RelType.MagazineHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineHasMainVideo, magazineId, null)
        }

        return relationship
    },

    async deleteHasMainVideoRelationship(magazineId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Magazine.findById(magazineId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(magazineId, videoId, RelType.MagazineHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.MagazineHasMainVideo, magazineId, videoId)
        }

        await deleteSpecificRel(magazineId, videoId, RelType.MagazineHasMainVideo)
    },
}
