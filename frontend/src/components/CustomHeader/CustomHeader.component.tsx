import { DrawerHeaderProps } from "@react-navigation/drawer";
import { Pressable, View } from "react-native";
import useTheme from "../../contexts/ThemeContext/useTheme.hook";
import { useMemo } from "react";
import styles from "./CustomHeader.style";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text } from "react-native";

type CustomHeaderProps = DrawerHeaderProps;

function CustomHeader({ layout, navigation, options, route }: CustomHeaderProps) {
    const { theme } = useTheme();
    const style = useMemo(() => styles(theme), [theme]);

    return (
        <View style={style.container}>
            <Pressable onPress={() => navigation.openDrawer()} style={style.menu}>
                <MaterialCommunityIcons name="menu" size={18} />
            </Pressable>
            <Text style={style.heading}>{route.name}</Text>
        </View>
    )
}

export default CustomHeader;
