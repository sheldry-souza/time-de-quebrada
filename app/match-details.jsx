import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MatchDetails() {
  const params = useLocalSearchParams();
  const { id, homeTeam, awayTeam, time, date } = params;
  const [activeTab, setActiveTab] = useState('resumo');

  // Dados mock para estatísticas do jogo
  const matchStats = [
    { label: "Shots on goal", home: 2, away: 6 },
    { label: "Shots", home: 4, away: 15 },
    { label: "Possession %", home: "26.0%", away: "74.0%" },
    { label: "Yellow card", home: 3, away: 2 },
    { label: "Corner kicks", home: 0, away: 2 },
    { label: "Crosses", home: 10, away: 23 },
    { label: "Goalkeeper saves", home: 3, away: 2 },
    { label: "Goals kicks", home: 10, away: 2 }
  ];

  const matchEvents = [
    { time: "15'", event: "Gol", player: "João Silva", team: "home" },
    { time: "23'", event: "Cartão Amarelo", player: "Pedro Santos", team: "away" },
    { time: "45'", event: "Gol", player: "Carlos Oliveira", team: "away" },
    { time: "67'", event: "Substituição", player: "Maria Costa → Ana Lima", team: "home" },
    { time: "78'", event: "Cartão Amarelo", player: "Lucas Ferreira", team: "home" }
  ];

  // Dados mock para escalação
  const lineups = {
    home: {
      formation: "4-3-3",
      players: [
        { number: 1, name: "Carlos Silva", position: "Goleiro" },
        { number: 2, name: "João Santos", position: "Lateral Direito" },
        { number: 3, name: "Pedro Lima", position: "Zagueiro" },
        { number: 4, name: "Rafael Costa", position: "Zagueiro" },
        { number: 5, name: "Lucas Oliveira", position: "Lateral Esquerdo" },
        { number: 6, name: "André Ferreira", position: "Volante" },
        { number: 8, name: "Marcelo Rocha", position: "Meio-campo" },
        { number: 10, name: "Gabriel Souza", position: "Meia" },
        { number: 7, name: "Felipe Martins", position: "Ponta Direita" },
        { number: 9, name: "Diego Alves", position: "Centroavante" },
        { number: 11, name: "Thiago Pereira", position: "Ponta Esquerda" }
      ]
    },
    away: {
      formation: "4-4-2",
      players: [
        { number: 1, name: "Bruno Mendes", position: "Goleiro" },
        { number: 2, name: "Ricardo Dias", position: "Lateral Direito" },
        { number: 3, name: "Rodrigo Silva", position: "Zagueiro" },
        { number: 4, name: "Mateus Santos", position: "Zagueiro" },
        { number: 5, name: "Leandro Costa", position: "Lateral Esquerdo" },
        { number: 6, name: "Fernando Lima", position: "Volante" },
        { number: 8, name: "Gustavo Rocha", position: "Meio-campo" },
        { number: 10, name: "Vinicius Souza", position: "Meio-campo" },
        { number: 7, name: "Caio Martins", position: "Meia" },
        { number: 9, name: "Alan Alves", position: "Atacante" },
        { number: 11, name: "Igor Pereira", position: "Atacante" }
      ]
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'resumo':
        return (
          <View>
            {/* Match Score Card */}
            <View style={styles.matchScoreCard}>
              <View style={styles.matchHeaderTop}>
                <View style={styles.leagueInfo}>
                  <Text style={styles.typeNameCard}>Amistoso</Text>
                  <Text style={styles.locationNameCard}>CDC Lá Vai Bola</Text>
                </View>
              </View>
              
              <View style={styles.matchScore}>
                <View style={styles.team}>
                  <Text style={styles.teamName}>{homeTeam}</Text>
                  <Text style={styles.teamType}>Casa</Text>
                </View>
                
                <View style={styles.scoreContainer}>
                  <Text style={styles.score}>1 : 1</Text>
                </View>
                
                <View style={styles.team}>
                  <Text style={styles.teamName}>{awayTeam}</Text>
                  <Text style={styles.teamType}>Fora</Text>
                </View>
              </View>
            </View>

            {/* Match Events */}
            <View style={styles.eventsSection}>
              <View style={styles.eventsCard}>
                {matchEvents.map((event, index) => (
                  <View key={index} style={styles.eventRow}>
                    <Text style={styles.eventTime}>{event.time}</Text>
                    <View style={styles.eventInfo}>
                      <Text style={styles.eventType}>{event.event}</Text>
                      <Text style={styles.eventPlayer}>{event.player}</Text>
                    </View>
                    <View style={[
                      styles.eventTeam, 
                      { backgroundColor: event.team === 'home' ? '#0038a7' : '#ff6500' }
                    ]} />
                  </View>
                ))}
              </View>
            </View>
          </View>
        );
      
      case 'escalacao':
        return (
          <View>
            <View style={styles.lineupSection}>
              <Text style={styles.formationText}>Formação: {lineups.home.formation}</Text>
              <View style={styles.lineupCard}>
                {lineups.home.players.map((player, index) => (
                  <View key={index} style={styles.playerRow}>
                    <View style={styles.playerNumber}>
                      <Text style={styles.playerNumberText}>{player.number}</Text>
                    </View>
                    <View style={styles.playerInfo}>
                      <Text style={styles.playerName}>{player.name}</Text>
                      <Text style={styles.playerPosition}>{player.position}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.lineupSection}>
              <View style={styles.lineupCard}>
                {lineups.away.players.map((player, index) => (
                  <View key={index} style={styles.playerRow}>
                    <View style={styles.playerNumber}>
                      <Text style={styles.playerNumberText}>{player.number}</Text>
                    </View>
                    <View style={styles.playerInfo}>
                      <Text style={styles.playerName}>{player.name}</Text>
                      <Text style={styles.playerPosition}>{player.position}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        );
      
      case 'estatisticas':
        return (
          <View>
            {/* Match Statistics */}
            <View style={styles.statsSection}>
              <View style={styles.statsCard}>
                {matchStats.map((stat, index) => (
                  <View key={index} style={styles.statRow}>
                    <Text style={styles.statHome}>{stat.home}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                    <Text style={styles.statAway}>{stat.away}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
        <Stack.Screen 
  options={{
    headerStyle: {
      backgroundColor: "#0038a7",
    },
    headerShadowVisible: false,
    header: ({ navigation }) => (
      <View style={{
        backgroundColor: "#0038a7",
        height: 120, // Ajuste conforme necessário
        paddingTop: 40, // Para status bar
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Pressable 
          onPress={() => router.back()}
          style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            flex: 1
          }}
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color="#ffffff" 
          />
          <Text style={{
            color: "#ffffff",
            fontFamily: "Poppins_600SemiBold",
            fontSize: 18,
            marginLeft: 12
          }}>
            Detalhes do Jogo
          </Text>
        </Pressable>
      </View>
    ),
  }} 
/>
      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'resumo' && styles.activeTab]}
            onPress={() => setActiveTab('resumo')}
          >
            <Text style={[styles.tabText, activeTab === 'resumo' && styles.activeTabText]}>
              Resumo
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'escalacao' && styles.activeTab]}
            onPress={() => setActiveTab('escalacao')}
          >
            <Text style={[styles.tabText, activeTab === 'escalacao' && styles.activeTabText]}>
              Escalação
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'estatisticas' && styles.activeTab]}
            onPress={() => setActiveTab('estatisticas')}
          >
            <Text style={[styles.tabText, activeTab === 'estatisticas' && styles.activeTabText]}>
              Estatísticas
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <ScrollView style={styles.content}>
          {renderTabContent()}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0038a7",
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f7",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#0038a7",
    marginHorizontal: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    color: "#ffffff",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#ff6500",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    color: "#ffffff",
    opacity: 0.6,
  },
  activeTabText: {
    color: "#ffffff",
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    opacity: 1,
  },
  matchHeader: {
    backgroundColor: "#0038a7",
    padding: 20
  },
  matchScoreCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  typeNameCard: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 4,
    textAlign: "center",
    lineHeight: 20,
  },
  locationNameCard: {
    color: "#666666",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    opacity: 0.8,
    textTransform: "uppercase",
    textAlign: "center",
    lineHeight: 16,
    marginTop: 2,
  },
  matchHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  leagueInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  typeName: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 4,
    textAlign: "center",
    lineHeight: 20,
  },
  locationName: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    opacity: 0.8,
    textTransform: "uppercase",
    textAlign: "center",
    lineHeight: 16,
    marginTop: 2,
  },
  matchScore: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  team: {
    flex: 1,
    alignItems: "center",
  },
  teamName: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 4,
  },
  teamType: {
    color: "#666666",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    opacity: 0.7,
  },
  scoreContainer: {
    paddingHorizontal: 20,
  },
  score: {
    color: "#0038a7",
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Poppins_700Bold",
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
    marginBottom: 12,
  },
  statsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  statHome: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#0038a7",
    width: 40,
    textAlign: "center",
  },
  statLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#333",
    textAlign: "center",
  },
  statAway: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#ff6500",
    width: 40,
    textAlign: "center",
  },
  eventsSection: {
    marginBottom: 20,
  },
  eventsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  eventTime: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#666",
    width: 40,
  },
  eventInfo: {
    flex: 1,
    marginLeft: 12,
  },
  eventType: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    color: "#333",
    marginBottom: 2,
  },
  eventPlayer: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  eventTeam: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  lineupSection: {
    marginBottom: 20,
  },
  formationText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    color: "#666",
    marginBottom: 12,
  },
  lineupCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  playerNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0038a7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  playerNumberText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#ffffff",
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    color: "#333",
    marginBottom: 2,
  },
  playerPosition: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
});
