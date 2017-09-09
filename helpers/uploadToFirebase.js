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
export default firebaseConfig

export const UploadCoverPhoto = async (data) => {
  const fileName = btoa(new Date().getTime())
  const upload = await firebase.storage().ref('activity_cover/'+fileName).put(data)
  const url = await upload.downloadURL
  return url
}

export const sendMessage = async (senderId , receiverId, message) => {
  const low = senderId < receiverId ? senderId : receiverId
  const high = senderId < receiverId ? receiverId : senderId
  const table = low + "chat" + high
  const db = await firebase.database().ref('chat').child(table)
  const data = {
    senderId,
    receiverId,
    message,
    chatAt: new Date(),
  }
  const send = await db.push(data)
  return data
} 

export const UploadGuideBook = async (data) => {
  const fileName = btoa(new Date().getTime())
  const upload = await firebase.storage().ref('guidebook/'+fileName).put(data)
  const url = await upload.downloadURL
  return url
}
export const UploadProfile = async (data) => {
  const fileName = btoa(new Date().getTime())
  const upload = await firebase.storage().ref('profile/'+fileName).put(data)
  const url = await upload.downloadURL
  return url
}

export const UploadCitizen = async (data) => {
  const fileName = btoa(new Date().getTime())
  const upload = await firebase.storage().ref('citizen_photo/'+fileName).put(data)
  const url = await upload.downloadURL
  return url
}

export const UploadBankAccount = async (data) => {
  const fileName = btoa(new Date().getTime())
  const upload = await firebase.storage().ref('bank_account_photo/'+fileName).put(data)
  const url = await upload.downloadURL
  return url
}

export const UploadShowcase = async (data) => {
  const fileName = btoa(new Date().getTime())
  const upload = await firebase.storage().ref('showcase_activity/'+fileName).put(data)
  const url = await upload.downloadURL
  return url
}