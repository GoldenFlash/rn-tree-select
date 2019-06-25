import React, { Component } from "react"
import { StyleSheet, View, Image, FlatList, Text, TouchableOpacity } from 'react-native';

export default class Rntree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            treeData: this.initTreeData(props.data)
        }
    }
    initTreeData = (data) => {
        // let root = []
        let tree = {}

        data.forEach((item) => {
            let id = item.id && item.id.toString()
            let parentId = item.parentId && item.parentId.toString()

            item.expend = false
            item.checked = false

            if (parentId) {
                if (tree[parentId].children) {
                    tree[parentId].children.push(item)
                } else {
                    tree[parentId].children = []
                    tree[parentId].children.push(item)
                }
            }
            if (!parentId) {
                item.isRoot = true
            }

            if (!tree[id]) {
                tree[id] = item
            } else {
                tree[id] = {
                    ...item,
                    ...tree[id]
                }
            }

        })
        console.log("treeData", tree)
        return tree

    }
    toggleFold = (node) => {
        let treeData = this.state.treeData
        let nodeId = node.id
        if(!nodeId) return
        treeData[nodeId].expend = !node.expend
        console.log("node", node)
        this.setState({
            treeData
        })
    }
    toggleCheck=(node)=>{
        let treeData = this.state.treeData
        let nodeId = node.id 
        if (!nodeId) return
        treeData[nodeId].checked = !node.checked
        treeData[nodeId].hasChildrenChecked = false
        if (node.children) {
            this.checkSub(treeData, node)
        }
        if (node.parentId){
            this.checkParent(treeData, node)
        }
       
        this.setState({
            treeData
        })
    }
    checkParent=(treeData,node)=>{
        let parentId = node.parentId
        let parentNode = treeData[parentId]
        if (parentNode.children && parentNode.children.length){
            let parentChecked = parentNode.children.every((item) => {
                return item.checked
            })
            let hasChildrenChecked = parentNode.children.some((item) => {
                return item.checked || item.hasChildrenChecked
            })
            parentNode.hasChildrenChecked = hasChildrenChecked
            parentNode.checked = parentChecked
        }
        if (parentNode.parentId){
            this.checkParent(treeData,parentNode)
        }
    }
    checkSub=(treeData,node)=>{
        let nodeId = node.id
        let checked = node.checked
        let children = treeData[nodeId].children
        children.forEach((item)=>{
            item.checked = checked
            if (item.children&&item.children.length){
                this.checkSub(treeData, item)
            }
        })
    }
    render() {
        let treeData = this.state.treeData
        // treeData[1110].a = 1
        let key = Object.keys(treeData)
        console.log("key", key)
        let root = []
        key.forEach(item => {
            if (treeData[item].isRoot) {
                root.push(treeData[item])
            }
        })
        console.log("root", root)

        let { style } = this.props
        return (
            <View style={style}>
                <Branch
                    data={root}
                    toggleFold={this.toggleFold}
                    toggleCheck={this.toggleCheck}
                ></Branch>
            </View>
        )
    }
}

function Branch(props) {
    let data = props.data || []
    console.log("data", data)
    return (
        <View style={styles.branch_wrapper}>
            {
                data.map((item, index) => {
                    return (
                        <View key={index}>
                            <View style={styles.items}>
                                {
                                    item.children && item.children.length > 0 ?
                                        <TouchableOpacity
                                            onPress={() => {
                                                props.toggleFold(item)
                                            }}
                                        >
                                            <Image
                                                resizeMode="contain"
                                                style={styles.image}
                                                source={
                                                    item.expend ?
                                                        require("../icon/arrow-down-b.png") :
                                                        require("../icon/arrow-right-b.png")}
                                            ></Image>
                                        </TouchableOpacity>
                                        : null
                                }
                                <TouchableOpacity  
                                    style={item.children ? null : { marginLeft: 20 }}
                                    onPress={()=>{
                                    props.toggleCheck(item)
                                }}>
                                    <Image
                                        style={styles.image}
                                        resizeMethod="contain"
                                        source={
                                            item.checked?
                                            require("../icon/checkbox-marked.png"):
                                            item.hasChildrenChecked?
                                            require("../icon/checkbox-indeterminate-fill.png"):
                                            require("../icon/check_box_outline_blank.png")
                                        }
                                    ></Image>
                                </TouchableOpacity>
                                <Text>{item.name}</Text>
                            </View>
                            {
                                item.expend && item.children && item.children.length > 0 ?
                                    <Branch {...props} data={item.children}></Branch> : null
                            }
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    items: {
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        width: 20,
        height: 20
    },
    branch_wrapper: {
        marginLeft: 20,
        justifyContent: "flex-start"
    }
})