const functions = require('firebase-functions');

const cors = require('cors')({origin: true});
const fs = require('fs');
const UUID = require('uuid-v4');

const gcconfig = {
  projectId: "moving-free",
  keyFilename: "moving-free.json"
}
const gcs = require('@google-cloud/storage')(gcconfig);
 
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
  return cors(request, response, () => { // body.uid
    const body = JSON.parse(request.body);
    fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
      console.log(err);
      return response.status(500).json({ error: err });
    });
    const bucket = gcs.bucket("moving-free.appspot.com");
    const uuid = body.name;
 
    return bucket.upload(
      "/tmp/uploaded-image.jpg",
      {
        uploadType: "media",
        destination: "/car/" + uuid + ".jpg",
        metadata: {
          metadata: {
            contentType: "image/jpg",
            firebaseStorageDownloadTokens: uuid
          }
        },
        resumable: false
      },
      (err, file) => {
        if (!err) {
          return response.status(201).json({
            imageUrl:
              "https://firebasestorage.googleapis.com/v0/b/" +
              bucket.name +
              "/o/" +
              encodeURIComponent(file.name) +
              "?alt=media&token=" +
              uuid
          });
        } else {
          console.log(err);
          return response.status(500).json({ error: err });
        }
      }
    );
  });
});
