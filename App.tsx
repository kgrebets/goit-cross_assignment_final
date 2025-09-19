import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppTabs from "./navigation/AppTabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TranslationProvider } from "./context/translation-context";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <TranslationProvider>
          <NavigationContainer>
            <AppTabs />
          </NavigationContainer>
        </TranslationProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
