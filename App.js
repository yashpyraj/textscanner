

import React, { useEffect, useState } from 'react';

import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';





const App = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState([])
  useEffect(() => {
    (async () => {
      if (image) {
        const result = await TextRecognition.recognize(image.assets[0].uri);
        setResult(result)
        console.log(result)
      }
    })();

  }, [image])
  const renderItem = ({ item }) => (
    <View>
      <Text style={{ color: 'black' }}>{item}</Text>
    </View>
  );
  return (
    <View style={styles.sectionContainer} >
      <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', marginTop: 20 }}>
        Text Detection
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 40 }}>
        <TouchableHighlight onPress={() => {
          launchImageLibrary({ noData: true }, setImage)
          console.log('clicked')
        }}>
          <View style={{
            backgroundColor: 'black',
            width: "70%",
            margin: 10,
            padding: 10,
            borderRadius: 5,
          }}>
            <Text style={{ color: 'white' }}>Pick Image</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
          launchCamera({ noData: true }, setImage)
          console.log('clicked')
        }}>
          <View style={{
            backgroundColor: 'black',
            width: "70%",
            margin: 10,
            padding: 10,
            borderRadius: 5,
          }}>
            <Text style={{ color: 'white' }}>Open Camera</Text>
          </View>
        </TouchableHighlight>
      </View>


      <View style={{ borderWidth: 1, height: "60%", margin: 4 }}>
        <FlatList data={result} renderItem={renderItem} windowSize={5} ListEmptyComponent={<Text style={{ color: 'black', textAlign: 'center', fontSize: 18, }}>
          No Text Detected yet !
        </Text>} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: 'white'
  },

});

export default App;
