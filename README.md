### 🚀 Install & Run

```sh
git clone git@github.com:dusixx/nodejs2025Q4-service.git
cd nodejs2025Q4-service
git checkout dev
npm i
```

```sh
# Create .env file from .env.example
cp .env.example .env

# start in production mode
npm start

# 🧪 run all tests (in another terminal window)
npm test

# 🧪 run only one test
npm run test -- <path_to_suite>
```

```sh
# auto-fix and format
npm run lint
npm run format
```

### 🟢 Open API

After launching the application on port `4000` (default),

you can open the `OpenAPI documentation` in your browser at

http://localhost:4000/doc

### 🔴 If something went wrong

```sh
# to fix dependencies
npm run fix:deps
```

```sh
# To kill the node, enter in the OS terminal

# for win32 platforms
taskkill /f /im node.exe

# for *nix platforms
killall -9 node
```
