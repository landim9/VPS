import React, { useEffect, useState } from 'react';
import { View, Button, Text, FlatList, Alert } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default function PollsScreen() {
  const [polls, setPolls] = useState([]);
  const [userVote, setUserVote] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('polls')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const pollsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPolls(pollsData);
      });
    return () => unsubscribe();
  }, []);

  const vote = (pollId, optionIndex) => {
    const pollRef = firebase.firestore().collection('polls').doc(pollId);

    pollRef.update({
      [`options.${optionIndex}.votes`]: firebase.firestore.FieldValue.increment(1)
    })
    .then(() => {
      setUserVote(optionIndex);
    })
    .catch(error => {
      Alert.alert('Erro', error.message);
    });
  };

  const renderPoll = ({ item }) => {
    return (
      <View>
        <Text>{item.title}</Text>
        {item.options.map((option, index) => (
          <View key={index}>
            <Text>{option.option}</Text>
            <Button
              title={`Votar em "${option.option}"`}
              onPress={() => vote(item.id, index)}
            />
          </View>
        ))}
        <Text>Resultado:</Text>
        {item.options.map((option, index) => (
          <Text key={index}>
            {option.option}: {option.votes} votos
          </Text>
        ))}
      </View>
    );
  };

  return (
    <FlatList
      data={polls}
      renderItem={renderPoll}
      keyExtractor={item => item.id}
    />
  );
}
