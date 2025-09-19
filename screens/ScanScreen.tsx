import React, { use, useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Button from "../components/Button/Button";
import { boxesStackRoutes, tabRoutes } from "../navigation/route";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabsParamList } from "../navigation/types";
import { CameraView, useCameraPermissions } from "expo-camera";
import { colors } from "../constants/colors";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchBoxById } from "../store/boxDetailsOps";
import { useTranslation } from "../context/translation-context";

type ScanNavigationProp = BottomTabNavigationProp<
  TabsParamList,
  typeof tabRoutes.SCAN_TAB
>;

enum ScanStatus {
  Idle = "idle",
  Scanning = "scanning",
  Waiting = "waiting",
  NotFound = "notfound",
  Found = "found",
}

export default function ScanScreen() {
  const navigation = useNavigation<ScanNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const [permission, requestPermission] = useCameraPermissions();
  const [status, setStatus] = useState<ScanStatus>(ScanStatus.Scanning);

  const { t } = useTranslation();
  const statusMessages: Record<ScanStatus, string> = {
    [ScanStatus.Idle]: t("scanStatusIdle"),
    [ScanStatus.Scanning]: t("scanStatusScanning"),
    [ScanStatus.Waiting]: t("scanStatusWaiting"),
    [ScanStatus.NotFound]: t("scanStatusNotFound"),
    [ScanStatus.Found]: t("scanStatusFound"),
  };

  useFocusEffect(
    useCallback(() => {
      setStatus(ScanStatus.Scanning);
    }, [])
  );

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (status === ScanStatus.NotFound) {
      timer = setTimeout(() => setStatus(ScanStatus.Scanning), 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [status]);

  const handleGrantPermission = async () => {
    const res = await requestPermission();
    if (!res.granted) {
      Linking.openSettings();
    }
  };

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (status !== ScanStatus.Scanning) return;

    console.log("Scanned QR:", data);
    setStatus(ScanStatus.Waiting);

    try {
      const box = await dispatch(fetchBoxById(data)).unwrap();

      if (box) {
        setStatus(ScanStatus.Found);
        navigation.navigate(tabRoutes.BOXES_TAB, {
          screen: boxesStackRoutes.BOX_DETAILS,
          params: { boxId: data },
        });
      } else {
        setStatus(ScanStatus.NotFound);
      }
    } catch {
      setStatus(ScanStatus.NotFound);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>
          Camera access is required to scan QR codes.
        </Text>
        <Button label="Grant camera access" onPress={handleGrantPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <CameraView
          style={styles.cameraView}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={handleBarcodeScanned}
        />
      </View>

      <View style={styles.statusWrapper}>
        <Text style={styles.statusText}>{statusMessages[status]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
  },
  cameraWrapper: {
    flex: 7, // 70%
  },
  statusWrapper: {
    flex: 3, // 30%
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.onBackground,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
});
