import {CreateProgrammeInput} from "./types/CreateProgrammeInput"
import {ProgrammeNode} from "./types/ProgrammeNode"
import {convertInputData} from "./create/convertInputData"
import {createNode} from "../../../db/node-types/programmes/createNode"
import {convertDbNodeToModelNode} from "../convertDbNodeToModelNode"
import {getNodeById} from "../../../db/node-types/programmes/getNodeById"
import {NodeNotFoundError} from "../../types/NodeNotFoundError"
import {getAllNodesOfType} from "../../../db/node-types/programmes/getAllNodesOfType"
import type {NodeCollectionConstraints} from "../../types/NodeCollectionConstraints"
import {deleteNode} from "../../../db/nodes/deleteNode"
import {createRel} from "../../relationships/createRel"
import {deleteIncomingRel} from "../../relationships/deleteIncomingRel"
import {ProgrammeEpisode} from "../programme-episodes/ProgrammeEpisode"
import {getSpecificRel} from "../../relationships/getSpecificRel"
import {ModelNodeType} from "../../types/ModelNodeType"
import {RelAlreadyExistsError} from "../../types/RelAlreadyExistsError"
import {RelType} from "../../relationships/types/RelType"
import {getAllRels} from "../../relationships/getAllRels"
import {deleteSpecificRel} from "../../relationships/deleteSpecificRel"
import {RelNotFoundError} from "../../types/RelNotFoundError"
import {Image} from "../images/Image"
import {deleteOutgoingRel} from "../../relationships/deleteOutgoingRel"
import {getRel} from "../../relationships/getRel"
import {Video} from "../videos/Video"

export const Programme = {
    async create(data: CreateProgrammeInput): Promise<ProgrammeNode> {
        const input = convertInputData(data)
        const result = await createNode(input)

        return convertDbNodeToModelNode(result) as ProgrammeNode
    },

    async findById(id: number): Promise<ProgrammeNode> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as ProgrammeNode
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<ProgrammeNode[]> {
        const nodes: ProgrammeNode[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as ProgrammeNode)
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

    async createHasEpisodeRelationship(programmeId: number, programmeEpisodeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Programme.findById(programmeId)
        await ProgrammeEpisode.findById(programmeEpisodeId)

        const existingRelation = await getSpecificRel(programmeId, programmeEpisodeId, RelType.ProgrammeHasEpisode)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeHasEpisode, programmeId, programmeEpisodeId)
        }

        await deleteIncomingRel(programmeEpisodeId, RelType.ProgrammeHasEpisode, ModelNodeType.Programme)

        const createdRelationship = await createRel(programmeId, programmeEpisodeId, RelType.ProgrammeHasEpisode)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasEpisodeRelationships(programmeId: number) {
        // checking that the node exists -> exception is thrown if not
        await Programme.findById(programmeId)

        return getAllRels(programmeId, RelType.ProgrammeHasEpisode)
    },

    async deleteHasEpisodeRelationship(programmeId: number, programmeEpisodeId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Programme.findById(programmeId)
        await ProgrammeEpisode.findById(programmeEpisodeId)

        const relationship = await getSpecificRel(programmeId, programmeEpisodeId, RelType.ProgrammeHasEpisode)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeHasEpisode, programmeId, programmeEpisodeId)
        }

        await deleteSpecificRel(programmeId, programmeEpisodeId, RelType.ProgrammeHasEpisode)
    },

    async createHasImageRelationship(programmeId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Programme.findById(programmeId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(programmeId, imageId, RelType.ProgrammeHasImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeHasImage, programmeId, imageId)
        }

        const createdRelationship = await createRel(programmeId, imageId, RelType.ProgrammeHasImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasImageRelationships(programmeId: number) {
        // checking that the node exists -> exception is thrown if not
        await Programme.findById(programmeId)

        return getAllRels(programmeId, RelType.ProgrammeHasImage)
    },

    async deleteHasImageRelationship(programmeId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Programme.findById(programmeId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(programmeId, imageId, RelType.ProgrammeHasImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeHasImage, programmeId, imageId)
        }

        await deleteSpecificRel(programmeId, imageId, RelType.ProgrammeHasImage)
    },

    async createHasPrimeImageRelationship(programmeId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Programme.findById(programmeId)
        await Image.findById(imageId)

        const existingRelation = await getSpecificRel(programmeId, imageId, RelType.ProgrammeHasPrimeImage)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeHasPrimeImage, programmeId, imageId)
        }
        await deleteOutgoingRel(programmeId, RelType.ProgrammeHasPrimeImage)


        const createdRelationship = await createRel(programmeId, imageId, RelType.ProgrammeHasPrimeImage)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasPrimeImageRelationship(programmeId: number) {
        // checking that the node exists -> exception is thrown if not
        await Programme.findById(programmeId)

        const relationship = await getRel(programmeId, RelType.ProgrammeHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeHasPrimeImage, programmeId, null)
        }

        return relationship
    },

    async deleteHasPrimeImageRelationship(programmeId: number, imageId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Programme.findById(programmeId)
        await Image.findById(imageId)

        const relationship = await getSpecificRel(programmeId, imageId, RelType.ProgrammeHasPrimeImage)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeHasPrimeImage, programmeId, imageId)
        }

        await deleteSpecificRel(programmeId, imageId, RelType.ProgrammeHasPrimeImage)
    },

    async createHasVideoRelationship(programmeId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Programme.findById(programmeId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(programmeId, videoId, RelType.ProgrammeHasVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeHasVideo, programmeId, videoId)
        }

        const createdRelationship = await createRel(programmeId, videoId, RelType.ProgrammeHasVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getAllHasVideoRelationships(programmeId: number) {
        // checking that the node exists -> exception is thrown if not
        await Programme.findById(programmeId)

        return getAllRels(programmeId, RelType.ProgrammeHasVideo)
    },

    async deleteHasVideoRelationship(programmeId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Programme.findById(programmeId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(programmeId, videoId, RelType.ProgrammeHasVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeHasVideo, programmeId, videoId)
        }

        await deleteSpecificRel(programmeId, videoId, RelType.ProgrammeHasVideo)
    },

    async createHasMainVideoRelationship(programmeId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Programme.findById(programmeId)
        await Video.findById(videoId)

        const existingRelation = await getSpecificRel(programmeId, videoId, RelType.ProgrammeHasMainVideo)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.ProgrammeHasMainVideo, programmeId, videoId)
        }
        await deleteOutgoingRel(programmeId, RelType.ProgrammeHasMainVideo)

        const createdRelationship = await createRel(programmeId, videoId, RelType.ProgrammeHasMainVideo)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship
    },

    async getHasMainVideoRelationship(programmeId: number) {
        // checking that the node exists -> exception is thrown if not
        await Programme.findById(programmeId)

        const relationship = await getRel(programmeId, RelType.ProgrammeHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeHasMainVideo, programmeId, null)
        }

        return relationship
    },

    async deleteHasMainVideoRelationship(programmeId: number, videoId: number) {
        // checking that both nodes exist -> exception is thrown if not
        await Programme.findById(programmeId)
        await Video.findById(videoId)

        const relationship = await getSpecificRel(programmeId, videoId, RelType.ProgrammeHasMainVideo)
        if (!relationship) {
            throw new RelNotFoundError(RelType.ProgrammeHasMainVideo, programmeId, videoId)
        }

        await deleteSpecificRel(programmeId, videoId, RelType.ProgrammeHasMainVideo)
    },
}
