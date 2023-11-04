import React, { Fragment, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal"; // Importando a biblioteca do modal
import searchStyles from "./styles";

// Definindo a interface para os dados do clima
interface WeatherData {
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    pressure: number;
    humidity: number;
  };
}

// Função para converter Kelvin para Celsius
const kelvinToCelsius = (kelvin: number) => {
  return (kelvin - 273.15).toFixed(1); // Convertendo Kelvin para Celsius
};

export default function SearchPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  const toggleModal = () => {
    setModalVisible(!isModalVisible); // Alternando a visibilidade do modal
  };

  const fetchWeatherData = async () => {
    // Verificar se foi digitado o nome da cidade
    if (!location) {
      setError("Por favor, digite o nome da cidade");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const apiKey = ""; //Informe sua key do open weather map

      //Requisitando latitude e longitude para a API por meio do nome do local
      const geocodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        location
      )}&limit=5&appid=${apiKey}`;
      const geolocationResponse = await axios.get(geocodingApiUrl);

      const geolocalData = geolocationResponse.data[0];

      //Requisitando para a API os dados climáticos a partir das informações obtidas na última requisição
      const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${geolocalData?.lat}&lon=${geolocalData?.lon}&appid=${apiKey}`;
      const weatherResponse = await axios.get(weatherApiUrl);

      const weatherData = weatherResponse.data;

      setWeatherData(weatherData); // Definindo os dados do clima

      toggleModal(); // Mostrando o modal quando os dados são obtidos com sucesso
      setLoading(false);
    } catch (error) {
      alert("erro");
    }
  };

  return (
    <ImageBackground
      style={searchStyles.img}
      source={{
        uri: "https://static.vecteezy.com/system/resources/previews/016/088/358/original/cloud-weather-forecast-seamless-pattern-background-wallpaper-illustration-vector.jpg",
      }}
    >
      <View style={searchStyles.container}>
        <View style={searchStyles.elements}>
          {error && <Text>{error}</Text>}
          <Text>Pesquise o clima de uma cidade!</Text>
          <TextInput
            style={searchStyles.input}
            placeholder="Digite o nome da cidade"
            onChangeText={(text) => setLocation(text)}
          />
          <TouchableOpacity
            style={searchStyles.button}
            onPress={fetchWeatherData}
          >
            <Text>Pesquisar</Text>
          </TouchableOpacity>

          {/* Exibir mensagem de carregamento, se necessário */}
          {loading && <Text>Carregando...</Text>}

          <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            style={searchStyles.modalContainer}
          >
            <View style={searchStyles.modalContent}>
              <Text>Informações do Clima</Text>
              {weatherData && (
                <Fragment>
                  <Text>
                    Temperatura atual: {kelvinToCelsius(weatherData.main.temp)}{" "}
                    °C
                  </Text>
                  <Text>
                    Temperatura máxima:
                    {kelvinToCelsius(weatherData.main.temp_max)} °C
                  </Text>
                  <Text>
                    Temperatura mínima:
                    {kelvinToCelsius(weatherData.main.temp_min)} °C
                  </Text>
                  <Text>Pressão: {weatherData.main.pressure} hPa</Text>
                  <Text>Umidade: {weatherData.main.humidity} %</Text>
                  <TouchableOpacity
                    style={[
                      searchStyles.button,
                      { backgroundColor: "lightgrey" },
                    ]}
                    onPress={toggleModal}
                  >
                    <Text>Fechar</Text>
                  </TouchableOpacity>
                </Fragment>
              )}
            </View>
          </Modal>
        </View>
      </View>
    </ImageBackground>
  );
}
