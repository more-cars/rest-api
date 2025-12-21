#!/bin/sh

echo Starting database...
echo Web Interface available at: http://db.more-cars.internal:7474

docker run --rm --env NEO4J_AUTH=none --publish=7474:7474 --publish=7687:7687 neo4j:5.23.0
