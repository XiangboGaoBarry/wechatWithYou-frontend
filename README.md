# wechatWithYou

## Description
This project is a chat application backend that uses various npm packages to handle server-side operations. The application uses `express` for routing, `mongoose` and `mongodb` for database operations, `cors` for Cross-Origin Resource Sharing, `multer` for handling multipart/form-data, and `@google-cloud/storage` for integrating Google Cloud Storage.

## Installation

### Prerequisites
- Node.js
- npm (Node Package Manager)

### Global Installation
First, make sure you have the correct version of npm installed globally. This project requires npm version 10.2.4.

```sh
npm install --location=global npm@10.2.4
```

### Backend Setup
```sh
cd backend
npm install express mongoose mongodb cors multer @google-cloud/storage
cd ../my-wechat
npm install date-fns
npm install --save-dev @babel/plugin-proposal-private-property-in-object
```

### Dev Usage
In the backend folder, run
```sh
node server.js
```

In the my-wechat folder, run
```sh
npm start
```

### Deployment
```sh
cd my-wechat
npm run build
npm install --save-dev gh-pages # Deploy to github page
```


