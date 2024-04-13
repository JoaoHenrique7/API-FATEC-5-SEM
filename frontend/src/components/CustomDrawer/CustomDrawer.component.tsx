import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { EventArg } from "@react-navigation/native";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useTheme from "../../contexts/ThemeContext/useTheme.hook";
import { ThemeContextType } from "../../contexts/ThemeContext/ThemeContext.context";
import styles from "./CustomDrawer.style";
import { useMemo } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useSession from "../../contexts/SessionContext/useSession.hook";

function CustomDrawer({ descriptors, navigation, state }: DrawerContentComponentProps) {
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);
    
    const { session } = useSession();

    function onPress(e: GestureResponderEvent) {
        e.preventDefault();

        navigation.navigate("Profile");
    }

    return (
        <DrawerContentScrollView>
            <View>
                <Pressable onPress={(e) => onPress(e)} style={style.profile}>
                    <View style={style.data}>
                        <Text style={style.name}>{session.user?.nome}</Text>
                        <Text style={style.metadata}>{session.user?.email}</Text>
                    </View>
                    <MaterialCommunityIcons style={style.icon} name="menu-right" size={24} />
                </Pressable>
                {
                    state.routes.map((route, key) => {
                        const { options } = descriptors[route.key];
                        const isFocused: boolean = state.index === key;

                        const onPress = (): void => {
                            const event: EventArg<'drawerItemPress', true, undefined> = navigation.emit({
                                type: 'drawerItemPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name, route.params);
                            }
                        };

                        const onLongPress = (): void => {
                            navigation.emit({
                                type: 'drawerItemPress',
                                target: route.key,
                                canPreventDefault: true
                            });
                        };

                        const getStyle = () => {
                            if (isFocused) {
                                return {...style.drawerItem, ...style.activeItem};
                            }

                            return style.drawerItem
                        }

                        return (
                            <TouchableOpacity
                                key={key}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                accessibilityRole="button"
                                accessibilityState={{ selected: isFocused }}
                                accessibilityLabel={options.overlayAccessibilityLabel}
                                style={getStyle()}
                            >
                                <Text>{route.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawer;