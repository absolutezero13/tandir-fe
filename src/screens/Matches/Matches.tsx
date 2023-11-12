import React, {useEffect, useState} from 'react';

// views
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';

// components
import {AppButton, WithFocus, Match, LahmacBomb} from '@components';

// services
import {useCustomNavigation} from 'hooks';
import {useAuth, useConversations} from 'store';
import {getMultipleUsers} from 'api/auth';
import {IUser} from 'services/types/auth';
import {Conversation} from 'services/types/conversation';
import {socket} from 'controllers/socketController';

const Matches = () => {
  const {user} = useAuth();
  const {conversations} = useConversations();
  const {navigate} = useCustomNavigation();
  const [pending, setPending] = useState(true);
  const [matchedUsers, setMatchedUsers] = useState<IUser[]>([]);

  useEffect(() => {
    socket.on('receive-message', data => {
      user.matches.find(match => match.matchId === data.room);
    });
  }, [user.matches]);

  const getMatches = async () => {
    try {
      const users = await getMultipleUsers(user?.matches.map(match => match.userId));
      setMatchedUsers(users);
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

  const RenderItem = ({item}: {item: IUser}) => {
    const foundMatchId = user.matches.find(match => match.userId === item._id)?.matchId;
    const onMatchPress = (image: any) => {
      navigate('ChatModal', {
        chatModalData: {
          ...item,
          img: image,
          matchId: foundMatchId,
        },
      });
    };

    return (
      <Match
        match={item}
        matchId={foundMatchId as string}
        user={user}
        conversation={conversations.find(c => c.matchId === foundMatchId) as Conversation}
        onPress={onMatchPress}
      />
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
            data={matchedUsers}
            ListEmptyComponent={pending ? undefined : ListEmptyComponent}
            renderItem={RenderItem}
            keyExtractor={(item: IUser) => item?._id?.toString() || ''}
            ItemSeparatorComponent={() => <View marginV-16 backgroundColor={Colors.accent} height={1} />}
            contentContainerStyle={styles.contentContainer}
          />
        </View>
      </View>
    </WithFocus>
  );
};

const styles = StyleSheet.create({
  contentContainer: {paddingBottom: 36, flex: 1},
});

export default Matches;
