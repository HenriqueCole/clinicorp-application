
const { initializeApp } =  require('firebase/app');
const { getAuth } =  require('firebase/auth');

const {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc
} =  require("firebase/firestore/lite");

const firebaseConfig = {
  apiKey: "AIzaSyDrr6S8R_fBPY37C1yNDXkCxnI0HUq9KAI",
  authDomain: "clini-do.firebaseapp.com",
  projectId: "clini-do",
  storageBucket: "clini-do.appspot.com",
  messagingSenderId: "512229656593",
  appId: "1:512229656593:web:b322c538c1f395c4f609b0",
  measurementId: "G-9S3C1TZ415"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore();

async function post(tableName, id, data) {
  if (id) {
    const referenceEntity = await setDoc(doc(db, tableName, id), data);
    const savedData = {
      ...data,
      id: id,
    };
    return savedData;
  } else {
    const referenceEntity = await addDoc(collection(db, tableName), data);
    const savedData = {
      ...data,
      id: referenceEntity.id,
    };
    return savedData;
  }
}

async function get(tableName) {
  const tableRef = collection(db, tableName);

  const q = query(tableRef);

  const querySnapshot = await getDocs(q);

  const list = [];

  querySnapshot.forEach((doc) => {
    const data = {
      ...doc.data(),
      id: doc.id,
    };
    list.push(data);
    console.log(doc.id, " => ", doc.data());
  });
  return list;
}

async function getById(tableName, id) {
  const docRef = doc(db, tableName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return new Error("Not found");
  }
}

async function remove(tableName, id) {
  const data = await deleteDoc(doc(db, tableName, id));
  return {
    message: `${id} deleted`,
  };
}

module.exports = {
  auth,
  post,
  get,
  getById,
  remove
};
