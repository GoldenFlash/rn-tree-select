import React, { Component } from "react"
import { StyleSheet, View, Image, FlatList, Text, TouchableOpacity } from 'react-native';

export default class Rntree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            treeData: this.initTreeData(JSON.parse(JSON.stringify(props.data||[])))
        }
    }
    onChange = () => {
        if (this.props.onChange) {
            let output = this.getCheckedValue()
            this.props.onChange(output)
        }
    }
    getCheckedValue = () => {
        let treeData = this.state.treeData
        let data = JSON.parse(JSON.stringify(treeData))
        let keys = Object.keys(treeData)
        let output = []
        keys.filter((key) => {
            let item = data[key]
            if (item.checked) {
                delete item.children
                delete item.isRoot
                delete item.expend
                delete item.checked
                delete item.hasChildrenChecked
                output.push(item)
            }
        })
        return output
    }
    initTreeData = (data) => {
        let tree = {}
        data.forEach((item) => {
            let id = item.id && item.id.toString()
            let parentId = item.parentId && item.parentId.toString()

            item.expend = this.props.expand_all || false
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
        return tree
    }
    toggleFold = (node) => {
        let treeData = this.state.treeData
        let nodeId = node.id
        if (!nodeId) return
        treeData[nodeId].expend = !node.expend
        this.setState({
            treeData
        })
    }
    toggleCheck = (node) => {
        let treeData = this.state.treeData
        let nodeId = node.id
        let parentId = node.parentId
        if (!nodeId) return
        treeData[nodeId].checked = !node.checked
        treeData[nodeId].hasChildrenChecked = false
        if (node.children && node.children.length) {
            this.checkSub(treeData, node)
        }
        if (parentId && treeData[parentId]) {
            this.checkParent(treeData, node)
        }
        this.onChange(treeData)
        this.setState({
            treeData
        })
    }
    checkParent = (treeData, node) => {
        let parentId = node.parentId
        let parentNode = treeData[parentId]
        if (parentNode.children && parentNode.children.length) {
            let parentChecked = parentNode.children.every((item) => {
                return item.checked
            })
            let hasChildrenChecked = parentNode.children.some((item) => {
                return item.checked || item.hasChildrenChecked
            })
            parentNode.hasChildrenChecked = hasChildrenChecked
            parentNode.checked = parentChecked
        }
        if (parentNode.parentId) {
            this.checkParent(treeData, parentNode)
        }
    }
    checkSub = (treeData, node) => {
        let nodeId = node.id
        let checked = node.checked
        let children = treeData[nodeId].children
        children.forEach((item) => {
            item.checked = checked
            item.hasChildrenChecked = false
            if (item.children && item.children.length) {
                this.checkSub(treeData, item)
            }
        })

    }
    _renderItem = ({ item }) => {
        return (
            <View>
                <View style={styles.items}>
                    {
                        item.children && item.children.length > 0 ?
                            <TouchableOpacity
                                onPress={() => {
                                    this.toggleFold(item)
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
                        onPress={() => {
                            this.toggleCheck(item)
                        }}>
                        <Image
                            style={styles.image}
                            resizeMode="contain"
                            source={
                                item.checked ?
                                    require("../icon/checkbox-marked.png") :
                                    item.hasChildrenChecked ?
                                        require("../icon/checkbox-indeterminate-fill.png") :
                                        require("../icon/check_box_outline_blank.png")
                            }
                        ></Image>
                    </TouchableOpacity>
                    <Text style={this.props.textStyle}>{item.name}</Text>
                </View>
                {
                    item.expend && item.children && item.children.length > 0 ?
                        this._renderBranch(item.children)
                        : null
                }
            </View>
        )

    }
    _renderBranch(data) {
        return (
            <View style={styles.branch_wrapper}>
                <FlatList
                    data={data}
                    extraData={this.state}
                    keyExtractor={(item, index) => "" + item.id + index}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
    render() {
        let treeData = this.state.treeData
        let key = Object.keys(treeData)
        let root = []
        key.forEach(item => {
            if (treeData[item].isRoot) {
                root.push(treeData[item])
            }
        })

        let { style } = this.props
        return (
            <View style={style}>
                {this._renderBranch(root)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    items: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5
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