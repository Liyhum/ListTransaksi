import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React ,{Component}from 'react';
import { StyleSheet, Text, View ,FlatList, AsyncStorage} from 'react-native';
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hg,
  widthPercentageToDP as wd
} from 'react-native-responsive-screen'
function convertToRupiah(angka)
{
	var rupiah = '';		
	var angkarev = angka.toString().split('').reverse().join('');
	for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
	return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
}
class LinksScreen extends Component {
  state = { 
    data:[],
    name:""
  }
  componentDidMount=async()=>{
    const value = JSON.parse(await AsyncStorage.getItem('history'))
    if(value != null) {
      this.setState({data:value})
      console.log(value)
    }
  }
  renderItem=(item)=>{
    const convert = convertToRupiah(item.price)
    return(
      <View style={styles.contentContainer}>
        <View>
          <Text style={{fontSize:15}}> {item.name} </Text>
          <Text style={{color:"#666565"}}> {item.date} </Text>
        </View>
        <Text> {convert} </Text>
      </View>
    )
  }
  delete=()=>{
    AsyncStorage.removeItem('history')
    alert("Data sudah ke hapus,Silahkan Refresh")
  }
  render() {
    const produc = this.state.data;
    let totalprice = 0;
    produc.forEach((item)=>{
      totalprice += item.price
    })
    const Cover = convertToRupiah(totalprice)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize:20,color:"white"}}>Data Transaksi</Text>
        </View>
        <View style={{top:10,left:10}}>
        <Text style={{fontSize:20}}> {Cover} </Text>
        </View>
        <View style={{
          width:'30%',
          alignSelf:'flex-end'
        }}>  
        <TouchableOpacity onPress={()=>this.delete()}>
          <Text style={{alignSelf:'flex-end',paddingTop:10,paddingRight:10}}>Hapus datanya </Text>
        </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.data}
          keyExtractor={(item)=>item.id}
          renderItem={({item})=>this.renderItem(item)}
          style={styles.contentContainer2}
        />
      </View>
    );
  }
}

export default LinksScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4d5d6',
  },
  header:{
    height:hg('10%'),
    width:wd('100%'),
    backgroundColor: '#0073ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10
  },
  contentContainer: {
    height:hg('10%'),
    width:wd('90%'),
    backgroundColor: 'white',
    marginTop:wd('5%'),
    alignSelf:'center',
    elevation:5,
    bottom:10,
    marginTop:wd('10%'),
    borderRadius:5,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:10,
    paddingVertical:10
  },
  contentContainer2:{
    height:hg('100%'),
    width:wd('100%')
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
