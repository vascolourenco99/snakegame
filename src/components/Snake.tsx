import { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import { Coordinates } from "../types/types";
import { Colors } from "../styles/colors";

interface SnakeProps {
  snake: Coordinates[];
}
export default function Snake({ snake }: SnakeProps): JSX.Element {
  return (
    <Fragment>
      {snake.map((segment: Coordinates, index: number) => {
        const segmentStyle = {
          left: segment.x * 10,
          top: segment.y * 10,
        };
        return <View key={index} style={[styles.snake, segmentStyle]} />;
      })}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  snake: {
    width: 20,
    height: 20,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    position: "absolute",
  },
});
