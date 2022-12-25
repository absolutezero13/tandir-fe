import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppButton, ChatModal, WithFocus} from '@components';
import Match from '../../components/Match';
import {useAuth} from 'store';
import LahmacBomb from 'components/LahmacBomb';
import {getMultipleUsers} from 'api/auth';
import {IUser} from 'services/types/auth';
import {StyleSheet} from 'react-native';

const Matches = () => {
  const {user} = useAuth();
  const [pending, setPending] = useState(true);
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [chatModalData, setChatModalData] = useState<any>(null);

  const getMatches = async () => {
    try {
      const users = await getMultipleUsers(user?.matches.map(match => match.userId));
      setMatches(users);
    } catch (error) {
      console.log('error', error);
    } finally {
      setPending(false);
    }
  };

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
    <WithFocus onFocus={getMatches}>
      <View backgroundColor={Colors.secondary} flex-1 paddingH-24>
        <View marginV-36>
          <Text accent bold xlarge>
            {user?.matches.length} Eşleşme{' '}
          </Text>
        </View>
        <View flex-1>
          <FlatList
            data={matches}
            ListEmptyComponent={pending ? undefined : ListEmptyComponent}
            renderItem={({item}: {item: IUser}) => (
              <Match
                match={item}
                onPress={() =>
                  setChatModalData({
                    ...item,
                    matchId: user.matches.find(match => match.userId === item._id)?.matchId,
                  })
                }
              />
            )}
            keyExtractor={(item: IMatch) => item._id.toString()}
            ItemSeparatorComponent={() => <View marginV-16 backgroundColor={Colors.accent} height={1} />}
            contentContainerStyle={styles.contentContainer}
          />
        </View>
        {chatModalData && <ChatModal chatModalData={chatModalData} setChatModalData={setChatModalData} />}
      </View>
    </WithFocus>
  );
};

const styles = StyleSheet.create({
  contentContainer: {paddingBottom: 36, flex: 1},
});

export default Matches;
