import { StyleSheet, Text, View } from "react-native";
import { Coordinates } from "../types/types";

export default function Food({ x, y }: Coordinates): JSX.Element {
  return <Text style={[{ top: y * 10, left: x * 10 }, styles.food]}>🍕</Text>;
}

const styles = StyleSheet.create({
  food: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
  },
});
