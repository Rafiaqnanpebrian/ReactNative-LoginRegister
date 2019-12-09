import React, { Component } from 'react';
import { AsyncStorage, ToastAndroid } from 'react-native';
import {
  Container,
  Button,
  Text,
  Form,
  Item as FormItem,
  Input,
  Label,
  Header,
  Content,
  Body,
  Title,
  Right,
  Item,
} from 'native-base';
import Style from './css/style';
import axios from 'axios';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class LoginActivity extends Component {
  static navigationOptions = {
    title: 'LoginActivity',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
  };

  login = async () => {
    const { email, password } = this.state;
    const payload = {
      email: email,
      password: password,
    };
    axios
      .post('https://reqres.in/api/login', payload)
      .then(async value => {
        await AsyncStorage.setItem('access_token', value.data.access_token);
        ToastAndroid.show('Success', ToastAndroid.SHORT);
        this.OpenRegisterActivityFunction
      })
      .catch(err => {
        ToastAndroid.show('Error', ToastAndroid.SHORT);
        console.log(err);
      });
  };

  OpenRegisterActivityFunction = () => {
    this.props.navigation.navigate('Second');
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container padder>
        <Header style={{ backgroundColor: '#20B2AA' }}>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item style={{ marginRight: 20 }}>
              <Input
                placeholder="Email"
                value={email}
                onChangeText={value => this.setState({ email: value })}
              />
            </Item>
            <Item style={{ marginRight: 20 }}>
              <Input
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={value => this.setState({ password: value })}
              />
            </Item>
            <Button block style={[Style.mt_2, Style.my_1]} onPress={this.login}>
              <Text>Sign In</Text>
            </Button>
            <Button block style={[Style.mt_2, Style.my_1]} onPress={this.OpenRegisterActivityFunction}>
              <Text>Register</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

class RegisterActivity extends Component {
  static navigateOptions = {
    title: 'RegisterActivity',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.register = this.register.bind(this);
  };

  register = async () => {
    const { email, password } = this.state;
    const payload = {
      email: email,
      password: password,
    };
    axios
      .post('https://reqres.in/api/register', payload)
      .then(async value => {
        await AsyncStorage.setItem('access_token', value.data.access_token);
        ToastAndroid.show('Success', ToastAndroid.SHORT);
        this.OpenRegisterActivityFunction
      })
      .catch(err => {
        ToastAndroid.show('Error', ToastAndroid.SHORT);
        console.log(err);
      });
  };

  Goback = () => {
    this.props.navigation.navigate('First');
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container padder>
        <Header style={{ backgroundColor: '#20B2AA' }}>
          <Body>
            <Title>Register</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item style={{ marginRight: 20 }}>
              <Input
                placeholder="Email"
                value={email}
                onChangeText={value => this.setState({ email: value })}
              />
            </Item>
            <Item style={{ marginRight: 20 }}>
              <Input
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={value => this.setState({ password: value })}
              />
            </Item>
            <Button block style={[Style.mt_2, Style.my_1]} onPress={this.register}>
              <Text>Register</Text>
            </Button>
            <Button block style={[Style.mt_2, Style.my_1]} onPress={this.Goback}>
              <Text>Back</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const AppNavigator = createStackNavigator({
  First: {
    screen: LoginActivity, navigationOptions: {
      header: null,
    },
  },
  Second: {
    screen: RegisterActivity, navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(AppNavigator);