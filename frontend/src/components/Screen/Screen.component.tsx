import { KeyboardAvoidingView, SafeAreaView, ScrollView, View } from "react-native";
import styles from "./Screen.style";
import useTheme from "../../contexts/ThemeContext/useTheme.hook";
import { ThemeContextType } from "../../contexts/ThemeContext/ThemeContext.context";
import { useMemo } from "react";

type ScreenProps = {
    children: React.JSX.Element | React.ReactNode;
    includePadding?: boolean;
}

function Screen({ includePadding = true, children }: ScreenProps) {
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);

    function getStyle() {
        if (includePadding) {
            return { ...style.scrollView, padding: theme.spacing.md };;
        }

        return style.scrollView;
    }

    return (
        <SafeAreaView style={style.container}>
            <KeyboardAvoidingView style={style.keyboardAvoidingView} behavior="position">
                <ScrollView style={getStyle()} contentContainerStyle={{ justifyContent: 'space-between', flexGrow: 1 }}>
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Screen;