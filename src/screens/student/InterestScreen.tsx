import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, TouchableOpacity, ActivityIndicator, FlatList, ToastAndroid, SafeAreaView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GetKeywordListAPI, GetSelectedKeywordListAPI, KeywordUpdateAPI, SendSelectedKeywordListAPI } from '../../api-services/User.api';
import Colors from '../constants/Colors';
import { IUpdateKeyword } from '../models/Auth.models';
import DropDownPicker from 'react-native-dropdown-picker';
import { indexOf } from 'lodash';
import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";





interface Props {
  navigation: any;
}

interface State {
  isPressed: boolean;
  keywordList: any[],
  checkedKeywords: any[];
  keywordSelected: any;
  selectedItems: any[];
  isMandatoryOpen: boolean


}



export default class InterestScreen extends React.Component<Props, State> {
  multiSelect: any;
  // multiSelect: MultiSelect | null | undefined;
  constructor(props: Props) {
    super(props);

    this.state = {
      isPressed: false,
      keywordList: [],
      checkedKeywords: [],
      keywordSelected: [],
      selectedItems: [],
      isMandatoryOpen: false

    };
  }

  componentDidMount(): void {
    this._getKeywordListHandler();
    this._getSelectedKeywordListHandler();

  }

  componentWillUnmount(): void {

  }


  _getKeywordListHandler(): void {
    // debugger;
    GetKeywordListAPI()
      .then(response => {
        const statusCode = response.status;
        const data = statusCode === 200 ? response.json() : [];

        return Promise.all([statusCode, data]).then(res => ({
          statusCode: res[0],
          data: res[1]
        }));
      })
      .then((res: {
        statusCode: number,
        data: {
          payload: {
            lists: any;
            map(arg0: (cities: any) => { label: any; }): any[];
            cities: any[];
            response: any[],
          }
          message: string
        }
      }) => {

        if (res.statusCode === 200) {
          this.setState({
            keywordList: res.data.payload.lists.rows
              .map((rows: any, index: any) => {
                return {
                  id: index + 1,
                  label: rows.attribute,
                  value: rows.attribute

                };
              })
          })
          //console.log(this.state.keywordList, "///////////////////")



          // const _inputs = [...this.state.keywordList];
          // const payload = res.data.payload.lists.rows;
          // console.log("payload", payload)
          // payload.map((data: any, index: number) =>
          //   _inputs.push({
          //     keyword: data.attribute,
          //     id: index,
          //     isChecked: false
          //   }),
          // );
          // this.setState({
          //   keywordList: _inputs,
          // });
          // console.log("state", _inputs[0].keyword)
        }
      });

  }

  _getSelectedKeywordListHandler(): void {
    // debugger;
    GetSelectedKeywordListAPI()
      .then(response => {
        const statusCode = response.status;
        const data = statusCode === 200 ? response.json() : [];

        return Promise.all([statusCode, data]).then(res => ({
          statusCode: res[0],
          data: res[1]
        }));
      })
      .then((res: {
        statusCode: number,
        data: {
          payload: any;
          message: string,
        }
      }) => {
        // debugger; 

        if (res.statusCode === 200) {
          this.setState({
            keywordSelected: res.data.payload
              .map((payload: any) =>
                payload.attribute


              )
          })

        }
      });

  }

  SendKeywordHandler(): void {
    let selectedKeywords = this.state.keywordList?.filter(
      product => product.isChecked,
    ).map((data) => data.keyword);

    const payload: IUpdateKeyword = {
      keyword: this.state.keywordSelected
    }
    // debugger
    SendSelectedKeywordListAPI(payload)
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();

        return Promise.all([statusCode, data]).then((res) => ({
          statusCode: res[0],
          data: res[1],
        }));
      })
      .then(
        (res: {
          statusCode: number;
          data: { payload: any; message: string };
        }) => {
          if (res.statusCode === 200) {
// debugger;
            // this.props.navigation.navigate("student");
            // ToastAndroid.show("Successfully updated", ToastAndroid.SHORT);
            showMessage({
              message: "Successfully Updated",
              type: "success",
            });
            this.props.navigation.navigate("Dashboard");
          //   setTimeout(() => {
          //     this.props.navigation.navigate("Dashboard");
          // }, 1000);

          }
          // console.log('::::::::', this.state.isPressed)
        }
      );

  }




  _handleChange = (id: any) => {
    let temp = this.state.keywordList.map(product => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    this.setState({ keywordList: temp });
  };


  renderItem = ({ item }: any) => (
    <Checkbox.Item
      label={item.keyword}
      status={item.isChecked ? 'checked' : 'unchecked'}
      onPress={() => {
        this._handleChange(item.id);
      }}
      mode={'android'}
      // position={'leading'}
      // uncheckedColor={Colors.unchecked}
      color={Colors.primary}
      style={{ width: '80%' }}
    //labelStyle={{ fontSize: 12, fontFamily: 'Poppins-Regular' }}
    />

  );

  onSelectedItemsChange = (keywordSelected: any) => {
    this.setState({ keywordSelected });
  };

  items = [{
    id: '92iijs7yta',
    name: 'Ondo'
  }, {
    id: 'a0s0a8ssbsd',
    name: 'Ogun'
  }, {
    id: '16hbajsabsd',
    name: 'Calabar'
  }, {
    id: 'nahs75a5sg',
    name: 'Lagos'
  }, {
    id: '667atsas',
    name: 'Maiduguri'
  }, {
    id: 'hsyasajs',
    name: 'Anambra'
  }, {
    id: 'djsjudksjd',
    name: 'Benue'
  }, {
    id: 'sdhyaysdj',
    name: 'Kaduna'
  }, {
    id: 'suudydjsjd',
    name: 'Abuja'
  }
  ];


  setValue(callback: any) {
    this.setState(state => ({
      keywordSelected: callback(state.keywordSelected)
    }));
  }

  setItems(callback: any) {
    this.setState(state => ({
      keywordList: callback(state.keywordList)
    }));
  }


  render(): React.ReactNode {
    // const { selectedItems } = this.state.keywordList;
    return (
      <SafeAreaView>
        <FlashMessage position="top" />
        <View style={{ padding: 20, flexDirection: "row" }}>
          <Ionicons
            name={"arrow-back"}
            size={25}
            color={Colors.black}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text
            style={{
              fontSize: 16,
              marginLeft: 15,
              fontWeight: "700",
              color: "black",
            }}
          >
            Interest
          </Text> 
        </View>

        <View style={{ marginBottom: 50, padding: 10, paddingTop: 50 }}>


          <DropDownPicker
            // searchable={true}
            open={this.state.isMandatoryOpen}
            value={this.state.keywordSelected}
            items={this.state.keywordList}
            // style={FormInput.text_input}
            //dropDownDirection={'TOP'}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            setOpen={() =>
              this.setState({ isMandatoryOpen: !this.state.isMandatoryOpen })
            }
            setValue={(callback) => this.setValue(callback)}
            setItems={(callback) => this.setItems(callback)}
            multiple={true}
            mode="BADGE"
            badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a"]}

          />


          <TouchableOpacity
            style={styles.loginBtn}
            // onPress={() => this.props.navigation.navigate('Student')}
            onPress={() => this.SendKeywordHandler()}
          >
            {/* <Text style={{ color: "white" }}>LOGIN</Text> */}


            <Text style={{ color: "white" }}>
              {
                !this.state.isPressed ? 'Save' : ''
              }
            </Text>
            {
              !this.state.isPressed
                ? <Text></Text>
                : <ActivityIndicator
                  size={'small'}
                  color={Colors.white}
                />
            }
          </TouchableOpacity>
        </View >

      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  loginBtn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#1E276F",
    flexDirection: 'row',
    alignSelf: 'center'
  },
  root: {
    // alignItems: 'center',
    // padding: 20,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
  heading: {
    fontSize: 18,
    paddingTop: 5,
    color: '#0A1042',
    fontWeight: '500'
  },
  heading1: {
    color: '#686A7B',
    fontSize: 12,
    fontWeight: '500'

  },
  heading3: {
    fontSize: 18,
    paddingTop: 30,
    color: '#0A1042',
    fontWeight: '500'

  },
  badge: {
    width: 56,
    height: 56,
    backgroundColor: '#9D9D9D',
    borderRadius: 20,
  },
  box: {
    backgroundColor: '#3785E010',
    borderRadius: 14,
    width: 320,
    height: 93,
    marginTop: 30,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  boxtext: {
    fontWeight: '600',
    fontSize: 18,
    color: '#3F9AE0',
    paddingRight: 30,
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
  },
  action_box: {
    width: 150,
    height: 93,
    borderRadius: 14,
    margin: 10,
    marginTop: 25,
    paddingLeft: 20,
    paddingTop: 20
  },
  action_box_text: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  action_box_smalltext: {
    fontWeight: '500',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)'
  },
  item3: {
    backgroundColor: '#1E276F',
    padding: 20,
    paddingTop: 10,
    // marginVertical: 10,
    width: 370,
    borderRadius: 14,
  },
  item: {
    backgroundColor: '#FFFFFF',
    // padding: 20,
    // paddingTop: 10,
    // marginVertical: 10,
    width: 200,
    borderRadius: 14,
    marginHorizontal: 10
  },


  item1: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    paddingTop: 10,
    // marginVertical: 10,
    width: 370,
    borderRadius: 14,
  },
  profile: {
    flexDirection: 'row',
    alignSelf: 'flex-end',

  },
  bellicon: {
    marginBottom: 2,
    marginRight: 15,
    alignSelf: 'flex-end',

  },
  adminlogo: {
    alignSelf: 'flex-end',

  },

  dropDownContainerStyle: {
    borderColor: Colors.text,
    width: "100%",
    height: "300%"
  },
});

