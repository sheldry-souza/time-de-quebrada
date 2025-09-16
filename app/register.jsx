import { faCameraAlt, faEye, faEyeSlash, faPen, faSearch, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [profileImage, setProfileImage] = useState(null);


  // Animation for spinning icon
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSearching) {
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      );
      spinAnimation.start();
    } else {
      spinValue.setValue(0);
    }
  }, [isSearching]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Teams data from home.jsx
  const teams = [
    { id: 1, name: "Manchester City", logo: "https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png" },
    { id: 2, name: "Arsenal", logo: "https://logos-world.net/wp-content/uploads/2020/05/Arsenal-Logo.png" },
    { id: 3, name: "Chelsea", logo: "https://logos-world.net/wp-content/uploads/2020/05/Chelsea-Logo.png" },
    { id: 4, name: "Manchester United", logo: "https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-logo.png" },
    { id: 5, name: "Leicester City", logo: "https://logos-world.net/wp-content/uploads/2020/06/Leicester-City-Logo.png" },
    { id: 6, name: "Tottenham Hotspur", logo: "https://logos-world.net/wp-content/uploads/2020/06/Tottenham-Hotspur-Logo.png" },
    { id: 7, name: "Newcastle United", logo: "https://logos-world.net/wp-content/uploads/2020/06/Newcastle-Logo.png" },
    { id: 8, name: "Leeds United", logo: "https://logos-world.net/wp-content/uploads/2020/06/Leeds-United-Logo.png" },
    { id: 9, name: "Aston Villa", logo: "https://logos-world.net/wp-content/uploads/2020/06/Aston-Villa-Logo.png" },
    { id: 10, name: "West Ham", logo: "https://logos-world.net/wp-content/uploads/2020/06/West-Ham-Logo.png" },
    { id: 11, name: "Liverpool", logo: "https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png" },
    { id: 12, name: "Everton", logo: "https://logos-world.net/wp-content/uploads/2020/06/Everton-Logo.png" }
  ];

  // Filter teams based on search query
  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change with loading effect
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (text.length > 0) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        setIsSearching(false);
      }, 500);
    } else {
      setIsSearching(false);
    }
  };

  // Clear search function
  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  // Format phone number with mask
  const formatPhoneNumber = (text) => {
    // Remove all non-numeric characters
    const numbers = text.replace(/\D/g, '');
    
    // Apply mask based on length
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (text) => {
    const formatted = formatPhoneNumber(text);
    setPhone(formatted);
  };

  // Format date with mask
  const formatDate = (text) => {
    // Remove all non-numeric characters
    const numbers = text.replace(/\D/g, '');
    
    // Apply mask based on length
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    }
  };

  const handleDateChange = (text) => {
    const formatted = formatDate(text);
    setBirthDate(formatted);
  };

  const toggleTeamSelection = (teamId) => {
    if (selectedTeams.includes(teamId)) {
      setSelectedTeams(selectedTeams.filter(id => id !== teamId));
    } else {
      setSelectedTeams([...selectedTeams, teamId]);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finalizar cadastro
      console.log('Cadastro finalizado:', { selectedTeams, email, password, name, phone, birthDate, profileImage });
      router.push('/(tabs)');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedTeams.length > 0;
      case 2:
        return email.length > 0 && password.length >= 6 && password === confirmPassword;
      case 3:
        // Check if phone has at least 10 digits (DDD + 8 digits)
        const phoneNumbers = phone.replace(/\D/g, '');
        return name.length > 0 && phoneNumbers.length >= 10 && birthDate.length > 0;
      default:
        return false;
    }
  };

  const renderProgressBar = () => (
    <View style={styles.progressBar}>
      <View 
        style={[
          styles.progressFill, 
          { width: `${(currentStep / 3) * 100}%` }
        ]} 
      />
    </View>
  );

  const renderStep1 = () => {
    const headerComponent = (
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>Seguir times</Text>
        <Text style={styles.stepDescription}>
            Marque seus times favoritos e receba notificações sempre que a bola rolar
        </Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar times"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
          <TouchableOpacity onPress={clearSearch}>
            <FontAwesomeIcon 
              icon={searchQuery.length > 0 ? faTimes : faSearch} 
              size={20} 
              color="#999"
            />
          </TouchableOpacity>
        </View>
      </View>
    );

    const renderTeamItem = ({ item }) => (
      <TouchableOpacity
        style={styles.teamItem}
        onPress={() => toggleTeamSelection(item.id)}
      >
        <Image source={{ uri: item.logo }} style={styles.teamLogo} />
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{item.name}</Text>
          <Text style={styles.teamSubtitle}>{item.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.starButton}
          onPress={() => toggleTeamSelection(item.id)}
        >
          <Text style={[
            styles.starIcon,
            selectedTeams.includes(item.id) ? styles.starIconSelected : styles.starIconUnselected
          ]}>
            {selectedTeams.includes(item.id) ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );

    const renderLoadingItem = ({ item }) => (
      <View style={styles.loadingContainer}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <FontAwesomeIcon 
            icon={faSpinner} 
            size={48} 
            color="#0038a7"
          />
        </Animated.View>
      </View>
    );

    const renderNoResults = () => (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsTitle}>Nenhum time encontrado</Text>
      </View>
    );

    return (
      <FlatList
        data={isSearching ? [{ id: 'loading' }] : filteredTeams}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={headerComponent}
        renderItem={isSearching ? renderLoadingItem : renderTeamItem}
        ListEmptyComponent={!isSearching && searchQuery.length > 0 ? renderNoResults : null}
        style={styles.teamList}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Crie sua conta</Text>
      <Text style={styles.stepDescription}>
        Digite seu email e crie uma senha para continuar
      </Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            autoComplete="off"
            textContentType="none"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon 
              icon={showPassword ? faEye : faEyeSlash} 
              size={20} 
              color="#666"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirme sua senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
             style={[
               styles.passwordInput,
               confirmPassword.length > 0 && password !== confirmPassword && styles.inputError
             ]}
             value={confirmPassword}
             onChangeText={setConfirmPassword}
             placeholder="Digite a senha novamente"
             placeholderTextColor="#999"
             secureTextEntry={!showConfirmPassword}
             autoComplete="off"
             textContentType="none"
             autoCorrect={false}
             autoCapitalize="none"
           />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <FontAwesomeIcon 
              icon={showConfirmPassword ? faEye : faEyeSlash} 
              size={20} 
              color="#666"
            />
          </TouchableOpacity>
        </View>
        {confirmPassword.length > 0 && password !== confirmPassword && (
          <Text style={styles.errorText}>As senhas são diferentes</Text>
        )}
      </View>
    </View>
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Completar perfil</Text>
      <Text style={styles.stepDescription}>
        Preencha suas informações pessoais
      </Text>
      
      {/* Profile Image Section */}
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.profileImageWrapper}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImagePlaceholderText}>
                  <FontAwesomeIcon 
                    icon={faCameraAlt} 
                    size={32} 
                    color="#666"
                  />
                </Text>
              </View>
            )}
          </View>

          <View style={styles.editIconContainer}>
            <FontAwesomeIcon 
              icon={faPen} 
              size={12} 
              color="#fff"
            />
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nome completo</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Seu nome completo"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={handlePhoneChange}
          placeholder="(11) 99999-9999"
          keyboardType="phone-pad"
        />
      </View>
      
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Data de nascimento</Text>
          <TextInput
            style={styles.input}
            value={birthDate}
            onChangeText={handleDateChange}
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };



  return (
    <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={prevStep} style={styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
                <View style={styles.progressContainer}>
                    {renderProgressBar()}
                </View>
            <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
            {renderCurrentStep()}
        </View>

             {/* Footer */}
       <View style={styles.footer}>
         {currentStep !== 2 && (
           <TouchableOpacity
             style={styles.skipButton}
             onPress={nextStep}
           >
             <Text style={styles.skipButtonText}>Pular</Text>
           </TouchableOpacity>
         )}
         <TouchableOpacity
           style={[
             styles.nextButton, 
             !canProceed() && styles.nextButtonDisabled,
             currentStep === 2 && styles.nextButtonFullWidth
           ]}
           onPress={nextStep}
           disabled={!canProceed()}
         >
           <Text style={[styles.nextButtonText, !canProceed() && styles.nextButtonTextDisabled]}>
             {currentStep === 3 ? "Finalizar" : "Continue"}
           </Text>
         </TouchableOpacity>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
  },
  placeholder: {
    width: 32,
  },
  progressContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  progressBar: {
    width: "75%",
    height: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0038a7",
    borderRadius: 6,
  },
  progressText: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    color: "#666",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  stepContent: {
    paddingBottom: 20,
    paddingHorizontal: 0,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Poppins_700Bold",
    color: "#333",
    marginBottom: 0,
    textAlign: "center",
  },
  stepDescription: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ff6b9d",
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: "#ff6b9d",
  },
  categoryButtonText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#ff6b9d",
  },
  categoryButtonTextActive: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#ffffff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f7",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 0,
    height: 60,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  teamList: {
    flex: 1,
    paddingHorizontal: 0,
  },
  teamItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Android shadow
    elevation: 2,
  },
  teamLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#333",
    marginBottom: 2,
  },
  teamSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666",
  },
  starButton: {
    padding: 8,
  },
  starIcon: {
    fontSize: 24,
  },
  starIconSelected: {
    color: "#ffd700",
  },
  starIconUnselected: {
    color: "#e0e0e0",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: "#0038a7",
    borderColor: "#0038a7",
  },
  checkmark: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f5f5f7",
    height: 60,
    padding: 16,
    borderRadius: 16,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f7",
    height: 60,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#333",
  },
  eyeButton: {
    padding: 8,
  },
  inputError: {
    // 
  },
  errorText: {
    color: "#ff6b9d",
    fontSize: 12,
    marginTop: 8,
    fontFamily: "Poppins_400Regular",
  },
  errorText: {
    color: "#ff6b9d",
    fontSize: 12,
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 12,
  },
  skipButton: {
    flex: 1,
    backgroundColor: "#f5f5f7",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#666",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#0038a7",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#e0e0e0",
  },
  nextButtonFullWidth: {
    flex: 1,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    color: "#ffffff",
  },
  nextButtonTextDisabled: {
    color: "#999",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    color: "#666",
  },
  noResultsContainer: {
    alignItems: "center"
  },
  noResultsIcon: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 10,
  },
  noResultsTitle: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#666",
    textAlign: "center",
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 24,
    borderBottomRightRadius: 0,
    overflow: "hidden",
    position: "relative",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileImagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  profileImagePlaceholderText: {
    fontSize: 30,
    color: "#999",
  },
  editIconContainer: {
    position: "absolute",
    bottom: -10,
    right: -10,
    backgroundColor: "#0038a7",
    borderRadius: 8,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  profileImageLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#666",
    marginTop: 10,
  },
  
   
});
