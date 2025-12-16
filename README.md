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
- If you are a `Windows` user, install and run [Docker Desktop](https://www.docker.com/products/docker-desktop/)

# 🚀 Running

❗ Stop all applications running on the same ports as our `app` (default `4000`) and `db` (default `5432`).

```sh
# run the linter
npm run lint

# stop other containers and remove their resources
npm run docker:cleanup

# run both images
docker-compose up -d

# 🧪 run the tests (auth & refresh)
npm run test:all
```

# 📄 Logging

- `App logs` are available on a volume named `nodejs2025q4-service_app-logs`
- Log files are named according to the template `app-YYYY-MM-DD-TIMESTAMP.log`.
- The logging level is set by the `LOG_LEVEL` variable (`verbose(4)` by default).
- A separate file(s) named `error-YYYY-MM-DD-TIMESTAMP.log` is created for `errors`.
- `DB logs` are available on a volume named `nodejs2025q4-service_postgres-data` (`log` folder)

### ✔️ Log rotation

- The maximum file size is set by the `LOG_MAX_SIZE_KB` variable (`50` by default).
- If a file size exceeds the maximum, a new file is created and so on.
- The maximum number of files is set by the variable `LOG_MAX_FILES` (default is `100`).
- If the number of files exceeds the maximum, the oldest ones are deleted.

<details open>
<summary><b>App logging testing</b></summary>

```sh
# fill out the log files
npm run fill:logs

# enter volume inspection mode
npm run logs:app

# list log files
ls -lh

# display the contents of the file
cat <app-YYYY-MM-DD-TIMESTAMP.log>

# exit inspection mode
exit
```

</details>

<details>
<summary><b>DB logging testing</b></summary>

```sh
# enter volume inspection mode
npm run logs:db

# list log files
ls -lh

# display the contents of the file
cat <postgresql-YYY-MM-DD_HHMMSS.log>

# exit inspection mode
exit
```

</details>

# 🔵 Useful commands

```sh
# list running containers
npm run docker:ps

# list volumes
npm run docker:volumes

# list images
npm run docker:images
```

# 🔴 If something went wrong

If running tests produces errors like `TypeError: Cannot read properties of undefined (reading 'prototype')` use

```sh
npm run fix:deps
```

To kill the `node` and `docker-compose`

```sh
npm run kill:all
```

To create a `"clean"` build

```sh
npm run docker:build
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
