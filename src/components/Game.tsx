import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "../styles/colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Coordinates, Direction, GestureEventType } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";
import Food from "./Food";
import { checkEatsFood } from "../utils/checkEatsFood";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import Header from "./Header";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 36, yMin: 0, yMax: 68 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game(): JSX.Element {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinates[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinates>(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newSnakeHead = { ...snakeHead };

    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver((prev) => !prev);
      return;
    }

    switch (direction) {
      case Direction.Up:
        newSnakeHead.y--;
        break;
      case Direction.Down:
        newSnakeHead.y++;
        break;
      case Direction.Left:
        newSnakeHead.x--;
        break;
      case Direction.Right:
        newSnakeHead.x++;
        break;
      default:
        break;
    }

    if (checkEatsFood(newSnakeHead, food, 2)){
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newSnakeHead, ...snake]);
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newSnakeHead, ...snake.slice(0, -1)]);
    }
  };

  const handleGesture = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        // console.log("right");
        setDirection(Direction.Right);
      } else {
        // console.log("left");
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        // console.log("down");
        setDirection(Direction.Down);
      } else {
        // console.log("up");
        setDirection(Direction.Up);
      }
    }
  };

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDirection(Direction.Right);
    setIsPaused(false);
  }

  const pauseGame = () => {
    setIsPaused((prev) => !prev);
  }

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header isPaused={isPaused} pauseGame={pauseGame} reloadGame={reloadGame}>
          <Text style={{ color: Colors.primary}}>Score: {score}</Text>
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundaries: {
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
    flex: 1,
    borderWidth: 12,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});
