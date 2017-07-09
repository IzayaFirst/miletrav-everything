import  * as firebase  from 'firebase';

const config = {
    apiKey: "AIzaSyDu0FY6mCxbAek2ZWq-z8WcQvnR0IZJO4Q",
    authDomain: "miletrav-4f855.firebaseapp.com",
    databaseURL: "https://miletrav-4f855.firebaseio.com",
    storageBucket: "miletrav-4f855.appspot.com",
    messagingSenderId: "469316737513",
}
let firebaseConfig

if (!firebase.apps.length) {
  firebaseConfig = firebase.initializeApp(config)
}

export const UploadCoverPhoto = async (data) => {
  const fileName = btoa(new Date().getTime())
  const upload = await firebase.storage().ref('activity_cover/'+fileName).put(data)
  const url = await upload.downloadURL
  return url
}

export const UploadShowcase = async (data) => {
  const fileName = btoa(new Date().getTime())
  const upload = await firebase.storage().ref('showcase_activity/'+fileName).put(data)
  const url = await upload.downloadURL
  return url
}