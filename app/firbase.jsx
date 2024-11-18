// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const firebaseConfig = {
// //   apiKey: 'YOUR_API_KEY',
// //   authDomain: 'YOUR_AUTH_DOMAIN',
// //   projectId: 'YOUR_PROJECT_ID',
// //   storageBucket: 'YOUR_STORAGE_BUCKET',
// //   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
// //   appId: 'YOUR_APP_ID',
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const db = firebase.firestore();

// // Get tasks (real-time updates)
// const getTasks = (onUpdate) => {
//   return db.collection('tasks').onSnapshot((snapshot) => {
//     const tasks = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     onUpdate(tasks);
//   });
// };

// // Add a task
// const addTask = async (task) => {
//   const newTask = { title: task, completed: false };
//   const docRef = await db.collection('tasks').add(newTask);
//   return { id: docRef.id, ...newTask };
// };

// // Update a task
// const updateTask = async (id, updates) => {
//   await db.collection('tasks').doc(id).update(updates);
// };

// // Delete a task
// const deleteTask = async (id) => {
//   await db.collection('tasks').doc(id).delete();
// };

// export { getTasks, addTask, updateTask, deleteTask };
