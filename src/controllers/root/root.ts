import express from "express"

export async function root(req: express.Request, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300, stale-if-error=600')
    res.send({
        "name": "More Cars API",
        "version": "2.0.0",
        "status": "ok",
        "_links": {
            "self": {
                "href": "/"
            },
            "health": {
                "href": "/health",
            },
            "specification": {
                "href": "/specification"
            },
            "companies": {
                "href": "/companies"
            },
            "brands": {
                "href": "/brands"
            },
            "car-models": {
                "href": "/car-models"
            },
            "car-model-variants": {
                "href": "/car-model-variants"
            },
            "prices": {
                "href": "/prices"
            },
            "race-tracks": {
                "href": "/race-tracks"
            },
            "track-layouts": {
                "href": "/track-layouts"
            },
            "racing-series": {
                "href": "/racing-series"
            },
            "racing-events": {
                "href": "/racing-events"
            },
            "racing-sessions": {
                "href": "/racing-sessions"
            },
            "lap-times": {
                "href": "/lap-times"
            },
            "racing-games": {
                "href": "/racing-games"
            },
            "gaming-platforms": {
                "href": "/gaming-platforms"
            },
            "model-cars": {
                "href": "/model-cars"
            },
            "model-car-brands": {
                "href": "/model-car-brands"
            },
            "magazines": {
                "href": "/magazines"
            },
            "magazine-issues": {
                "href": "/magazine-issues"
            },
            "ratings": {
                "href": "/ratings"
            },
            "programmes": {
                "href": "/programmes"
            },
            "programme-episodes": {
                "href": "/programme-episodes"
            },
            "motor-shows": {
                "href": "/motor-shows"
            },
            "books": {
                "href": "/books"
            },
            "images": {
                "href": "/images"
            },
            "videos": {
                "href": "/videos"
            },
        }
    })
}
