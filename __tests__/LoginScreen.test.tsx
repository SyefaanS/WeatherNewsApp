import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";
import LoginScreen from "@/app/screens/LoginScreen";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ replace: jest.fn() }),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
}));

describe("LoginScreen", () => {
  it("renders username and email inputs", () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    expect(getByPlaceholderText("Username")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
  });

  it("shows alert if inputs are empty", () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    const { getByTestId } = render(<LoginScreen />);
  
    fireEvent.press(getByTestId("loginButton"));
  
    // Update expected message to match the component's alert message
    expect(alertSpy).toHaveBeenCalledWith("Error", "Please enter both username and email.");
    alertSpy.mockRestore();
  });
  
});
