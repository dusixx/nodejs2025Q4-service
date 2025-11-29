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

# 🧪 to run only one test suites
npm run test -- <path to suite>
```

After running the application on port (default `4000`), you can open the `OpenAPI documentation` in the browser, using the link http://localhost:4000/doc/

### Auto-fix and format

```sh
npm run lint
npm run format
```

## 🆘 If something went wrong

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
