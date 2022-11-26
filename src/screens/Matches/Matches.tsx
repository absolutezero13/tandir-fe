import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppButton, ChatModal} from '@components';
import Match, {IMatch} from '../../components/Match';
import {useAuth} from 'store';
import LahmacBomb from 'components/LahmacBomb';

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
  const {user} = useAuth();
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [chatModalData, setChatModalData] = useState<any>(null);

  useEffect(() => {
    setMatches(mockMatches);
  }, []);

  const ListEmptyComponent = () => {
    const [showLahmacBomb, setShowLahmacBomb] = useState(false);

    const throwLahmac = () => {
      setShowLahmacBomb(true);
    };
    return (
      <View centerH marginT-24 flex-1>
        <Text marginT-12 accent large>
          Hiç eşleşmen yok 😢
        </Text>
        <Icon color={Colors.accent} size={120} name="heart-dislike-outline" />
        <View marginT-12>
          <Text large accent>
            Eşleşme almak için lahmaç fırlat.
          </Text>
          <View center marginT-60>
            <AppButton text="Fırlat" onPress={throwLahmac} />
          </View>
        </View>
        {showLahmacBomb && <LahmacBomb visible={showLahmacBomb} setVisible={setShowLahmacBomb} />}
      </View>
    );
  };

  return (
    <View backgroundColor={Colors.secondary} flex-1 paddingH-24>
      <View marginV-36>
        <Text accent bold xlarge>
          {user?.matches.length} Eşleşme{' '}
        </Text>
      </View>
      <View flex-1>
        <FlatList
          data={user?.matches}
          ListEmptyComponent={ListEmptyComponent}
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
