import firebase, { database } from '../libraries/firebase';
import { createData } from './manipulateDB.service';

export function createUser({ uid, email, emailVerified }, role) {
  return firebase
    .database()
    .ref('users/' + uid)
    .set({
      uid,
      email,
      emailVerified,
      role,
    });
}

export function getUsersById(id) {
  return database
    .ref('/users/' + id)
    .once('value')
    .then((snapshot) => snapshot.val());
}

export function updateUserById(id, data) {
  return firebase.database().ref(`/users/${id}`).update(data);
}
