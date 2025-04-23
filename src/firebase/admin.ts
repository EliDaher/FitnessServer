var admin = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fitnesstime-c431e-default-rtdb.firebaseio.com/"
});

export default admin;
