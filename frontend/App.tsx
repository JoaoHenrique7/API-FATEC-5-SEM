import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ThemeContextProvider from './src/contexts/ThemeContext/ThemeContext.context';
import SignInScreen from './src/screens/auth/SignIn/SignIn.screen';
import SignUpScreen from './src/screens/auth/SignUp/SignUp.screen';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerHeaderProps } from '@react-navigation/drawer';
import CustomHeader from './src/components/CustomHeader/CustomHeader.component';
import DashboardScreen from './src/screens/admin/Dashboard/Dashboard.screen';
import CustomDrawer from './src/components/CustomDrawer/CustomDrawer.component';
import RecoverPasswordScreen from './src/screens/auth/RecoverPassword/RecoverPassword.screen';
import SessionContextProvider from './src/contexts/SessionContext/SessionContext.context';
import ManageUsers from './src/screens/admin/ManageUsers/ManageUsers.screen';
import PartnersScreen from './src/screens/protected/Partners/Partners.screen';
import EditPartnerScreen from './src/screens/protected/EditPartner/EditPartner.screen';

function App(): React.JSX.Element {
	const Drawer = createDrawerNavigator();
	const Stack = createStackNavigator();

	const CustomHeaderCallback = useCallback((props: DrawerHeaderProps) => <CustomHeader {...props} />, []);
	const CustomDrawerCallback = useCallback((props: DrawerContentComponentProps) => <CustomDrawer {...props} />, []);

	const AdminTabRoutes = useCallback(() => {
		return (
			<Drawer.Navigator
				initialRouteName="Consultores"
				drawerContent={CustomDrawerCallback}
				screenOptions={{ header: CustomHeaderCallback, drawerType: 'slide' }}
			>
				<Drawer.Screen name="Dashboard" component={DashboardScreen} />
				<Drawer.Screen name="Consultores" component={ManageUsers} />
			</Drawer.Navigator>
		);
	}, [Drawer]);

	const UserTabRoutes = useCallback(() => {
		return (
			<Drawer.Navigator
			initialRouteName="Dashboard"
				drawerContent={CustomDrawerCallback}
				screenOptions={{ header: CustomHeaderCallback, drawerType: 'slide' }}
			>
				<Drawer.Screen name="Dashboard" component={DashboardScreen} />
				<Drawer.Screen name="Parceiros" component={PartnersScreen} />
			</Drawer.Navigator>
		)
	}, [Drawer]);

	return (
		<SessionContextProvider>
			<ThemeContextProvider>
				<StatusBar backgroundColor={'black'} />
				<NavigationContainer>
					<Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
						<Stack.Screen name="SignIn" component={SignInScreen} />
						<Stack.Screen name="SignUp" component={SignUpScreen} />
						<Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen}/>
						<Stack.Screen name="AdminTabRoutes" component={AdminTabRoutes} />
						<Stack.Screen name="UserTabRoutes" component={UserTabRoutes} />
						<Stack.Group screenOptions={{ presentation: 'modal' }}>
							<Stack.Screen name='EditPartner' component={EditPartnerScreen} />
						</Stack.Group>
					</Stack.Navigator>
				</NavigationContainer>
			</ThemeContextProvider>
		</SessionContextProvider>
	);
}

export default App;