// import React from 'react';
// import { View,Text,FlatList } from "react-native";
// import firebase from 'firebase';
// import '@firebase/firestore'

// class testfire extends React.Component {
//      constructor(props){
//          super(props)
//              this.state={
//                  user:[]
//              }
//      }
//      componentDidMount(){
//         const firebaseConfig ={
//             apiKey: "AIzaSyAh1hTZi6hc-5yA0EWCSVoNPW3Ppo4tZ3k",
//             authDomain: "ttodoapps.firebaseapp.com",
//             databaseURL: "https://ttodoapps.firebaseio.com",
//             projectId: "ttodoapps",
//             storageBucket: "ttodoapps.appspot.com",
//             messagingSenderId: "903703119335",
//             appId: "1:903703119335:web:415e97d65ed30020256942",
//             measurementId: "G-533JSJ0XJ3"
//         }
//         if (!firebase.apps.length) {
//             firebase.initializeApp({});
//         }
//         const db = firebase.firestore();
//         this.ref= db.collection('users')
//         this.unsubscribe = ref.onSnapshot(snapshot=>{
//             const lists =[]
//             snapshot.forEach(doc=>{
//                 lists.push({
//                     task: doc.data().task
//                 })
//             })
//             this.setState({
//                 user:lists
//             })
//         })
//     }
     
//     render() {
//         return (
//             <View>
//                 <FlatList
//                 data={this.state.users}
//                 renderItem={(item)=>{
//                     <Text> {item.name} </Text>
//                 }}
//                 keyExtractor={item=>item.name}
//                 />
//             </View>
//         );
//     }
// }

// export default testfire;