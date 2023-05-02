# SQUADRON APP

This project consists of one **Front-end app\* written in ReactJs and Redux and a very simple **Server app\* which is used only for providing simple data to the FE app.

## Prerequisites

Node v18.12.1
npm 9.1.2 or yarn 1.22.19

## How to start

### Links in browser

**FE app: http://localhost:3000/\*
**Server app: http://localhost:5000/\*

### Docker

If you are using docker, please navigate to the root of the project directory and type \*_docker-compose up_. It will create a container and an image for both server and Front-end app and you can open them from the links provided above.

### Development environment

\*_You need to have the server app started in order for the FE to work_

#### Start FE

In the root directory of the project type:

Installs the required dependencies

```bash
yarn install
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

```bash
yarn start
```

#### Start server

From the root directory navigate to the folder 'server' and type:

```bash
npm install
```

```bash
npm run dev
```
