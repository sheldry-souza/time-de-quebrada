import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTeamId, setActiveTeamId] = useState(1);
  const [loadingTeamId, setLoadingTeamId] = useState(null);
  const spinValue = useRef(new Animated.Value(0)).current;
  const [newMatch, setNewMatch] = useState({
    homeTeam: '',
    awayTeam: '',
    date: '',
    time: '',
    location: '',
    type: 'Amistoso'
  });

  const liveMatch = {
    homeTeam: "Man City",
    awayTeam: "Arsenal", 
    homeScore: 0,
    awayScore: 0,
    status: "FT",
    location: "CDC Lá Vai Bola",
    type: "Amistoso",
    homeShield: "https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png",
    awayShield: "https://logos-world.net/wp-content/uploads/2020/05/Arsenal-Logo.png"
  };

  const todayMatches = [
    { 
      id: 1, 
      homeTeam: "Man City", 
      awayTeam: "Leicester",
      time: "06:30",
      date: "27 JUL",
      homeShield: "https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png",
      awayShield: "https://logos-world.net/wp-content/uploads/2020/06/Leicester-City-Logo.png",
      location: "CDC Lá Vai Bola",
      type: "Amistoso",
    },
    { 
      id: 2, 
      homeTeam: "Chelsea", 
      awayTeam: "Man Utd",
      time: "06:30",
      date: "27 JUL",
      homeShield: "https://logos-world.net/wp-content/uploads/2020/05/Chelsea-Logo.png",
      awayShield: "https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-logo.png",
      location: "CDC Lá Vai Bola",
      type: "Amistoso",
    },
    { 
      id: 3, 
      homeTeam: "Leicester", 
      awayTeam: "Arsenal",
      time: "06:30",
      date: "27 JUL",
      homeShield: "https://logos-world.net/wp-content/uploads/2020/06/Leicester-City-Logo.png",
      awayShield: "https://logos-world.net/wp-content/uploads/2020/05/Arsenal-Logo.png",
      location: "CDC Lá Vai Bola",
      type: "Amistoso",
    },
    { 
      id: 4, 
      homeTeam: "Spurs", 
      awayTeam: "Man Utd",
      time: "08:30",
      date: "28 JUL",
      homeShield: "https://logos-world.net/wp-content/uploads/2020/06/Tottenham-Hotspur-Logo.png",
      awayShield: "https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-logo.png",
      location: "CDC Lá Vai Bola",
      type: "Amistoso",
    },
    { 
      id: 5, 
      homeTeam: "Newcastle", 
      awayTeam: "Leeds",
      time: "08:30",
      date: "28 JUL",
      homeShield: "https://logos-world.net/wp-content/uploads/2020/06/Newcastle-Logo.png",
      awayShield: "https://logos-world.net/wp-content/uploads/2020/06/Leeds-United-Logo.png",
      location: "CDC Lá Vai Bola",
      type: "Amistoso",
    },
    { 
      id: 6, 
      homeTeam: "A Villa", 
      awayTeam: "West Ham",
      time: "06:30",
      date: "29 JUL",
      homeShield: "https://logos-world.net/wp-content/uploads/2020/06/Aston-Villa-Logo.png",
      awayShield: "https://logos-world.net/wp-content/uploads/2020/06/West-Ham-Logo.png",
      location: "CDC Lá Vai Bola",
      type: "Amistoso",
    }
  ];

  useEffect(() => {
    if (loadingTeamId) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.setValue(0);
    }
  }, [loadingTeamId]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

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

  const handleTeamSelect = async (teamId) => {
    if (teamId === activeTeamId) return; // Se já está ativo, não faz nada
    
    setLoadingTeamId(teamId);
    
    // Simula carregamento de dados do time
    setTimeout(() => {
      setActiveTeamId(teamId);
      setLoadingTeamId(null);
    }, 1500);
  };

  const handleCreateMatch = () => {
    const newMatchWithShields = {
      ...newMatch,
      homeShield: "https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png",
      awayShield: "https://logos-world.net/wp-content/uploads/2020/05/Arsenal-Logo.png",
    };
    console.log('Novo jogo criado:', newMatchWithShields);
    // Aqui você pode adicionar a lógica para salvar o jogo
    setModalVisible(false);
    setNewMatch({
      homeTeam: '',
      awayTeam: '',
      date: '',
      time: '',
      location: '',
      type: 'Amistoso'
    });
  };

  const handleInputChange = (field, value) => {
    setNewMatch(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMatchPress = (match) => {
    // Navegar para a tela de detalhes do jogo
    router.push({
      pathname: '/match-details',
      params: {
        id: match.id,
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        time: match.time,
        date: match.date
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.userSection}>
            <Image 
              source={require('../../assets/images/logo-laranja.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Teams Slider */}
      <View style={styles.teamsSliderContainer}>
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.teamsSliderContent}
        >
          {[
            { id: 1, name: "Man City", logo: "https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png" },
            { id: 2, name: "Arsenal", logo: "https://logos-world.net/wp-content/uploads/2020/05/Arsenal-Logo.png" },
            { id: 3, name: "Chelsea", logo: "https://logos-world.net/wp-content/uploads/2020/05/Chelsea-Logo.png" },
            { id: 4, name: "Liverpool", logo: "https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png" },
            { id: 5, name: "Man Utd", logo: "https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-logo.png" },
            { id: 6, name: "Spurs", logo: "https://logos-world.net/wp-content/uploads/2020/06/Tottenham-Hotspur-Logo.png" },
            { id: 7, name: "Newcastle", logo: "https://logos-world.net/wp-content/uploads/2020/06/Newcastle-Logo.png" },
            { id: 8, name: "Barcelona", logo: "https://logos-world.net/wp-content/uploads/2020/04/Barcelona-Logo.png" }
          ].map((team) => {
            const isActive = team.id === activeTeamId;
            const isLoading = team.id === loadingTeamId;
            
            return (
              <TouchableOpacity 
                key={team.id} 
                style={[styles.teamLogoContainer, isActive && styles.activeTeamContainer]}
                onPress={() => handleTeamSelect(team.id)}
                disabled={isLoading}
              >
                <Image 
                  source={{ uri: team.logo }}
                  style={[styles.teamLogoLarge, !isActive && styles.inactiveTeamLogo]}
                  resizeMode="cover"
                />
                <Text style={[styles.sliderTeamName, isActive && styles.activeTeamName]}>{team.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Live Match Card */}
      <View style={styles.liveMatchContainer}>
        <View style={styles.liveMatchCard}>
          <View style={styles.matchHeader}>
            <View style={styles.leagueInfo}>
              <Text style={styles.typeName}>{liveMatch.type}</Text>
              <Text style={styles.locationName}>{liveMatch.location}</Text>
            </View>
          </View>
          
          <View style={styles.matchScore}>
            <View style={styles.team}>
              <Image 
                source={{ uri: liveMatch.homeShield }} 
                style={styles.liveTeamLogo}
                resizeMode="cover"
              />
              <Text style={styles.teamName}>{liveMatch.homeTeam}</Text>
            </View>
            
            <View style={styles.scoreContainer}>
              <Text style={styles.score}>{liveMatch.homeScore} : {liveMatch.awayScore}</Text>
            </View>
            
            <View style={styles.team}>
              <Image 
                source={{ uri: liveMatch.awayShield }} 
                style={styles.liveTeamLogo}
                resizeMode="cover"
              />
              <Text style={styles.teamName}>{liveMatch.awayTeam}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Cabeçalho Fixo - Últimos Jogos */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Últimos Jogos</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Todos</Text>
        </TouchableOpacity>
      </View>

      {/* Seção com Scroll - Apenas Cards */}
      <ScrollView style={styles.scrollableSection} contentContainerStyle={styles.scrollableContent}>
        <View style={styles.section}>
          {todayMatches.map((match) => (
            <TouchableOpacity 
              key={match.id} 
              style={styles.matchCard}
              onPress={() => handleMatchPress(match)}
            >
              <View style={styles.matchLocationContainer}>
                <Text style={styles.matchLocation}>{match.location}</Text>
                <View style={styles.matchCardContent}>
                  <View style={styles.matchTeam}>
                    <Text style={styles.matchTeamName}>{match.homeTeam}</Text>
                    <Image 
                      source={{ uri: match.homeShield }} 
                      style={styles.teamLogo}
                      resizeMode="cover"
                    />
                  </View>
                  
                  <View style={styles.matchCenter}>
                    <Text style={styles.matchTime}>{match.time}</Text>
                    <Text style={styles.matchDate}>{match.date}</Text>
                  </View>
                  
                  <View style={styles.matchTeam}>
                    <Image 
                      source={{ uri: match.awayShield }} 
                      style={styles.teamLogo}
                      resizeMode="cover"
                    />
                    <Text style={styles.matchTeamName}>{match.awayTeam}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      {/* <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity> */}

      {/* Modal para adicionar novo jogo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Cadastrar Novo Jogo</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Time da Casa</Text>
                <TextInput
                  style={styles.textInput}
                  value={newMatch.homeTeam}
                  onChangeText={(value) => handleInputChange('homeTeam', value)}
                  placeholder="Digite o nome do time da casa"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Time Visitante</Text>
                <TextInput
                  style={styles.textInput}
                  value={newMatch.awayTeam}
                  onChangeText={(value) => handleInputChange('awayTeam', value)}
                  placeholder="Digite o nome do time visitante"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Data</Text>
                <TextInput
                  style={styles.textInput}
                  value={newMatch.date}
                  onChangeText={(value) => handleInputChange('date', value)}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Horário</Text>
                <TextInput
                  style={styles.textInput}
                  value={newMatch.time}
                  onChangeText={(value) => handleInputChange('time', value)}
                  placeholder="HH:MM"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Local</Text>
                <TextInput
                  style={styles.textInput}
                  value={newMatch.location}
                  onChangeText={(value) => handleInputChange('location', value)}
                  placeholder="Digite o local do jogo"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Tipo de Jogo</Text>
                <View style={styles.typeButtons}>
                  {['Amistoso', 'Festival', 'Copa'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeButton,
                        newMatch.type === type && styles.activeTypeButton
                      ]}
                      onPress={() => handleInputChange('type', type)}
                    >
                      <Text style={[
                        styles.typeButtonText,
                        newMatch.type === type && styles.activeTypeButtonText
                      ]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.createButton}
                  onPress={handleCreateMatch}
                >
                  <Text style={styles.createButtonText}>Criar Jogo</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Loader em tela cheia */}
      {loadingTeamId && (
        <View style={styles.fullScreenLoader}>
          <View style={styles.loaderContent}>
            <Animated.View style={[styles.loader, { transform: [{ rotate: spin }] }]} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  contentContainer: {
    paddingBottom: 120,
  },
  header: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 58,
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  appName: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
  },
  logo: {
    width: 120,
    height: 40,
  },
  teamsSliderContainer: {
    marginTop: 16
  },
  teamsSliderContent: {
    paddingHorizontal: 16,
    paddingRight: 40,
    gap: 12,
  },
  teamLogoContainer: {
    alignItems: "center",
    marginRight: 4,
  },
  activeTeamContainer: {
    opacity: 1,
  },
  teamLogo: {
    borderRadius: 30,
    marginBottom: 8,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  inactiveTeamLogo: {
    opacity: 0.2,
    filter: "grayscale(100%)",
  },
  sliderTeamName: {
    fontSize: 10,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    color: "#666666",
    textAlign: "center",
    maxWidth: 60,
    opacity: 0.3,
  },
  activeTeamName: {
    color: "#000",
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    opacity: 1,
  },
  searchButton: {
    padding: 8,
  },
  leagueSelector: {
    flexDirection: "row",
    gap: 12,
  },
  leagueButton: {
    backgroundColor: "#ff6500",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  leagueText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  weekButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  weekText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  liveMatchContainer: {
    padding: 16,
  },
  liveMatchCard: {
    backgroundColor: "#0038a7",
    borderRadius: 24,
    padding: 20,
    elevation: 4
  },
  matchHeader: {
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
  matchStatus: {
    backgroundColor: "#ff6500",
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
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
    gap: 8,
  },

  liveTeamShield: {
    fontSize: 24,
    marginRight: 8,
  },
  liveTeamLogo: {
    width: 60,
    height: 60,
  },
  teamName: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 4,
  },
  teamType: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    opacity: 0.7,
  },
  scoreContainer: {
    paddingHorizontal: 20,
  },
  score: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Poppins_700Bold",
  },
  matchActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
  },
  seeAllText: {
    color: "#ff6500",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
  },
  matchCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    marginBottom: 12,
    padding: 16
  },
  matchCardContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  matchTeam: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 8,
  },

  teamLogo: {
    width: 30,
    height: 30,
  },
  teamLogoLarge: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  teamLogoSmall: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  teamIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  matchTeamName: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    color: "#333",
    textAlign: "center",
  },
  matchCenter: {
    alignItems: "center",
    paddingHorizontal: 0,
  },
  matchLocation: {
    fontSize: 10,
    color: "#666",
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    marginBottom: 4,
  },
  matchType: {
    fontSize: 10,
    color: "#666",
    fontWeight: "500",
    fontFamily: "Poppins_500Medium"
  },
  matchDate: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    fontFamily: "Poppins_500Medium"
  },
  matchTime: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700",
    fontFamily: "Poppins_700Bold",
  },
  vsText: {
    fontSize: 10,
    color: "#666",
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: "#ff6500",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabIcon: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "300",
    lineHeight: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
  },
  closeButtonText: {
    fontSize: 20,
    color: "#666",
    lineHeight: 20,
  },
  modalForm: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    color: "#333",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  typeButtons: {
    flexDirection: "row",
    gap: 8,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  activeTypeButton: {
    backgroundColor: "#ff6500",
    borderColor: "#ff6500",
  },
  typeButtonText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    color: "#666",
  },
  activeTypeButtonText: {
    color: "#ffffff",
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    color: "#666",
  },
  createButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#ff6500",
    alignItems: "center",
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#ffffff",
  },
  fullScreenLoader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loaderContent: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  loader: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: "#e0e0e0",
    borderTopColor: "#ff6500"
  },
  loaderText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    color: "#333",
    textAlign: "center",
  },
});
