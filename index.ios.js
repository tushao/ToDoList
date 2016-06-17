/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var React = require('react');
var ReactNative = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  ScrollView,
  ListView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} = ReactNative;

var testData = [{"task":"当有待办事项存在时，我希望能看到待办事项列表"},
{"task":"当我输入文字并使用回车确认时，我希望新输入的待办事项项目显示在列表中"},
{"task":"当我点击待办事项左侧的checkbox时，待办事项应该标示为已完成"},
{"task":"当我点击已完成待办事项左侧的checkbox时，待办事项应该标示为未完成"},
{"task":"当我点击待办事项右侧的关闭按钮时，待办事项应当被删除"}];

var SampleRow = React.createClass({
     getInitialState(){
      return {
      checked: false,
    };
  },

   _onPress: function() {
    this.setState({
      checked: !this.state.checked,
    });
  },

  componentWillReceiveProps() {
    console.log(this.props.checked);
    this.setState({
      checked: this.props.checked,
    });
  },

  render() {    
    const source = this.state.checked ? 'https://www.drupal.org/files/project-images/Very-Basic-Checked-checkbox-icon.png' : 'http://www.clipartbest.com/cliparts/yTo/gj4/yTogj4zEc.png';
    const standard = this.state.checked ? styles.text1 : styles.text;
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this._onPress}>
          <View>
            <Image 
              source={{uri: source}}
              style={{width: 20, height: 20}} />
          </View>
        </TouchableHighlight>
        <View style={styles.rightContainer}>
          <Text style={standard}>{this.props.task}</Text>
        </View>
        <TouchableHighlight onPress={this.props.onDelete}>
            <Image 
              source={{uri: 'https://cdn1.iconfinder.com/data/icons/basic-ui-icon-rounded-colored/512/icon-02-128.png'}}
              style={{width: 20, height: 20}} />
        </TouchableHighlight>
      </View>
    );
  }
});

var ToDoList = React.createClass({
  getInitialState: function() {
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.task !== r2.task
    });

    return {
      pressing: false,
      data: testData,
      dataSource: this.ds.cloneWithRows(testData)
    };
  },
  
  // componentDidMount() {
  //   var listViewScrollView = this.refs.listView.getScrollResponder();
  // },

  addRow() {
    const newData = this.state.data.concat({task:this.state.text});
    console.log(this.state.text);
    this.setState({
      data: newData,
      dataSource: this.ds.cloneWithRows(newData),
    });
    this.setState({text : ''});
  },

  deleteRow(rowId){
    this.state.data.splice(rowId, 1);
    console.log(this.state.data, rowId);
    this.setState({
      data: this.state.data,
      dataSource: this.ds.cloneWithRows(this.state.data),
    });
  },

  renderRow(rowData, sectionId, rowId) {
    return(
    <SampleRow {...rowData} onDelete={()=>this.deleteRow(rowId)} style={styles.row} />
     );
  },

  clearText: function() {
    this._textInput.setNativeProps({text: ''});
  },

   render() {
    return (
      <View style={{flex:1, paddingTop: 20}}>
        <Text style={styles.text}>"饼 待办事项"</Text>
        <View style={styles.container}>
        <Image
            source={{uri: 'http://www.feathersnfurshoppe.com/images/smallanimaldocs/Hamster.gif'}}
            style={styles.image} />
        </View>
        <TextInput
          placeholder="请输入"
          style={{height: 40, borderColor: 'gray', borderWidth: 2}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text} 
          onSubmitEditing={this.addRow} />

        <ListView
        ref="listView"
        automaticallyAdjustContentInsets={false}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}/>
      </View>
        );
  },
});

var styles = StyleSheet.create({
  container: {
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',
   padding:20
  },
  rightContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "100",
    color: 'black',
  },
  text1: {
    fontSize: 24,
    fontWeight: "100",
    color: 'black',
    textDecorationLine: 'line-through'
  },
  image: {
    width: 100,
    height: 100
  },
   sectionHeader: {
    backgroundColor: '#48D1CC'
  },
  sectionHeaderText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16,
    color: 'white',
    paddingLeft: 10
  },
});

AppRegistry.registerComponent('ToDoList', () => ToDoList);