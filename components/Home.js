import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import * as Clipboard from "expo-clipboard";
import bitly from "../services/bitly";
import React, { useState } from "react";
import { saveLink } from "../utils/storeLinks.js";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

export default function Home() {
  const [url, setUrl] = useState("");

  const [urlFinal, setUrlFinal] = useState("");
  const [site, setSite] = useState(0);

  const short = async () => {
    try {
      const response = await bitly.post("/shorten", {
        long_url: url,
      });
      setUrlFinal(response.data.link);
      saveLink("links", response.data);
      console.log(response.data)
      Keyboard.dismiss();
    } catch {
      alert("Error");
    }
  };

  const Copy = () => {
    Clipboard.setString(urlFinal);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image source={require("../src/logo.png")} style={styles.logo} />
        <Picker
          selectedValue={site}
          onValueChange={(itemValue, itemIndex) => setSite(itemValue)}
          style={{ width: "75%", margin: -50 }}
          mode="dropdown"
        >
          <Picker.Item label="Bit.ly" value="" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="URL"
          onChangeText={(url) => setUrl(url)}
        />

        <TouchableOpacity style={styles.button} onPress={() => short()}>
          <Text
            style={{ color: "#fff", fontWeight: "700", textAlign: "center" }}
          >
            Encurtar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.short}
          onPress={urlFinal ? Copy : () => {}}
        >
          <Text style={{ color: "#f23a6b", fontSize: 18, fontWeight: "700" }}>
            {urlFinal}
          </Text>
        </TouchableOpacity>

        <StatusBar hidden />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 280,
    height: 70,
  },
  input: {
    padding: 15,
    width: 250,
    borderColor: "#666",
    borderWidth: 1,
    margin: 10,
    borderRadius: 8,
  },
  button: {
    padding: 15,
    backgroundColor: "#f23a6b",
    margin: 10,
    borderRadius: 8,
    width: 250,
  },
  short: {
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
});
