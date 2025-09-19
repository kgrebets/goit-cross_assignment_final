import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { addBox } from "../../store/boxesOps";
import Button from "../../components/Button/Button";

export default function CreateBoxScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");

  const handleSave = async () => {
    const newBox = {
      title: title || "Untitled box",
      createdAt: new Date().toISOString(),
      imageUrl: "https://picsum.photos/seed/newbox/200",
      items: [],
    };

    await dispatch(addBox(newBox)).unwrap();
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <Text style={styles.label}>Box title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />
        <Button label="Save" onPress={handleSave} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
 // center: { flex: 1, justifyContent: "center", alignItems: "center" },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
});
