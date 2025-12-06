## ⚙️ Install & Setup

```sh
git clone git@github.com:dusixx/nodejs2025Q4-service.git
cd nodejs2025Q4-service
git checkout part2
npm ci
```

❗ **Create `.env` file from `.env.example`**

```sh
cp .env.example .env
```

- Install [Docker](https://docs.docker.com/engine/install/)
- Create `Docker Hub` account [Docker Hub](https://hub.docker.com/)
- Use `24.x.x` version (or upper) of Node.js

## ⚠️ Important

- If you are a **Windows** user, download and **run** [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Stop all applications** running on the same ports as our `app` (default `4000`) and `db` (default `5432`)

## 🚀 Running

- #### 1️⃣ Both

Run both (`app` and `db`) images in docker `watch mode`.
If successful, the console will display the message **Watch enabled**

```sh
npm run start:both
```

**`NOTE:`** In this mode, the application will **restart** when changes are made in the **`src/`** and **rebuild** when changing the **`package.json`**.

- #### 2️⃣ DB only

Run the `app` (`prismа generate` and `migration` will occur automatically)
The `db` image will be run in docker

```sh
npm run start:app
```

### 🧪 Testing

Regardless of which method you chose to launch the `app`,
if everything went well, we move on to testing (in `another` terminal window).

```sh
# run all tests
npm test
# run only one test
npm run test -- <path_to_suite>
```

### 🔵 Docker Hub

You can **download** the latest versions of both images

```sh
npm run docker:pull
```

However, this is not necessary — they will be downloaded automatically,
when you run the app with `npm run start:both`.

The sizes of both images do **not exceed 500 MiB**. To check this, use

```sh
npm run docker:images
```

The size we need is indicated in the column **`CONTENT SIZE`** (or just **`SIZE`**)

```sh
IMAGE                            ID   DISK USAGE   CONTENT SIZE
dusixx/home-lib-srv-app:latest   --       --          134MB
dusixx/home-lib-srv-db:latest    --       --          110MB
```

Or you can see the size in the `Docker Hub` repository on the `Tags` tab.

- [App image](https://hub.docker.com/r/dusixx/home-lib-srv-app/tags)
- [DB image](https://hub.docker.com/r/dusixx/home-lib-srv-db/tags)

### 🐞 Vulnerabilities scanning

To scan both images, use the command (you need to wait a little)

```sh
npm run docker:scan
```

**Scan results**

```sh
  Target             │  dusixx/home-lib-srv-app:latest  │    0C     3H     3M     0L
    digest           │  1b5b1fec1540                    │
  Base image         │  node:24-alpine                  │    0C     1H     1M     0L
  Updated base image │  node:slim                       │    0C     1H     2M    24L
                     │                                  │                  +1    +24
```

```sh
  Target             │  dusixx/home-lib-srv-db:latest  │    0C     5H     7M     0L
    digest           │  9895a09545aa                   │
  Base image         │  alpine:3.23                    │    0C     0H     0M     0L
  Updated base image │  alpine:3.21                    │    0C     0H     0M     2L
                     │                                 │                         +2
```

### 🕸️ Network config (bridge)

To see network settings, use

```sh
npm run docker:network
```

<details>
<summary><b>Network details</b></summary>
<pre style='font-size:12px;line-height:1'>
[
    {
        "Name": "home-lib-network",
        "Id": "58ef24ef5493e27afbc6e29dbfcb2a4c57e4021ffe13d8e09f24387cb8165757",
        "Created": "2025-12-06T18:16:09.10390963Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv4": true,
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.22.0.0/24",
                    "IPRange": "",
                    "Gateway": "172.22.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": true,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Options": {
            "com.docker.network.bridge.name": "home-lib-bridge",
            "com.docker.network.enable_ipv4": "true",
            "com.docker.network.enable_ipv6": "false"
        },
        "Labels": {
            "com.docker.compose.config-hash": "8219c092ee6e21a96b1b22dfac20bf5ed32fa87d045fa08ce5170d6acc6519c5",
            "com.docker.compose.network": "home-lib-network",
            "com.docker.compose.project": "nodejs2025q4-service",
            "com.docker.compose.version": "2.40.3"
        },
        "Containers": {
            "11a51ed2daab554492d706e46dfba33f8ef499cf68e556b9c7caa2e0316ad177": {
                "Name": "home-lib-srv-app",
                "EndpointID": "85798a0fbced517d2e71a8f89d8b647a6fffd5468c10e5cd335272cc1908f94d",
                "MacAddress": "d2:74:f7:d6:81:63",
                "IPv4Address": "172.22.0.100/24",
                "IPv6Address": ""
            },
            "1ee2307d762aa9152c3a8bedbaba60c659f2284195f7ef1f15403af524e58f99": {
                "Name": "home-lib-srv-db",
                "EndpointID": "cb1f746d64bef5319c96b96fab1dbaf48ae0524288727cf492345c4ea503a460",
                "MacAddress": "9e:ec:81:da:10:25",
                "IPv4Address": "172.22.0.200/24",
                "IPv6Address": ""
            }
        },
        "Status": {
            "IPAM": {
                "Subnets": {
                    "172.22.0.0/24": {
                        "IPsInUse": 5,
                        "DynamicIPsAvailable": 251
                    }
                }
            }
        }
    }
]
</pre>
</details>

### 🗃️ Docker volumes

To see volumes list, use

```sh
npm run docker:volumes
```

```sh
DRIVER    VOLUME NAME
local     nodejs2025q4-service_app-logs
local     nodejs2025q4-service_postgres-data
local     nodejs2025q4-service_postgres-logs
```

### 🟢 Open API

After launching the application on port `4000` (default),

you can open the `OpenAPI documentation` in your browser at

http://localhost:4000/doc
