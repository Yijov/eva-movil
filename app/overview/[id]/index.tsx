import { ThemedText } from "@/components/ThemedText";

import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

export default function IndicatorsTab() {
    const { id } = useLocalSearchParams();


  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title">Indicators</ThemedText>
      {/* <ThemedText>{project?.name}</ThemedText> */}
      <ThemedText>Project ID: {id}</ThemedText>
      {/* Render indicators */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});