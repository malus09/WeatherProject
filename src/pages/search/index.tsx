import React, { Fragment, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Modal from "react-native-modal";
import searchStyles from "./styles";
import { IconButton, Icon } from "react-native-paper";

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
  return (kelvin - 273.15).toFixed(1);
};

export default function SearchPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

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
      const apiKey = "fc5b870f4fed155d9c18773e8b311a50";

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
      console.log(error);
    }
  };

  return (
    <ImageBackground
      style={searchStyles.img}
      source={{
        uri: "https://cdn2.vectorstock.com/i/1000x1000/28/61/weather-forecast-background-vector-932861.jpg",
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
          <IconButton
            icon="magnify"
            style={searchStyles.button}
            onPress={fetchWeatherData}
            size={20}
          />

          {/* Exibir mensagem de carregamento, se necessário */}
          {loading && <Text>Carregando...</Text>}

          <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            style={searchStyles.modalContainer}
          >
            <View style={searchStyles.modalContent}>
              <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                Informações do Clima
              </Text>
              {weatherData && (
                <Fragment>
                  <Text>
                    <Icon source="weather-fog" size={20} />
                    Temperatura atual: {kelvinToCelsius(weatherData.main.temp)}
                    °C
                  </Text>

                  <Text>
                    <Icon source="weather-sunny" size={20} />
                    Temperatura máxima:
                    {kelvinToCelsius(weatherData.main.temp_max)} °C
                  </Text>

                  <Text>
                    <Icon source="weather-sunset-down" size={20} />
                    Temperatura mínima:
                    {kelvinToCelsius(weatherData.main.temp_min)} °C
                  </Text>

                  <Text>
                    <Icon source="weather-windy-variant" size={20} />
                    Pressão: {weatherData.main.pressure} hPa
                  </Text>

                  <Text>
                    <Icon source="weather-snowy-rainy" size={20} />
                    Umidade: {weatherData.main.humidity} %
                  </Text>

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
