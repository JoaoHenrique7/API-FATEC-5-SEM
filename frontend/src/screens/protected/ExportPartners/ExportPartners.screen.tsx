import React from "react";
import { ParamListBase } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import Screen from "../../../components/Screen/Screen.component";
import { Dimensions, Pressable, Text, TextInput, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useTheme from "../../../contexts/ThemeContext/useTheme.hook";
import { ThemeContextType } from "../../../contexts/ThemeContext/ThemeContext.context";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ExportPartners.style";
import useSession from "../../../contexts/SessionContext/useSession.hook";
import BaseCertificatesService from "../../../service/BaseCertificatesService";
import { Partner } from "../../../types/definitions";
import {Picker} from '@react-native-picker/picker';
import { PieChart } from "react-native-chart-kit";
function ExportPartnerScreen({ navigation, route }: StackScreenProps<ParamListBase>): React.JSX.Element {
    const { theme }: ThemeContextType = useTheme();
    const style = useMemo(() => styles(theme), [theme]);
    const { check, session } = useSession();

    if (!route.params || !(route.params as Partner)) {
        navigation.goBack();
        return <></>;
    }
    type TrackPercentages = {
        [key: string]: number;
    };
    const partner: Partner = route.params as Partner;
    type TrackCounts = {
        [key: string]: number;
      };

    type ExpertiseQualifiers = {
        [key: string]: number;
      };
    interface PieChartData {
        name: string;
        amount: number;
        color: string;
        legendFontColor: string;
        legendFontSize: number;
      }
    const screenWidth = Dimensions.get('window').width;
    const expertises = partner.expertises
    const [trackPercentages, setTrackPercentages] = useState<TrackPercentages>({});
    const allTracks = Array.from(new Set(expertises.map(expertise => expertise.track)));
    const [selectedTrack, setSelectedTrack] = useState<string>(allTracks[0]);
    const [qualifiersPercentages, setQualifiersPercentages] = useState<ExpertiseQualifiers>({});
    const [pieData, setPieData] = useState<PieChartData[]>([]);

    function generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    const getAllTracks = async (): Promise<TrackCounts> => {
        const build = await BaseCertificatesService.allByTrack("Cloud Build Track");
        const service = await BaseCertificatesService.allByTrack("Cloud Service Track");
        const sell = await BaseCertificatesService.allByTrack("Cloud Sell Track");
        const license = await BaseCertificatesService.allByTrack("License & hardware");
        const health = await BaseCertificatesService.allByTrack("Industry Healthcare");

        return {
          "Cloud Build Track": Array.isArray(build) ? build.length : 0,
          "Cloud Service Track": Array.isArray(service) ? service.length : 0,
          "Cloud Sell Track": Array.isArray(sell) ? sell.length : 0,
          "License & hardware": Array.isArray(license) ? license.length : 0,
          "Industry Healthcare": Array.isArray(health) ? health.length : 0,
        };
      };


    const calculateTrackCounts = (expertises: { track: string }[], totalTracks: TrackCounts): TrackPercentages => {
        const trackCounts = expertises.reduce((acc: TrackCounts, expertise) => {
        const track = expertise.track;
        if (acc[track]) {
            acc[track]++;
        } else {
            acc[track] = 1;
        }
        return acc;
        }, {} as TrackCounts);
        const trackPercentages: TrackPercentages = {};
        for (const track in trackCounts) {
        if (totalTracks[track] !== undefined) {
            trackPercentages[track] = (trackCounts[track] / totalTracks[track]) * 100;
        }
        }
        if (Object.keys(trackPercentages).length == 0){
            const trackPercentages: TrackPercentages = {
                "Cloud Build Track":0,
                "Cloud Service Track":0,
                "Cloud Sell Track":0,
                "License & hardware":0,
                "Industry Healthcare":0                                        
            };
            return trackPercentages 
        }
            
    return trackPercentages;
    };

    const calculateQualifiersPercentages = async (): Promise<ExpertiseQualifiers> => {
        let qualifiersPercentages: ExpertiseQualifiers = {};

        for (const expertise of expertises) {
        if (expertise.track === selectedTrack) {
            const expertiseBase = await BaseCertificatesService.byName(expertise.name);
            const lengthQualifiersBase = expertiseBase.qualifiers.length;
            const lengthQualifiers = expertise.qualifiers.length;

            const percentage = (lengthQualifiers / lengthQualifiersBase) * 100;
            qualifiersPercentages[expertise.name] = percentage;
        }
        }

        return qualifiersPercentages;
        };

        
    const pieChartData = (percentages:TrackPercentages) =>{
        const legendFontColor = '#7F7F7F';
        const legendFontSize = 15;
        
        const pieChartData = Object.keys(percentages).map((key, index) => ({
            name: key,
            amount: percentages[key],
            color: generateRandomColor(),
            legendFontColor: legendFontColor,
            legendFontSize: legendFontSize,
        }));
        console.log(pieChartData)
        return pieChartData;
    }
    useEffect(() => {
        const fetchData = async () => {
        const totalTracks = await getAllTracks();
        const percentages = calculateTrackCounts(expertises, totalTracks);
        const qualifiers = await calculateQualifiersPercentages();
        const datasPie = pieChartData(percentages);
        setQualifiersPercentages(qualifiers);
        setTrackPercentages(percentages);
        setPieData(datasPie)
        };
        
        fetchData();
    }, [selectedTrack]);

      return (
        <Screen>
            <View style={style.header}>
                <Pressable style={style.goBack} onPress={navigation.goBack}>
                    <MaterialCommunityIcons name='arrow-left' size={18} />
                    <Text>Voltar</Text>
                </Pressable>
                <Text style={style.titleText}>{partner.name}</Text>
                <Text style={style.titleText}>Porcentagem de Tracks concluidas</Text>
                {Object.entries(trackPercentages).map(([track, percentage]) => (
                    <View key={track} style={style.trackContainer}>
                        <Text>{`${track}: ${percentage.toFixed(2)}%`}</Text>
                        <View style={style.progressBarBackground}>
                            <View style={[style.progressBarFill, { width: `${percentage}%` }]} />
                        </View>
                    </View>
                ))}

                <Text style={style.titleText}>Expertises Completas</Text>
                <Picker
                    selectedValue={selectedTrack}
                    onValueChange={(itemValue) => setSelectedTrack(itemValue)}
                >
                    {allTracks.map(track => (
                    <Picker.Item key={track} label={track} value={track} />
                    ))}
                </Picker>

                {Object.entries(qualifiersPercentages).map(([expertise, percentage]) => (
                    <View key={expertise} style={style.trackContainer}>
                        <Text>{`${expertise}: ${percentage.toFixed(2)}%`}</Text>
                        <View style={style.progressBarBackground}>
                            <View style={[style.progressBarFill, { width: `${percentage}%` }]} />
                        </View>
                    </View>
                ))}
                    <PieChart
                        data={pieData}
                        width={screenWidth - 16}
                        height={220}
                        chartConfig={chartConfig}
                        accessor={"amount"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        absolute
                        style={style.chart}
                    />

            </View>
        </Screen>
    );
}
const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };
export default ExportPartnerScreen