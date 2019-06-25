import React,{Component} from "react"
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
let list = [
    { "id": 1000, "name": 1000 },
    { "id": 1100, "name": 1100, "parentId": 1000 },
    { "id": 1110, "name": 1110, "parentId": 1100 },
    { "id": 1120, "name": 1120, "parentId": 1100 },
    { "id": 1121, "name": 1121, "parentId": 1120 },
    { "id": 1122, "name": 1122, "parentId": 1120 },
    { "id": 1200, "name": 1200, "parentId": 1000 },
    { "id": 1210, "name": 1210, "parentId": 1200 },
    { "id": 1300, "name": 1300, "parentId": 1000 },
    { "id": 2000, "name": 2000 },
    { "id": 2100, "name": 2100, "parentId": 2000 },
    { "id": 2200, "name": 2200, "parentId": 2000 }
]
export default class Rntree extends Component{
    constructor(props){
        super(props)
        this.state={
            treeData: this.initTreeData(list)
        }
    }
    initTreeData=()=>{
        let tree = {}
        let list = this.state.list
        list.forEach((item)=>{
            let id = item.id
            let parentId = item.parentId
            if(!tree[id]){
                item.expend= false
                item.checked = false
                tree[id] = item
            }
            if(parentId){
                tree[parentId].children =[] 
                tree[parentId].children.push(item)
            }
        })
        console.log("treeData", treeData)
        return tree

    }
    render(){
        return(
            <View>

            </View>
        )
    }
}