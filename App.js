import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  Image,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestMovies = async () => {
      setLoading(true);

      const req = await fetch('https://api.b7web.com.br/cinema/');
      const json = await req.json();

      if (json) {
        setMovies(json);
      }

      setLoading(false);
    };

    requestMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#333" translucent={false} />
      {loading && (
        <View style={styles.loadingArea}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}

      {!loading && (
        <>
          <Text style={styles.totalMoviesText}>
            Total de Filme : {movies.length}
          </Text>
          <FlatList
            style={styles.list}
            data={movies}
            renderItem={({item}) => (
              <View style={styles.movieItem}>
                <Image
                  source={{uri: item.avatar}}
                  style={styles.movieImage}
                  resizeMode="contain"
                />
                <Text style={styles.movieTitle}>{item.titulo}</Text>
              </View>
            )}
            keyExtractor={(item) => item.titulo}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  loadingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 10,
  },
  totalMoviesText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  movieItem: {
    marginBottom: 30,
  },
  movieImage: {
    height: 300,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default App;
