import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import CreatePollScreen from './components/CreatePollScreen';
import PollsScreen from './components/PollsScreen';
import RegisterScreen from './components/RegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CreatePollScreen} />
        <Stack.Screen name="Enquetes" component={PollsScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}