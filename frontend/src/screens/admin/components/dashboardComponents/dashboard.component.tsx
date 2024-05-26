import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import PartnerService from '../../../../service/PartnerService';

const screenWidth = Dimensions.get('window').width;

interface PieChartData {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}
interface BarChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}
function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const getDataPieChart = async (selectedData: number): Promise<PieChartData[]> => {
  try {
    const countCertificates: { [key: string]: number } = {};
    const baseData = await PartnerService.fetchPartners();
    if (selectedData == 1){
    baseData.forEach((user) => {
      const expertises = user.expertises;
      expertises.forEach((expertise) => {
        if (countCertificates[expertise.name]) {
          countCertificates[expertise.name]++;
        } else {
          countCertificates[expertise.name] = 1;
        }
      });
    });
  }else{
    baseData.forEach((user) => {
      const expertises = user.expertises;
      expertises.forEach((expertise) => {
        if (countCertificates[expertise.track]) {
          countCertificates[expertise.track]++;
        } else {
          countCertificates[expertise.track] = 1;
        }
      });
    });
  }
    const legendFontColor = '#7F7F7F';
    const legendFontSize = 15;

    const pieChartData = Object.keys(countCertificates).map((key, index) => ({
      name: key,
      amount: countCertificates[key],
      color: generateRandomColor(),
      legendFontColor: legendFontColor,
      legendFontSize: legendFontSize,
    }));
    // console.log(pieChartData)
    return pieChartData;
  } catch (error) {
    console.error('Erro ao buscar os parceiros:', error);
    return [];
  }
};
const dataBar: BarChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

const DashboardScreen: React.FC = () => {
  const [expertiseByUser, setExpertiseByUser] = useState<PieChartData[]>([]);
  const [trackByUser, setTrackByUser] = useState<PieChartData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const expertiseByUserData = await getDataPieChart(1);
      setExpertiseByUser(expertiseByUserData);
      const trackByUserData = await getDataPieChart(0);
      setTrackByUser(trackByUserData);
    };
    fetchData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <Text style={styles.chartTitle}>Quantidade de parceiros por expertise</Text>
      <PieChart
        data={expertiseByUser}
        width={screenWidth - 16}
        height={220}
        chartConfig={chartConfig}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
        style={styles.chart}
      />

      <Text style={styles.chartTitle}>Quantidade de parceiros por track</Text>
      <PieChart
        data={trackByUser}
        width={screenWidth - 16}
        height={220}
        chartConfig={chartConfig}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
        style={styles.chart}
      />
      {/* <BarChart
        data={dataBar}
        width={Dimensions.get('window').width}
        height={220}
        yAxisLabel="Sales"
        yAxisSuffix="$"
        yAxisInterval={1} 
        chartConfig={chartConfig}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      /> */}
    </ScrollView>
  );
};

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10
  },
  chartTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  }
});

export default DashboardScreen;