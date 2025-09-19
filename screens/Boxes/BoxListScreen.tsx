import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  UIManager,
} from "react-native";
import BoxList from "../../components/BoxList/BoxList";
import { Box } from "../../models/Box";
import { colors } from "../../constants/colors";
import SearchBar from "../../components/SearchBar/SearchBar";
import Button from "../../components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { boxesStackRoutes } from "../../navigation/route";
import { BoxesStackParamList } from "../../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchBoxes } from "../../store/boxesOps";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useTranslation } from "../../context/translation-context";

type BoxListNavProp = StackNavigationProp<
  BoxesStackParamList,
  typeof boxesStackRoutes.BOXES_LIST
>;

export default function BoxListScreen() {
  const { items: boxes, loading } = useSelector(
    (state: RootState) => state.boxes
  );
  const [query, setQuery] = useState("");
  const navigation = useNavigation<BoxListNavProp>();
  const dispatch = useDispatch<AppDispatch>();
  const {t} = useTranslation();

  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchBoxes());
  }, [dispatch]);

  const normalizedQuery = useMemo(() => query.trim().toLowerCase(), [query]);
  const filteredBoxes = useMemo(() => {
    if (!normalizedQuery) return boxes;
    return boxes.filter(
      (b) =>
        b.title.toLowerCase().includes(normalizedQuery) ||
        b.items?.some((it) => it.toLowerCase().includes(normalizedQuery))
    );
  }, [boxes, normalizedQuery]);

  const handleAdd = useCallback(() => {
    navigation.navigate(boxesStackRoutes.BOX_CREATE);
  }, [navigation]);

  const handleOpen = useCallback(
    (box: Box) => {
      navigation.navigate(boxesStackRoutes.BOX_DETAILS, { boxId: box.id });
    },
    [navigation]
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.root, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <SearchBar value={query} onChangeText={setQuery} placeholder={t("search")} />
      </View>

      <BoxList data={filteredBoxes} onPressBox={handleOpen} />

      <View style={styles.addContainer}>
        <Button label={t("addBox")} icon="add" onPress={handleAdd} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    padding: 8,
  },
  addContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
