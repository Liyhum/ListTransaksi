import React,{Component} from 'react';
import { 
  Image,
  TouchableWithoutFeedback, 
  Modal, 
  StyleSheet, 
  Keyboard,
  Text, 
  TouchableOpacity, 
  View,
  FlatList,
  TextInput ,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import colors from '../assets/color';
import {AntDesign} from '@expo/vector-icons';
import Data from '../assets/tempData'
import Todo from '../components/Todo'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {
  heightPercentageToDP as hg,
  widthPercentageToDP as wd
} from 'react-native-responsive-screen'

 

class ListStat extends Component {
  state = {  }
  renderSwip=()=>{
    return(
          <TouchableOpacity onPress={()=>this.props.delete()}>
            <View style={Styles.delete}>
                  <Text style={Styles.textDelete}>Delete</Text>
            </View>
          </TouchableOpacity>
    )
  }
  delete(){
    AsyncStorage.clear()
  }
  render() {
    const {item,index,id} = this.props;
    const convert = convertToRupiah(item.price)
    
   if (item.price <= 0) {
    return (
      <Swipeable renderRightActions={this.renderSwip}>
        <View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
            <View style={[Styles.Listdata,Styles.Listdata3]}>
              <Text style={Styles.ItemText}> {item.name} </Text>
              <Text style={Styles.ItemText}> {convert} </Text>
            </View>
          </View>
        </View>
      </Swipeable>
  
    );
   }
   else{
    return (
      <Swipeable renderRightActions={this.renderSwip}>
        <View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
            <View style={[Styles.Listdata,Styles.Listdata2]}>
              <Text style={Styles.ItemText}> {item.name} </Text>
              <Text style={Styles.ItemText2}> {convert}</Text>
            </View>
         </View>
        </View>
      </Swipeable>
    );
   }
  }
}

function convertToRupiah(angka)
{
	var rupiah = '';		
	var angkarev = angka.toString().split('').reverse().join('');
	for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
	return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
}
class HomeScreen extends Component {
  state={
    loading :false,
    user:{},
    name : '',
    price:null,
    price2:"-" ,
    id:"",
    data:[
    ],
    visible:false,
    visible2:false
  }
  componentDidMount=()=>{
    this.getData()
  }
  getData=async()=>{
    const value = JSON.parse(await AsyncStorage.getItem('user'))
    if(value != null) {
      this.setState({data:value})
      console.log(value)
    }
    this.setState({loading:false})
  }
  onRefresh(){
    console.log('refresh')
    this.setState({loading:true,},()=>{
      this.getData()
    })
  }
  toggleAddTodo (){
    this.setState({addTodoVisible: !this.state.addTodoVisible})
  }
  renderList = (list) =>{
    return <Todo list={list} updateList={this.updateList}/>
  }
  deletes= async(item,index)=>{
    let data = [...this.state.data]
    data.splice(index,1)
    this.setState({data:data})
    console.log("=+=+=+",got)
  }
  deleteall=()=>{
    AsyncStorage.removeItem('user')
    alert("Terhapus semua silahkan reload")
  }
  sumbit=async ()=>{
        var currentdate = new Date(); 
        var dateDay =  currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/" 
                        + currentdate.getFullYear() 
        var dateHour =  currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds(); 
        const data = this.state.data;
        let auto2 = Date.now()
        let price = this.state.price
      if(this.state.price != null){
        if(this.state.name !=""){
          this.setState({id:auto2,name:"",price:parseInt(price)})
          data.push({
            id:auto2,
            name:this.state.name,
            price:parseInt(this.state.price),
            date:dateDay,
            hours:dateHour
          })
          await AsyncStorage.setItem('user',JSON.stringify(this.state.data))
          await AsyncStorage.setItem('history',JSON.stringify(this.state.data))
          const value = JSON.parse(await AsyncStorage.getItem('user'))
          console.log(value)
          alert("masuk")
          alert('success')
        }else{
          alert('Silahkan masukan Barangnya')
        }
      }else{
        alert("Silahkan masukan Hargnya")
      }
    
    }
  
  render(){
    const produc = this.state.data;
    let totalprice = 0;
    produc.forEach((item)=>{
      totalprice += item.price
    })
    const conver= (convertToRupiah(totalprice))
    return(
      <View style={Styles.container}>
        <Modal 
        visible={this.state.visible}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessibility={false}>
            <View style={Styles.ModalStyle}>
                  <View style={Styles.ButtonContainer}>
                    <Text style={{
                      fontSize:20,
                      color:'white'
                    }}>
                      Pemasukan
                    </Text>
                    <TouchableOpacity onPress={()=>this.setState({visible:false})}>
                      <AntDesign 
                      name="close" 
                      size={30}
                      color='white'
                      />
                    </TouchableOpacity>
                  </View> 
              <View style={Styles.Input}>
                <TextInput
                placeholder="Masukin Barang"
                onChangeText={(text)=>this.setState({name:text})}
                />
              </View>
              <View style={Styles.Input}>
                <TextInput
                placeholder="Masukin Harga"
                onChangeText={(text)=>this.setState({price:text})}
                keyboardType='number-pad'
                />
              </View>
              <View style={Styles.ButtonMasukan}>
                <TouchableOpacity onPress={()=>this.sumbit()}>
                  <View style={Styles.ButtonMasukan2}>
                    <Text style={Styles.TextMasukan}>Masukan Data</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal 
        visible={this.state.visible2}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessibility={false}>
            <View style={Styles.ModalStyle}>
                  <View style={Styles.ButtonContainer}>
                    <Text style={{
                      fontSize:20,
                      color:'white'
                    }}>
                      Pengeluran
                    </Text>
                    <TouchableOpacity onPress={()=>this.setState({visible2:false})}>
                      <AntDesign 
                      name="close" 
                      size={30}
                      color='white'
                      />
                    </TouchableOpacity>
                  </View> 
                  <Text style={{fontSize:15,color:'white',left:20}}>Jika untuk pengeluran silahkan tambah -</Text>
              <View style={Styles.Input}>
                <TextInput
                placeholder="Masukin Barang"
                onChangeText={(text)=>this.setState({name:text})}

                />
              </View>
              <View style={Styles.Input}>
                <TextInput
                placeholder="Masukin Harga"
                onChangeText={(text)=>this.setState({price2:text,price:text})}
                keyboardType='numeric'
                value={this.state.price2}
                />
              </View>
              <View style={Styles.ButtonMasukan}>
                <TouchableOpacity onPress={()=>this.sumbit()}>
                  <View style={Styles.ButtonMasukan2}>
                    <Text style={Styles.TextMasukan}>Masukan Data</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <View style={Styles.Header}>
          <Text style={Styles.textHeader}>Dashboard</Text>
        </View>
        <View style={Styles.balanceContainer}>
          <Text style={{fontSize:20,color:'#fae5c8'}}>Total Uang</Text>
          <Text style={{fontSize:40,color:'#fae5c8'}}> {conver} </Text>
          <View style={[Styles.ImageContainer,Styles.ImageContainer2]}>
            <TouchableOpacity
            onPress={()=>this.setState({visible:true})}
            style={Styles.Image}
            >
                <Image source={require('../assets/images/income.png')}
                style={Styles.Image}
                />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>this.setState({visible2:true})}
            style={Styles.Image2}
            >
                <Image source={require('../assets/images/spending.png')}
                style={Styles.Image2}
                />
            </TouchableOpacity>
          </View>
          
        </View>
        <View style={{
          width:"100%",
        }}>  
          <TouchableOpacity onPress={()=>this.deleteall()}>
            <View style={{
              width:wd('35%'),
              alignSelf:'flex-end',
              marginRight:20
            }}>
              <Text style={{color:'white'}}>
                Hapus Semua data
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
        data={this.state.data}
        keyExtractor={item=>item.id}
        renderItem={({item,index})=><ListStat 
          item={item} 
          delete={()=>this.deletes(item,index,id)}
        />
      }
        onRefresh={()=>this.onRefresh()}
        refreshing={this.state.loading}
        style={{padding:10,marginBottom:wd('5%')}}
        showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }
}
export default HomeScreen
const Styles = StyleSheet.create({
  container :{
    flex:1,
    backgroundColor: '#45ccf5',
  },
  textHeader:{
    fontSize:25,
    color:'white'
  },
  Header:{
    height:hg('10 %'),
    width:wd('100%'),
    backgroundColor: '#45ccf5',
    justifyContent: 'center',
    paddingLeft:20,
    top:10
  },  
  Listdata:{
    flexDirection:'row',
    height:50,
    width:wd('90%'),
    alignItems: 'center',
    borderRadius:50,
    backgroundColor: '#c4fbff',
    marginVertical:10,
    justifyContent:'center',
  },
  ActionButton:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:70,
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: hg('20%'),
    height:70,
    backgroundColor:'#fff',
    borderRadius:100,
    backgroundColor: '#344feb',
  },
  Listdata2:{ 
    justifyContent: 'space-between',
    paddingHorizontal:20,
    marginBottom:20,
    borderColor:'#5ca5ff',
    borderWidth:3
  }, 
  ButtonContainer:{
    flexDirection:'row',
    justifyContent: 'space-between',
    top:20,
    marginHorizontal:20,
    height:hg('10%')
  } ,
  TextMasukan:{
    fontSize:20,
    color:'white'
  },
  delete:{
    justifyContent: 'center',
    alignItems:'center',
    height:70,
    width:wd('20%'),
    backgroundColor: 'red',
  } , 
  textDelete:{
    fontSize:15,
    color:'white'
  },
  ButtonMasukan:{
    height:hg('7%'),
    backgroundColor:'#4f40f5' ,
    width:wd('50%'),
    alignItems:'center',
    justifyContent: 'center', 
    borderRadius:30,
    alignSelf:'center',
    marginTop:20
  },
  ButtonMasukan2:{
    height:hg('7%'),
    backgroundColor:'#4f40f5' ,
    width:wd('50%'),
    alignItems:'center',
    justifyContent: 'center', 
    borderRadius:30,
    alignSelf:'center',
  },
  Input:{
    height:50,
    width:wd('80%'),
    backgroundColor: 'white',
    alignSelf:'center',
    borderRadius:20,
    marginTop:20,
    paddingHorizontal:20,
    justifyContent: 'center',
  },
  ModalStyle:{
    backgroundColor: '#45ccf5',
    height:hg('100%'),
    width:wd('100%')
  },
  Listdata3:{ 
    justifyContent: 'space-between',
    paddingHorizontal:20,
    marginBottom:20,
    borderColor:'#ff3838',
    borderWidth:3
  },  
  ItemText:{
    fontSize:15,
    color:'#025f66',
  },
  Image:{
    height:50,
    width:50,
    tintColor:'#fae5c8',
  },
  Image2:{
    height:50,
    width:50,
    tintColor:'#fae5c8',
    bottom:wd('2%')
  },
  ImageContainer:{
    height:hg('10%'),
    width:wd("90%"),
    // backgroundColor: 'white',
    alignSelf:"center",
    justifyContent: 'center',
  },
  ImageContainer2:{
    flexDirection:"row",
    justifyContent: 'space-between',
    marginTop:hg('3%'),
    paddingHorizontal:wd('10%')
  },
  balanceContainer:{
    height:hg('25%'),
    width:wd('80%'),
    alignSelf:'center',
    borderRadius:10,
    marginTop:wd('4%')
  },
  divider :{
    backgroundColor: colors.lightblue,
    height:1,
    flex:1,
    alignSelf:'center'
  },
  flex:{
    flexDirection:'row',
    marginTop:80
  },
  title:{
    fontSize:38,
    color : colors.black,
    paddingHorizontal:64,
    fontWeight:'bold'
  },
  title2:{
    fontWeight:"300",
    color:colors.blue
  },
  plus:{
    marginVertical:48
  },
  addList:{
    borderWidth:2,
    borderColor:colors.lightblue,
    borderRadius:4,
    padding:16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add:{
    color:colors.blue,
    fontWeight:'bold',
    fontSize:14,
    marginTop:8
  },
  dataList:{
    flex:1,
    paddingLeft:32
  }
})
