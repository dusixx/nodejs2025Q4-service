docker stop $(docker ps -a -q) 2>/dev/null || true
docker rm -f $(docker ps -a -q) 2>/dev/null || true
docker rmi -f $(docker images -q) 2>/dev/null || true
docker volume rm -f $(docker volume ls -q) 2>/dev/null || true
docker network prune -f 2>/dev/null || true
docker system prune -a --volumes -f 2>/dev/null || true

# builder cache
# docker builder prune -a -f 2>/dev/null || true
# docker buildx prune -a -f 2>/dev/null || true

