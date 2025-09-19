import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useTranslation } from "../context/translation-context";

export default function SettingsScreen() {
  const { t, lang, setLang } = useTranslation();

  const toggleLanguage = () => {
    setLang(lang === "en" ? "ua" : "en");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("appLanguage")}</Text>

      <View style={styles.switchRow}>
        <Text style={styles.label}>English</Text>
        <Switch value={lang === "ua"} onValueChange={toggleLanguage} />
        <Text style={styles.label}>Українська</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontSize: 16,
  },
});
