# rn-tree-select

![The final rendering](./rn-tree-select.png)

## install
    ```
    $ npm install native-echarts --save 或 $ yarn add rn-tree-select 
    ```
## Usage
  ```
  import React, {Component} from 'react';
  import {View} from 'react-native';
  import Tree from "rn-tree-select"

  type Props = {};
  export default class App extends Component<Props> {
    render() {
      let data = [
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
      return (
        <View style={styles.container}>
          <Tree 
            style={styles.tree} 
            itemStyle={{marginTop:5}}
            textStyle={{color:"#333"}}
            data={data}
            onChange={(selectArr)=>{
              console.log("selectArr",selectArr)
            }}
            >
          </Tree>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  })
  ```
+ 选项列表
  ```
  let data = [
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
    //id为每一项的唯一标识
    //parentId 代表此项为id 等于parentId 的项的子项
  ```    

+ 获取选中数据
  - 可通过 onChange 事件获取
  ```
  onChange={(selectArr)=>{
     console.log("selectArr",selectArr)
  }}
  ```
- 通过ref获取

  ```
    let valueArr = this.refs.treeSelect.getCheckedValue()
  ```



## props

|Props|Explain|type|require|default|          
|:-------|:--------|:--------|:-------|:----------|
|data|数据，树结构数据|array|yes|[]|    
|onChange|勾选改变触发事件，返回选中节点组成的数组|function|no|no|  
|style|指定组件的整体样式|style|no|{}|
|itemStyle|指定item项的样式|style|no|{}|
|textStyle|指定每一项文字的样式|style|no|{}|

## methods
 - getCheckedValue 可获取选中项组成的数组
    ````
        let valueArr = this.refs.treeSelect.getCheckedValue(）
    ```
