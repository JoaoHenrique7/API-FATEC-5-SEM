import { KeyboardAvoidingView, SafeAreaView, ScrollView, View } from "react-native";
import styles from "./Screen.style";
import useTheme from "../../contexts/ThemeContext/useTheme.hook";
import { ThemeContextType } from "../../contexts/ThemeContext/ThemeContext.context";
import { useMemo } from "react";

type ScreenProps = {
    children: React.JSX.Element | React.ReactNode;
}

function Screen(props: ScreenProps) {
    const { children } = props;
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);

    return (
        <SafeAreaView style={style.container}>
            <KeyboardAvoidingView style={style.keyboardAvoidingView} behavior="position">
                <ScrollView style={style.scrollView}>
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Screen;