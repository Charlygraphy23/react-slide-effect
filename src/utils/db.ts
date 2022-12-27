import { collection, DocumentData, getDocs, getFirestore } from "firebase/firestore";
import {app} from './firebase'


const db = getFirestore(app);


export const getDataCollection = async (name : string) => {

    const ref = collection(db, name);
    const docs =  await getDocs(ref);
   const _arr: DocumentData[] = []

   docs.forEach(_doc => {
    _arr.push(_doc.data())
   })

   return _arr

}