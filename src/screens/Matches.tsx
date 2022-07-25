import React, {useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, Text, View} from 'react-native-ui-lib';
import Match, {IMatch, MatchProps} from '../components/Match';

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
  const [matches, setMatches] = React.useState<IMatch[]>([]);

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
          renderItem={({item}: {item: IMatch}) => <Match match={item} />}
          keyExtractor={(item: IMatch) => item.id.toString()}
          ItemSeparatorComponent={() => <View marginV-16 backgroundColor={Colors.accent} height={1} />}
          contentContainerStyle={{paddingBottom: 36, flex: 1}}
        />
      </View>
    </View>
  );
};

export default Matches;
