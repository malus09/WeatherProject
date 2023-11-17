import { StyleSheet, Platform } from "react-native";

const shadowStyle = Platform.select({
  ios: {
    shadowColor: "rgba(243, 246, 244, 0.5)",
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
    height: 200,
    width: "70%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
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
    borderColor: "grey",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#eeeeee",
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 8,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: "center",
  },
  img: { height: "110%", width: "100%" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: "80%",
    height: "32%",
  },
});

export default searchStyles;
