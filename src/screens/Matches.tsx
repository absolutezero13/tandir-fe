import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, Text, View} from 'react-native-ui-lib';
import ChatModal from '../components/ChatModal';
import Match, {IMatch} from '../components/Match';

const mockMatches = [
  {
    id: 1,
    name: 'Julia',
    age: '23',
    image: 'https://picsum.photos/200/300?random=1',
    messages: ['Merhaba', 'Nasıl gidiyor kekw'],
  },
  {
    id: 2,
    name: 'Amo',
    age: '23',
    image: 'https://picsum.photos/200/300?random=1',
    messages: ['Merhaba', 'Broooo naber kekw'],
  },
  {
    id: 3,
    name: 'Sülo',
    age: '23',
    image: 'https://picsum.photos/200/300?random=1',
    messages: ['Merhaba', 'Naptın la'],
  },
];

const Matches = () => {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [chatModalData, setChatModalData] = useState<any>(null);

  useEffect(() => {
    setMatches(mockMatches);
  }, []);

  return (
    <View backgroundColor={Colors.secondary} flex-1 paddingH-24>
      <View marginV-36>
        <Text accent bold xlarge>
          {matches.length} Eşleşme{' '}
        </Text>
      </View>
      <View flex-1>
        <FlatList
          data={matches}
          renderItem={({item}: {item: IMatch}) => (
            <Match
              match={item}
              onPress={() =>
                setChatModalData({
                  username: item.name,
                  img: item.image,
                })
              }
            />
          )}
          keyExtractor={(item: IMatch) => item.id.toString()}
          ItemSeparatorComponent={() => <View marginV-16 backgroundColor={Colors.accent} height={1} />}
          contentContainerStyle={{paddingBottom: 36, flex: 1}}
        />
      </View>
      <ChatModal chatModalData={chatModalData} setChatModalData={setChatModalData} />
    </View>
  );
};

export default Matches;
