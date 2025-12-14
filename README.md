# ⚙️ Install & Setup

```sh
git clone git@github.com:dusixx/nodejs2025Q4-service.git
cd nodejs2025Q4-service
git checkout part3
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
# run the linter
npm run lint

# run both images
docker-compose up -d

# 🧪 run the tests (very first one)
npm run test:auth
```

# 📄 Logging

- `App logs` are available on a volume named `nodejs2025q4-service_app-logs`
- Log files are named according to the template `app-YYYY-MM-DD.log`.
- The maximum file size is set by the `LOG_MAX_SIZE_KB` variable (`50` by default).
- The logging level is set by the `LOG_LEVEL` variable (`4` -> `verbose` by default).
- If a file size exceeds the maximum, a new file is created named `app-YYYY-MM-DD.log.1`, and so on.
- A separate file named `error-YYYY-MM-DD.log` is created for `critical errors`. File `rotation logic` is the same as for app logs.
- `DB logs` are available on a volume named `nodejs2025q4-service_postgres-data` (`log` folder)

<details open>
<summary><b>App logging testing</b></summary>

```sh
# run it two more times to fill out the log files
# along with the "very first one" - there will be 3
npm run test:auth

# enter interactive volume inspection mode
npm run logs:app

# list all log files
ls -la

# display the contents of the file
# for example, `cat app-2025-12-14.log.1`
cat <app-YYYY-MM-DD.log>

# exit interactive mode
exit
```

</details>

<details>
<summary><b>DB logging testing</b></summary>

```sh
# enter interactive volume inspection mode
npm run logs:db

# list all log files
ls -la

# display the contents of the file
# for example, `cat postgresql-2025-12-14_062721.log`
cat <postgresql-YYY-MM-DD_NUM.log>

# exit interactive mode
exit
```

</details>

# ℹ️ Useful commands

```sh
# list running containers
npm run docker:ps

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
