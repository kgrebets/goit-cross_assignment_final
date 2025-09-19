import React, { useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { boxesStackRoutes } from "../../navigation/route";
import { BoxesStackParamList } from "../../navigation/types";
import { colors } from "../../constants/colors";
import { fetchBoxById } from "../../store/boxDetailsOps";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { clearBox } from "../../store/boxDetailsSlice";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";

type BoxDetailsRouteProp = RouteProp<
  BoxesStackParamList,
  typeof boxesStackRoutes.BOX_DETAILS
>;

export default function BoxDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<BoxDetailsRouteProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { item: box, loading } = useSelector(
    (state: RootState) => state.boxDetails
  );
  const boxId = route.params?.boxId;

  const qrRef = useRef<any>(null);

  // Share QR code logic
  const handleShareQR = useCallback(async () => {
    if (!qrRef.current || !box) return;

    qrRef.current.toDataURL(async (base64: string) => {
      try {
        const fileUri = FileSystem.cacheDirectory + `${box.title}.png`;

        await FileSystem.writeAsStringAsync(fileUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const available = await Sharing.isAvailableAsync();
        if (!available) {
          console.warn("Sharing is not available on this device");
          return;
        }

        await Sharing.shareAsync(fileUri, {
          mimeType: "image/png",
          dialogTitle: "Share Box QR Code",
        });
      } catch (err) {
        console.error("Error while sharing QR:", err);
      }
    });
  }, [box]);

  // Load box details on mount
  useEffect(() => {
    if (boxId) {
      dispatch(fetchBoxById(boxId));
      return () => {
        dispatch(clearBox());
      };
    }
  }, [boxId, dispatch]);

  // Update navigation title
  useEffect(() => {
    if (box?.title) {
      navigation.setOptions({ title: box.title });
    }
  }, [box?.title, navigation]);

  // Add share button to header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        box ? (
          <Ionicons
            name="share-outline"
            size={28}
            color={colors.primary}
            style={{ marginRight: 16 }}
            onPress={handleShareQR}
          />
        ) : null,
    });
  }, [navigation, handleShareQR, box]);

  // Show loading spinner
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Show "not found" message
  if (!box) {
    return (
      <View style={styles.center}>
        <Text>Box not found</Text>
      </View>
    );
  }

  // Main screen content
  return (
    <View style={styles.root}>
      <View style={styles.qrContainer}>
        <QRCode value={box.id} size={180} getRef={(c) => (qrRef.current = c)} />
      </View>

      <Text>Box ID: {box.id}</Text>
      <Text>Box title: {box.title}</Text>
      <Text>Items: {box.items.length ? box.items.join(", ") : "No items"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  qrContainer: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
