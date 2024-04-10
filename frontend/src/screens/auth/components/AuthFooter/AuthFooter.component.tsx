import { ImageBackground, Text } from "react-native";
import { URI_IMAGES } from "../../../../assets/uri-images.asset";
import styles from "./AuthFooter.style";
import useTheme from "../../../../contexts/ThemeContext/useTheme.hook";
import { ThemeContextType } from "../../../../contexts/ThemeContext/ThemeContext.context";
import { useMemo } from "react";

function AuthFooter() {
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);

    return (
        <ImageBackground
            style={style.footer}
            imageStyle={style.footerImage}
            source={{ uri: URI_IMAGES.oraclePattern3 }}
        ></ImageBackground>
    )
}

export default AuthFooter;