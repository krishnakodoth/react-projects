import * as admin from "firebase-admin";
// var admin = require("firebase-admin");

var serviceAccount = require("./share-pay-61301-firebase-adminsdk-iprq1-14dbf0bf22.json");

const fireAdm = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://share-pay-61301.firebaseio.com"
});
export default fireAdm;