# ⚙️ Install & Setup

```sh
git clone git@github.com:dusixx/nodejs2025Q4-service.git
cd nodejs2025Q4-service
git checkout part2
npm ci
```

### ❗ Strictly necessary

Create `.env` file from `.env.example`

```sh
cp .env.example .env
```

- Install [Docker](https://docs.docker.com/engine/install/)
- If you are a `Windows` user, download and run [Docker Desktop](https://www.docker.com/products/docker-desktop/)

**⚠️ NOTE**: If you run commands `randomly`, this may cause the app to crash. Tests will stop running. A cleanup and restart will be required

# 🚀 Running

❗ Stop all applications running on the same ports as our `app` (default `4000`) and `db` (default `5432`).

```sh
# to avoid linting errors
npx prisma generate

# run the linter
npm run lint

# run both images
docker-compose up -d

# 🧪 run the tests
npm test

# switch to watch mode
docker-compose watch --no-up
```

**🔥 HOT RELOAD:** in `watch mode` the app will `restart` when changes are made in the `src` folder and `rebuild` when changing the `package.json`

❗ If you made any changes to the `src` folder in `watch mode`, wait a few seconds for the app to `restart` before entering a command like `npm test`

The console will display

```sh
Syncing service "app" after 1 changes were detected
service(s) ["app"] restarted
```

# 🔵 Docker Hub

Both images are uploaded to Docker Hub

[App image](https://hub.docker.com/r/dusixx/home-lib-srv-app/tags) | [DB image](https://hub.docker.com/r/dusixx/home-lib-srv-db/tags)

The size of each image `does not exceed` 500 MiB. To check this, use

```sh
npm run docker:images
```

# 🐞 Vulnerabilities scanning

To scan both images

```sh
docker-compose build

npm run docker:scan

# ❗ BE SURE TO RUN: to return everything to normal
npm run docker:pull
```

# ℹ️ Useful commands

```sh
# list running containers
npm run docker:ps

# network settings
npm run docker:network

# list volumes
npm run docker:volumes
```

# 🧹 Cleanup

Stop containers and remove project resources

```sh
npm run docker:cleanup
```

# 🟢 Open API

After launching the application on port `4000` (default),
you can open the `OpenAPI documentation` in your browser at
http://localhost:4000/doc
