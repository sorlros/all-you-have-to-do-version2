import admin from 'firebase-admin';
import serviceAccount from "../../serviceAccountKey.json"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    // databaseURL: 'https://your-database-name.firebaseio.com'
  });
}

export default admin;