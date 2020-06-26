import React from "react";
import {Platform, View ,Text , StyleSheet ,KeyboardAvoidingView,TouchableOpacity,TextInput} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import colors from '../assets/color';
import tempData from '../assets/tempData'

export default class AddListModal extends React.Component{
    backgroundColors =["#52fc03","#038cfc","#fc0339","#966670","#3c59c2","#23bad9","#23d935"]
    state={
        name:'',
        color: this.backgroundColors[0]
    }
    createTodo =()=>{
        const {name,color} = this.state
        const list ={name,color}
        this.props.addList(list)
        this.setState({name:""});
        this.props.closeModal();
    }
    renderColors(){
        return this.backgroundColors.map(color=>{
            return(
                <TouchableOpacity 
                key={ color} 
                style={[Styles.colorSelect,{backgroundColor: color}]} 
                onPress={()=>this.setState({color})}
                />
            )
        })
    }
    render(){
        return(
            //<KeyboardAvoidingView style={Styles.Container} behavior="padding">
                <View style={Styles.Container} >
                <TouchableOpacity style={Styles.Touche} onPress={this.props.closeModal}>
                    <AntDesign name ="close" size={24} color={colors.black} />
                </TouchableOpacity>
                <View style={Styles.listTodo}>
                    <Text style={Styles.Title}> Create Todo List</Text>
                    <TextInput 
                    style={Styles.input} 
                    placeholder="List Name?"
                    onChangeText={text=> this.setState({ name:text })}
                    />
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:12}}>
                        {this.renderColors()}
                    </View>
                    <TouchableOpacity style={[Styles.create,{backgroundColor: this.state.color}]} onPress={this.createTodo}>
                        <Text style={Styles.submit}> Create!</Text>
                    </TouchableOpacity>
                </View>
                </View>
            //</KeyboardAvoidingView>
        )
    }
}
const Styles = StyleSheet.create({
    Container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Touche:{
        position: 'absolute',
        top:38,
        right:32
    },
    listTodo:{
        alignSelf:'stretch',
        marginHorizontal:32
    },
    Title:{
        fontSize:30,
        fontWeight:'bold',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
        color : colors.black,
        alignSelf:'center',
        marginBottom:16
    },
    input:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor:colors.blue,
        borderRadius:6,
        height:50,
        marginTop:8,
        paddingHorizontal:16,
        fontSize:18
    },
    submit:{
        color:colors.white,
        fontWeight:'800',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined
    },
    create:{
        marginTop:24,
        height:50,
        borderRadius:6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorSelect:{
        width:30,
        height:30,
        borderRadius:4
    }
})
