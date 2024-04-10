import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/protected/Home/Home.screen';
import ThemeContextProvider from './src/contexts/ThemeContext/ThemeContext.context';
import SignInScreen from './src/screens/auth/SignIn/SignIn.screen';
import SignInForm from './src/screens/auth/components/SignInForm/SignInForm.component';
import SignUpScreen from './src/screens/auth/SignUp/SignUp.screen';

function App(): React.JSX.Element {
	const Tab = createBottomTabNavigator();
	const Stack = createStackNavigator();

	// const CustomTabBar = useCallback((props: BottomTabBarProps) => <CustomTabBarLayout {...props} />, []);

	const TabRoutes = useCallback(() => {
		return (
			<Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
				<Tab.Screen name="Home" component={HomeScreen} />
			</Tab.Navigator>
		);
	}, [Tab]);

	return (
		<ThemeContextProvider>
			<StatusBar backgroundColor={'black'} />
			<NavigationContainer>
				<Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
					<Stack.Screen name="SignIn" component={SignInScreen} />
					<Stack.Screen name="SignUp" component={SignUpScreen} />
					<Stack.Screen name="TabRoutes" component={TabRoutes} />
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeContextProvider>
	);
}

export default App;