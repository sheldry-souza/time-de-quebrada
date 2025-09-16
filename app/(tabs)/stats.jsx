import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Stats() {
  const stats = [
    { label: "Jogos Jogados", value: "147", icon: "trophy", color: "#FF6B35" },
    { label: "Vitórias", value: "89", icon: "checkmark-circle", color: "#4CAF50" },
    { label: "Derrotas", value: "32", icon: "close-circle", color: "#F44336" },
    { label: "Empates", value: "26", icon: "remove-circle", color: "#FF9800" },
    { label: "Gols Marcados", value: "234", icon: "football", color: "#2196F3" },
    { label: "Assistências", value: "78", icon: "hand-left", color: "#9C27B0" },
  ];

  const winRate = Math.round((89 / 147) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estatísticas</Text>
      
      <View style={styles.winRateCard}>
        <Text style={styles.winRateTitle}>Taxa de Vitória</Text>
        <Text style={styles.winRateValue}>{winRate}%</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.iconContainer, { backgroundColor: stat.color }]}>
                <Ionicons name={stat.icon} size={24} color="#ffffff" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  winRateCard: {
    backgroundColor: "#007AFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  winRateTitle: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 8,
  },
  winRateValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
