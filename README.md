## 🚀 Install

```sh
git clone git@github.com:dusixx/nodejs2025Q4-service.git
cd nodejs2025Q4-service
git checkout dev
npm i
```

## ⚙️ Run

```sh
# Create .env file from .env.example
cp .env.example .env

# start in production mode
npm start

# 🧪 run all tests (in another terminal window)
npm test

# 🧪 to run only one of all test suites
npm run test -- <path to suite>
```

After starting the app on port (`4000` as default) you can open
in your browser `OpenAPI documentation` by typing http://localhost:4000/doc/.

### Auto-fix and format

```sh
npm run lint
npm run format
```

## 🆘 If something went wrong

```sh
# to reinstall dependencies
npm run fix:deps
```

```sh
# To kill the node, enter in the OS terminal

# for win32 platforms
taskkill /f /im node.exe

# for *nix platforms
killall -9 node
```
