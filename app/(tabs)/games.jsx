import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Games() {
  const games = [
    { id: 1, name: "Futebol", icon: "football", description: "Jogo de futebol clássico" },
    { id: 2, name: "Basquete", icon: "basketball", description: "Partida de basquete" },
    { id: 3, name: "Vôlei", icon: "fitness", description: "Jogo de vôlei na praia" },
    { id: 4, name: "Tênis", icon: "tennisball", description: "Partida de tênis" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogos Disponíveis</Text>
      <ScrollView style={styles.scrollView}>
        {games.map((game) => (
          <TouchableOpacity key={game.id} style={styles.gameCard}>
            <View style={styles.gameHeader}>
              <Ionicons name={game.icon} size={32} color="#007AFF" />
              <Text style={styles.gameName}>{game.name}</Text>
            </View>
            <Text style={styles.gameDescription}>{game.description}</Text>
          </TouchableOpacity>
        ))}
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
  scrollView: {
    flex: 1,
  },
  gameCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
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
  gameHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  gameName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 12,
  },
  gameDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
