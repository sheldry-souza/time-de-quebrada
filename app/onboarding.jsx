import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
  const handleLogin = () => {
    router.push('/register');
  };

  const handleCreateAccount = () => {
    // Navegar para tela de cadastro
    console.log('Navegar para cadastro');
    // Por enquanto, também vai para o login
    router.push('/login');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Imagem placeholder */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/images/400x600.png')}
          style={styles.placeholderImage}
          resizeMode="cover"
        />
      </View>
      
      {/* Conteúdo principal */}
      <View style={styles.contentContainer}>
        <Text style={styles.headline}>
        Não perca nenhum jogo do seu{" "}
          <Text style={styles.highlightedText}>time na várzea</Text>
        </Text>
        
        <Text style={styles.description}>
          Receba notificações de jogos, resultados e estatísticas do seu time.
        </Text>
      </View>

      {/* Botões de ação */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Começar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.createAccountButton}
          onPress={handleCreateAccount}
        >
          <Text style={styles.createAccountButtonText}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footballIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  appName: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
  },
  imageContainer: {
    alignItems: "center",
    paddingVertical: 40,
    position: "relative",
  },
  placeholderImage: {
    borderRadius: 24,
    width: '100%',
    height: 460,
  },
  playerImage: {
    width: 280,
    height: 200,
    backgroundColor: "#ffffff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    elevation: 8
  },
  playerEmoji: {
    fontSize: 80,
    transform: [{ rotate: "-15deg" }],
  },
  energyShapes: {
    position: "absolute",
    right: 20,
    top: 40,
  },
  triangle1: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 16,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#ff6500",
    marginBottom: 8,
  },
  triangle2: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#ff6500",
    marginBottom: 6,
  },
  triangle3: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#ff6500",
  },
  contentContainer: {
    alignItems: "left",
    marginBottom: 40
  },
  headline: {
    fontSize: 26,
    fontWeight: "700",
    fontFamily: "Poppins_700Bold",
    color: "#333",
    textAlign: "left",
    lineHeight: 32,
    textTransform: "uppercase",
  },
  highlightedText: {
    color: "#ff6500",
  },
  description: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    textAlign: "left",
    lineHeight: 24
  },
  buttonContainer: {
    paddingBottom: 40,
    gap: 16,
  },
  loginButton: {
    backgroundColor: "#0038a7",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
    elevation: 4
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#ffffff",
    lineHeight: 24,
  },
  createAccountButton: {
    flex: 1,
    backgroundColor: "#f5f5f7",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center"
  },
  createAccountButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
    lineHeight: 24,
  },
});
