import React, { Component } from 'react'
import { View, Text, Image, Alert, Modal, SafeAreaView, StyleSheet, TouchableOpacity, Touchable, TextInput } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
class LoginScreen extends Component {
    constructor() {
        super()
        this.state = {
            UserList: [],
            name: '',
            age: '',
            image_src: '',
            status: '',
            modalVisible: false,
            open: false,
            value: null,
        }
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    addHandler = (visible) => {
        this.setState({ modalVisible: visible });
        this.setState({ name: '', age: '', image_src: '', status: '' })
    }
    setOpen = (open) => {
        this.setState({
            open
        });
    }
    submitHandler = () => {
        this.setModalVisible(false)
        const { name, age, image_src, status, UserList } = this.state
        if (name && age && image_src && status) {
            var userListTemp = UserList
            let lastElemet = userListTemp[userListTemp.length - 1]

            var temp = {
                id: lastElemet && lastElemet.id ? lastElemet.id + 1 : + 1,
                name, age, image_src, status
            }


            userListTemp.push(temp)
            this.setState({ UserList: userListTemp, name: '', age: '', image_src: '', status: '' })
        } else {
            alert('Enter all values')
        }

    }
    deleteHandler = (id) => {
        const { name, age, image_src, status, UserList } = this.state
        var userListTemp = []
        UserList.map(item => {
            if (item.id != id) {
                userListTemp.push(item)
            }
        })
        this.setState({ UserList: userListTemp })
    }
    deleteAlertHandler = (id) => {
        Alert.alert(
            "Do you really want to delete this",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.deleteHandler(id) }
            ]
        );
    }
    statusHandler = (id) => {
        const { name, age, image_src, status, UserList } = this.state
        var userListTemp = []
        UserList.map(item => {
            if (item.id == id) {
                let newStatus = item.status
                if (item.status == 'Active') {
                    newStatus = 'InActive'
                } else if (item.status == 'InActive') {
                    newStatus = 'Blocked'

                } else if (item.status == 'Blocked') {
                    newStatus = 'Active'
                }
                item.status = newStatus
                userListTemp.push(item)
            } else {
                userListTemp.push(item)
            }
        })
        this.setState({ UserList: userListTemp })
    }
    imageHandler = (id) => {
        this.selectPhotoTappedForAnItem(id)
    }
    renderListItems = () => {
        const { UserList } = this.state
        return (
            <View >
                {UserList.map((item, index) => {
                    const { name, age, image_src, status, id } = item
                    return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', margin: 25, marginBottom: 5 }}>
                            <Text style={styles.textStyles}>{name}</Text>
                            <Text style={styles.textStyles}>{age}</Text>
                            <View>
                                <TouchableOpacity onPress={() => this.imageHandler(id)} >
                                    <Image
                                        source={{ uri: image_src.uri }}
                                        style={{
                                            width: 50,
                                            height: 50,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.statusHandler(id)} >
                                <Text style={styles.textStyles}>{status}</Text>
                            </TouchableOpacity>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <TouchableOpacity onPress={() => this.deleteAlertHandler(id)} >
                                    <Image
                                        style={{ width: 30, height: 30, marginLeft: 5 }}
                                        source={require('../images/activedelete.png')}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </View>
        )

    }
    setValue = (callback) => {
        this.setState(state => ({
            status: callback(state.value)
        }));
    }


    selectPhotoTapped = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        launchImageLibrary(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.assets[0].uri };
                this.setState({
                    image_src: source,
                });
            }
        });
    }
    selectPhotoTappedForAnItem = (id) => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        launchImageLibrary(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.assets[0].uri };
                const { UserList } = this.state
                var userListTemp = []
                UserList.map(item => {
                    if (item.id == id) {
                        item.image_src = source
                        userListTemp.push(item)
                    } else {
                        userListTemp.push(item)
                    }
                })
                this.setState({ UserList: userListTemp })
            }
        });
    }
    renderModal = () => {
        const { modalVisible, name, image_src, status, age, open } = this.state
        var items = [{ label: 'Active', value: 'Active' },
        { label: 'InActive', value: 'InActive' },
        { label: 'Blocked', value: 'Blocked' },
        ]
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View >
                            <Text style={{ fontSize: 20, marginLeft: 20 }}>Enter name</Text>
                            <TextInput style={styles.input} value={name} onChangeText={(text) => this.setState({ name: text })} />
                        </View>
                        <View >
                            <Text style={{ fontSize: 20, marginLeft: 20 }}>Enter Age</Text>
                            <TextInput style={styles.input} value={age} onChangeText={(text) => this.setState({ age: text })} />
                        </View>
                        <View >
                            <Text style={{ fontSize: 20, marginLeft: 20 }}>Enter Status</Text>
                            <DropDownPicker
                                open={open}
                                value={status}
                                items={items}
                                setOpen={this.setOpen}
                                setValue={this.setValue}
                            />
                        </View>
                        <View style={{ marginVertical: 10 }} >

                            <TouchableOpacity onPress={this.selectPhotoTapped}>
                                {image_src ? <Text style={{ fontSize: 20, marginLeft: 20 }}>Image selected</Text> : <Text style={{ fontSize: 20, marginLeft: 20 }}>Select Image</Text>}

                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={{ borderWidth: 2 }}
                            onPress={() => this.submitHandler()}
                        >
                            <Text style={{ fontSize: 18, textAlign: 'center', }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
    render() {
        // name, age, profile_image, status, Action
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 25, marginBottom: 5 }}>
                    {/* <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}> */}
                    <Text style={styles.textStyles}>Name</Text>
                    <Text style={styles.textStyles}>Age</Text>
                    <Text style={styles.textStyles}>Profile Image</Text>
                    <Text style={styles.textStyles}>Status</Text>
                    <View>
                        <Text style={[styles.textStyles, {}]}>Action</Text>
                        <TouchableOpacity onPress={() => this.addHandler()} >
                            <Image
                                style={{ width: 30, height: 25, marginLeft: 5 }}
                                source={require('../images/add.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    {/* </View> */}
                </View>

                {this.renderListItems()}
                {this.renderModal()}
            </SafeAreaView>
        )
    }
}

export default LoginScreen

const styles = StyleSheet.create({
    textStyles: {
        flex: 1,
        justifyContent: 'center',
        fontSize: 20,
        margin: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: 200,
        // margin: 20,
        // backgroundColor: "white",
        // borderRadius: 20,
        // padding: 35,
        // alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})