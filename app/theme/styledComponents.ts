// src/theme/styledComponents.ts
import styled from "styled-components/native";

// Container for each screen to handle background and padding
export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  padding: 16px;
  justify-content: center;
  align-items: center;
  `;

  
// Title text with appropriate font size and color
export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
  text-align: center;
`;

// Regular text with some margin and color for description
export const RegularText = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.text};
  margin-bottom: 8px;
  text-align: center;
`;

// Styling the button container to center the button
export const ButtonContainer = styled.View`
  align-items: center;
`;

// Card to display weather information with shadow and rounded corners
export const Card = styled.View`
  background-color: ${(props) =>
    props.theme.background === "#fff" ? "#f9f9f9" : "#333"};
  padding: 20px;
  border-radius: 15px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  shadow-offset: 0px 4px;
  elevation: 3;
  width: 100%;
  max-width: 350px;
  align-items: center;
`;

// Weather info container for organizing weather data
export const WeatherInfoContainer = styled.View`
  margin-top: 20px;
  align-items: center;
`;

// Temp text with larger font size and special styling
export const TempText = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin-top: 8px;
`;

// Styled button with gradient background
export const StyledButton = styled.TouchableOpacity`
  background-color: #3498db;
  padding:6px 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 200px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  shadow-offset: 0px 4px;
  elevation: 4;
`;
export const NewsItemContainer = styled.View`
  background-color: ${(props) =>
    props.theme.background === "#fff" ? "#f9f9f9" : "#333"};
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  shadow-offset: 0px 4px;
  elevation: 3;
`;

// Title for the news item with larger font and bold weight
export const NewsTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.text};
  margin-bottom: 8px;
`;

// Description for the news item with appropriate font size and color
export const NewsDescription = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.text};
  line-height: 20px;
`;

// Loading container with spinner
export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
`;
