# sh ./scripts/cleanup.sh
docker-compose down -v --rmi all --remove-orphans

export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

docker-compose build --no-cache --pull # --progress=plain
docker-compose up -d
docker ps