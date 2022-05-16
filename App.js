import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PdfDownload from './src/components/pdf';

const App = () => {

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <PdfDownload />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    padding: 20,
  },
});

export default App;
