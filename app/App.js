import React, { Component } from 'react';
import { StatusBar, ToolbarAndroid, View, ListView, Text, StyleSheet, TextInput } from 'react-native';

/*
* View = <div>
* Text = <p>
* TextInput = <textinput>
*/

// data source
const todoListData = [
  { text: "todo list 1" },
  { text: "todo list 2" },
];

class App extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds,
      text: '',
    }

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }
  renderList(rowData) {
    return (
      <View style={Styles.listItem}>
        <Text>{rowData.text}</Text>
      </View>
    );
  }
  componentDidMount() {
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(todoListData),
    });
  }
  onHandleSubmit() {

    // create new task
    todoListData.push({ text: this.state.text });

    // refetch task list
    return this.setState({
        dataSource: this.state.dataSource.cloneWithRows(todoListData),
    });
  }
  render() {
    return (
        <View style={Styles.container}>
          <StatusBar
            backgroundColor="#303F9F"
            barStyle="light-content"
          />
          <ToolbarAndroid
            style={Styles.toolBar}
            title="Todo App"
            titleColor="white"
          />
          <TextInput
            placeholder="Enter a new task"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            onSubmitEditing={this.onHandleSubmit}
          />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderList}
          />
        </View>
    );
  }
}

// stylesheet
const Styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    toolBar: {
      backgroundColor: '#3F51B5',
      height: 50,
    },
    listItem: {
      padding: 10,
      borderBottomWidth: 0.5,
      borderColor: '#B6B6B6',
    }
});

export default App;
