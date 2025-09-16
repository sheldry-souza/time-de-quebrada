import { useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function Tournaments() {
  const [activeTab, setActiveTab] = useState('Tournaments');

  const tournaments = [
    {
      id: 1,
      title: "LPL SPRING TOURNAMENT",
      date: "13 December",
      price: "₹1000",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "LEAGUE TOURNAMENT",
      date: "13 December",
      price: "₹1000",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "SUMMER CUP",
      date: "15 December",
      price: "₹1000",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop"
    }
  ];

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const handleTournamentPress = (tournament) => {
    console.log('Tournament selected:', tournament);
  };

  const handleCreateTournament = () => {
    console.log('Create tournament');
  };

  const renderTournamentCard = ({ item, index }) => (
    <TouchableOpacity 
      style={styles.tournamentCard}
      onPress={() => handleTournamentPress(item)}
    >
      <View style={styles.cardImageContainer}>
        <View style={styles.cardImage}>
          <Text style={styles.imagePlaceholder}>⚽</Text>
        </View>
        <View style={styles.priceTag}>
          <Text style={styles.priceLabel}>Ticket Price</Text>
          <Text style={styles.priceValue}>{item.price}</Text>
        </View>
        {index === 2 && (
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateTournament}
          >
            <Text style={styles.createButtonText}>+ Create Tournament</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.tournamentTitle}>{item.title}</Text>
        <Text style={styles.tournamentDate}>{item.date}</Text>
      </View>
      <View style={styles.cardArrow}>
        <Text style={styles.arrowIcon}>→</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.footballIcon}>⚽</Text>
            <Text style={styles.appName}>Football app</Text>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>Mohali..</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {['Tournaments', 'Upcoming', 'Live'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => handleTabPress(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tournaments List */}
      <FlatList
        data={tournaments}
        renderItem={renderTournamentCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
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
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  footballIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  appName: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    color: "#666",
  },
  tabsContainer: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
  },
  tabsContent: {
    paddingHorizontal: 16,
    gap: 24,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#ff6500",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    color: "#666",
  },
  activeTabText: {
    color: "#ffffff",
  },
  listContainer: {
    padding: 16,
  },
  tournamentCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  cardImageContainer: {
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholder: {
    fontSize: 40,
  },
  priceTag: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#ff6500",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 10,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    color: "#ffffff",
  },
  priceValue: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#ffffff",
  },
  createButton: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "#ff6500",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#ffffff",
  },
  cardContent: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tournamentTitle: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
    flex: 1,
  },
  tournamentDate: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Poppins_500Medium",
    color: "#666",
    marginLeft: 8,
  },
  cardArrow: {
    position: "absolute",
    right: 16,
    top: "50%",
    marginTop: -10,
  },
  arrowIcon: {
    fontSize: 20,
    color: "#ff6500",
    fontWeight: "bold",
  },
});
