import React, { useState, useEffect } from "react";
import { getLinksSave, deleteLink, utils } from "../utils/storeLinks";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function Links() {
  const [links, setLinks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getLinks() {
      const result = await getLinksSave("links");
      setLinks(result);
    }
    getLinks();
  }, [isFocused]);

  async function Delete(id) {
    const result = await deleteLink(links, id);
    setLinks(result);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text
          style={{
            color: "#666",
            fontSize: 30,
            marginTop: 35,
            fontWeight: "800",
            alignItems: "flex-start",
            width: 330,
          }}
        >
          Meus Links
        </Text>
        <FlatList
          style={{ marginTop: 10 }}
          data={links}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ListItem data={item} functionDelete={Delete} />
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

function ListItem({ data, functionDelete }) {
  return (
    <View style={styles.listLinks}>
      <TouchableOpacity
        style={styles.links}
        onPress={() => Clipboard.setString(data.link)}
      >
        <Text style={{ color: "#010204", fontWeight: "700" }}>
          {data.long_url}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.delete}
        onPress={() => functionDelete(data.id)}
      >
        <AntDesign name="delete" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  links: {
    padding: 15,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#f23a6b",
    margin: 10,
    borderRadius: 8,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  listLinks: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  delete: {
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    backgroundColor: "#F71E35",
    height: 45,
    borderRadius: 10,
  },
});
