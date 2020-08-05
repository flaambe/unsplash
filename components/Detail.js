import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

function Detail(props) {
  const {route} = props;
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <Image source={{uri: item.urls.regular}} style={styles.backgroundImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
});

export default Detail;
