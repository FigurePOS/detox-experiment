import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Button, TextInput, Switch } from 'react-native';
import { TestIDS } from '../constants/testIds';

export const TextEditor = (props) => {
  const [text, setText] = useState('');
  const [textEdit, setTextEdit] = useState('');
  const [keep, setKeep] = useState(false);

  const onSubmit = useCallback(() => {
    setText(textEdit);
  }, [textEdit, setText]);

  useEffect(() => {
    if (keep) {
      setText(textEdit);
    }
  }, [keep, textEdit, setText]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Text Editor</Text>
      <Text testID={TestIDS.TextEditor} style={styles.text}>
        {text || 'NO TEXT'}
      </Text>
      <TextInput placeholder={'Put your text here.'} value={textEdit} onChangeText={setTextEdit} testID={TestIDS.TextEditorInput} />
      <Button title={'Submit'} onPress={onSubmit} testID={TestIDS.TextEditorSubmit} disabled={keep} />
      <View style={styles.row}>
        <Text testID={TestIDS.TextKeepValue}>Keep the same value</Text>
        <Switch value={keep} onValueChange={setKeep} testID={TestIDS.TextEditorToggle} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    alignItems: 'center',
    margin: 50
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginBottom: 10
  }
};
