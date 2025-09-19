import React from "react";
import BoxListScreen from "../screens/Boxes/BoxListScreen";
import BoxDetailsScreen from "../screens/Boxes/BoxDetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { boxesStackRoutes } from "./route";
import { BoxesStackParamList } from "./types";
import { useTranslation } from "../context/translation-context";
import CreateBoxScreen from "../screens/Boxes/CreateBoxScreen";

const Stack = createStackNavigator<BoxesStackParamList>();

export default function BoxesStack() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={boxesStackRoutes.BOXES_LIST}
        component={BoxListScreen}
        options={{ title: t("boxes") }}
      />
      <Stack.Screen
        name={boxesStackRoutes.BOX_DETAILS}
        component={BoxDetailsScreen}
        options={{ title: t("boxDetails") }}
      />
      <Stack.Screen
        name={boxesStackRoutes.BOX_CREATE}
        component={CreateBoxScreen}
        options={{ title: t("createBox") }}
      />
    </Stack.Navigator>
  );
}
