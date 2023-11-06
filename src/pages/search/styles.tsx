import { StyleSheet, Platform} from "react-native";

const shadowStyle = Platform.select({
  ios: {
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  android: {
    elevation: 5,
  },
});

const searchStyles = StyleSheet.create({
  elements: {
    height: "25%",
    width: "70%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "lightgrey",
    padding: 16,
    borderRadius: 4,
    ...shadowStyle,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: "white",
    padding: 8,
    borderRadius:4,
  },
  img: { height: "100%", width: "100%" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: "80%",
    height: "30%",
  },
});

export default searchStyles;
