import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { CLIENT_ID } from 'react-native-dotenv'

export default function Home(props) {
  const { navigation } = props;
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const response = await fetch(
        `https://api.unsplash.com/photos/?client_id=${CLIENT_ID}&page=${page}`
      );
      const data = await response.json();
      setPhotos((p) => {
        return [...p, ...photos]
      });
      setLoading(false);
    };

    fetchData();
  }, [page]);

  const renderRow = ({ item }) => {
    return (
      <View style={styles.itemRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', { item })}>
          <Image style={styles.itemImage} source={{ uri: item.urls.thumb }} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.itemText}>Name: {item.alt_description}</Text>
          <Text style={styles.itemText}>User: {item.user.username}</Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <FlatList
      style={styles.container}
      data={photos}
      renderItem={renderRow}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#f5fcff',
  },
  itemRow: {
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderBottomWidth: 1,
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 16,
    padding: 5,
  },
  itemImage: {
    resizeMode: 'cover',
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
