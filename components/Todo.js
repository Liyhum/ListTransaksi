import React,{Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,FlatList ,Modal} from 'react-native';
import colors from '../assets/color';
import TodoModal from './TodoModal'

export default class Todo extends Component{
   state={
       showListVisible:false
   }
   toggleListModal (){
       this.setState({showListVisible:!this.state.showListVisible})
   }
    render(){
        const list =this.props.list
        const completeCount = list.todos.filter(todo=> todo.completed).length;
        const RemainingCount = list.todos.length - completeCount;

        return(
            <View>
                <Modal
                animationType='slide'
                visible={this.state.showListVisible}
                onRequestClose={()=>this.toggleListModal()}
                >
                    <TodoModal list={list} closeModal = {()=>this.toggleListModal()} updateList={this.props.updateList}/>
                </Modal>
                <TouchableOpacity 
                style={[Styles.listContainer,{backgroundColor: list.color},]} 
                onPress={()=>this.toggleListModal()}
                >
                <Text style={Styles.listTitle} numberOfLines={1}>
                    {list.name}
                </Text>
                    <View>
                        <View style={Styles.lignList}>
                            <Text style={Styles.count}>{RemainingCount}</Text>
                            <Text style={Styles.subtitle}>Remaining</Text>
                        </View>
                        <View style={Styles.lignList}>
                            <Text style={Styles.count}>{completeCount}</Text>
                            <Text style={Styles.subtitle}>Complete</Text>
                        </View>
                    </View>       
                </TouchableOpacity>
            </View>
        )
    }
}
const Styles = StyleSheet.create({
    listContainer:{
        paddingVertical:32,
        paddingHorizontal:16,
        borderRadius:6,
        marginHorizontal:12,
        alignItems:'center',
        width:200
    },
    listTitle:{
        fontSize:24,
        fontWeight:'bold',
        color:colors.white,
        marginBottom:18
    },
    count:{
        fontSize:48,
        fontWeight:'200',
        color:colors.white,
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined
    },
    subtitle:{
        fontSize:12,
        fontWeight:'700',
        color:colors.white,
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined

    },
    lignList:{
        alignItems:'center'
    },
    
})