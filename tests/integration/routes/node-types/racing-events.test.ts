import {describe, expect, test, vi} from "vitest"
import request from "supertest"
import {app} from "../../../../src/app"
import {RacingEventController} from "../../../../src/controllers/node-types/RacingEventController"

vi.mock("../../../../src/controllers/node-types/RacingEventController.ts", {spy: true})

describe('Racing Events', () => {
    test('Create Node', async () => {
        await request(app)
            .post('/racing-events')

        expect(RacingEventController.create)
            .toHaveBeenCalledTimes(1)
    })

    test('Get Node by ID', async () => {
        await request(app)
            .get('/racing-events/123')

        expect(RacingEventController.getById)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all Nodes', async () => {
        await request(app)
            .get('/racing-events')

        expect(RacingEventController.getAll)
            .toHaveBeenCalledTimes(1)
    })

    test('Update Node', async () => {
        await request(app)
            .patch('/racing-events/123')

        expect(RacingEventController.update)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete Node', async () => {
        await request(app)
            .delete('/racing-events/123')

        expect(RacingEventController.delete)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›belongs-to-racing-series‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/relationships/belongs-to-racing-series')
            .send({
                data: {
                    type: "belongs-to-racing-series",
                    id: 456,
                }
            })

        expect(RacingEventController.createBelongsToRacingSeriesRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›belongs-to-racing-series‹ relationship', async () => {
        await request(app)
            .get('/racing-events/123/belongs-to-racing-series')

        expect(RacingEventController.getBelongsToRacingSeriesRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›belongs-to-racing-series‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/relationships/belongs-to-racing-series')
            .send({
                data: {
                    type: "belongs-to-racing-series",
                    id: 456,
                },
            })

        expect(RacingEventController.deleteBelongsToRacingSeriesRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›is-followed-by-event‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/relationships/is-followed-by-event')
            .send({
                data: {
                    type: "is-followed-by-event",
                    id: 456,
                }
            })

        expect(RacingEventController.createIsFollowedByEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›is-followed-by-event‹ relationship', async () => {
        await request(app)
            .get('/racing-events/123/is-followed-by-event')

        expect(RacingEventController.getIsFollowedByEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›is-followed-by-event‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/relationships/is-followed-by-event')
            .send({
                data: {
                    type: "is-followed-by-event",
                    id: 456,
                },
            })

        expect(RacingEventController.deleteIsFollowedByEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›follows-event‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/relationships/follows-event')
            .send({
                data: {
                    type: "follows-event",
                    id: 456,
                }
            })

        expect(RacingEventController.createFollowsEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›follows-event‹ relationship', async () => {
        await request(app)
            .get('/racing-events/123/follows-event')

        expect(RacingEventController.getFollowsEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›follows-event‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/relationships/follows-event')
            .send({
                data: {
                    type: "follows-event",
                    id: 456,
                },
            })

        expect(RacingEventController.deleteFollowsEventRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›took-place-at-race-track‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/relationships/took-place-at-race-track')
            .send({
                data: {
                    type: "took-place-at-race-track",
                    id: 456,
                }
            })

        expect(RacingEventController.createTookPlaceAtRaceTrackRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›took-place-at-race-track‹ relationship', async () => {
        await request(app)
            .get('/racing-events/123/took-place-at-race-track')

        expect(RacingEventController.getTookPlaceAtRaceTrackRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›took-place-at-race-track‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/relationships/took-place-at-race-track')
            .send({
                data: {
                    type: "took-place-at-race-track",
                    id: 456,
                },
            })

        expect(RacingEventController.deleteTookPlaceAtRaceTrackRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›used-the-track-layout‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/relationships/used-the-track-layout')
            .send({
                data: {
                    type: "used-the-track-layout",
                    id: 456,
                }
            })

        expect(RacingEventController.createUsedTheTrackLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›used-the-track-layout‹ relationship', async () => {
        await request(app)
            .get('/racing-events/123/used-the-track-layout')

        expect(RacingEventController.getUsedTheTrackLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›used-the-track-layout‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/relationships/used-the-track-layout')
            .send({
                data: {
                    type: "used-the-track-layout",
                    id: 456,
                },
            })

        expect(RacingEventController.deleteUsedTheTrackLayoutRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-racing-session‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/relationships/has-racing-session')
            .send({
                data: {
                    type: "has-racing-session",
                    id: 456,
                }
            })

        expect(RacingEventController.createHasRacingSessionRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-racing-session‹ relationships', async () => {
        await request(app)
            .get('/racing-events/123/has-racing-session')

        expect(RacingEventController.getAllHasRacingSessionRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-racing-session‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/relationships/has-racing-session')
            .send({
                data: {
                    type: "has-racing-session",
                    id: 456,
                },
            })

        expect(RacingEventController.deleteHasRacingSessionRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›covered-by-magazine-issue‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/relationships/covered-by-magazine-issue')
            .send({
                data: {
                    type: "covered-by-magazine-issue",
                    id: 456,
                }
            })

        expect(RacingEventController.createCoveredByMagazineIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›covered-by-magazine-issue‹ relationships', async () => {
        await request(app)
            .get('/racing-events/123/covered-by-magazine-issue')

        expect(RacingEventController.getAllCoveredByMagazineIssueRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›covered-by-magazine-issue‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/relationships/covered-by-magazine-issue')
            .send({
                data: {
                    type: "covered-by-magazine-issue",
                    id: 456,
                },
            })

        expect(RacingEventController.deleteCoveredByMagazineIssueRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-image‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/relationships/has-image')
            .send({
                data: {
                    type: "has-image",
                    id: 456,
                }
            })

        expect(RacingEventController.createHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-image‹ relationships', async () => {
        await request(app)
            .get('/racing-events/123/has-image')

        expect(RacingEventController.getAllHasImageRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-image‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/relationships/has-image')
            .send({
                data: {
                    type: "has-image",
                    id: 456,
                },
            })

        expect(RacingEventController.deleteHasImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-prime-image‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/relationships/has-prime-image')
            .send({
                data: {
                    type: "has-prime-image",
                    id: 456,
                }
            })

        expect(RacingEventController.createHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-prime-image‹ relationship', async () => {
        await request(app)
            .get('/racing-events/123/has-prime-image')

        expect(RacingEventController.getHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-prime-image‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/relationships/has-prime-image')
            .send({
                data: {
                    type: "has-prime-image",
                    id: 456,
                },
            })

        expect(RacingEventController.deleteHasPrimeImageRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-video‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/relationships/has-video')
            .send({
                data: {
                    type: "has-video",
                    id: 456,
                }
            })

        expect(RacingEventController.createHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get all ›has-video‹ relationships', async () => {
        await request(app)
            .get('/racing-events/123/has-video')

        expect(RacingEventController.getAllHasVideoRelations)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-video‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/relationships/has-video')
            .send({
                data: {
                    type: "has-video",
                    id: 456,
                },
            })

        expect(RacingEventController.deleteHasVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Create ›has-main-video‹ relationship', async () => {
        await request(app)
            .post('/racing-events/123/relationships/has-main-video')
            .send({
                data: {
                    type: "has-main-video",
                    id: 456,
                }
            })

        expect(RacingEventController.createHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Get ›has-main-video‹ relationship', async () => {
        await request(app)
            .get('/racing-events/123/has-main-video')

        expect(RacingEventController.getHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })

    test('Delete ›has-main-video‹ relationship', async () => {
        await request(app)
            .delete('/racing-events/123/relationships/has-main-video')
            .send({
                data: {
                    type: "has-main-video",
                    id: 456,
                },
            })

        expect(RacingEventController.deleteHasMainVideoRelation)
            .toHaveBeenCalledTimes(1)
    })
})
