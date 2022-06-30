import React, { useState } from 'react';
import { Text, View, Button} from 'react-native';
import { TestIDS } from '../constants/testIds';

export const Counter = (props) => {
    const [count, setCount] = useState(0)
    let color = "black"
    if (count < 0) {
        color = "red"
    }
    if (count > 0) {
        color = "green"
    }
    if (count > 10) {
        color = "blue"
    }
    const countStyle = {
        color: color
    }
    return (
      <View style={styles.container}>
          <Text testID={TestIDS.CounterText}>Counter</Text>
          <Text style={countStyle} testID={TestIDS.CounterCount}>{count}</Text>
          <View style={styles.buttons}>
              <Button title={"-"} onPress={() => setCount((prev) => prev - 1)} testID={TestIDS.CounterMinus}/>
              <Button title={"Reset"} onPress={() => setCount(0)} testID={TestIDS.CounterReset}/>
              <Button title={"+"} onPress={() => setCount((prev) => prev + 1)} testID={TestIDS.CounterPlus}/>
          </View>
      </View>
    )
}

const styles = {
    container: {
        alignItems: "center",
        margin: 50,
    },
    buttons: {
        flexDirection: "row"
    }
}
