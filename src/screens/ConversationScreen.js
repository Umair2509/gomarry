import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from "react-native";
import { Header, Icon } from "react-native-elements";
import Api from "../../service/Api";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  SystemMessage,
} from "react-native-gifted-chat";
import { KeyboardAvoidingView } from "react-native";
import _ from "lodash";
import moment from "moment";
export default function ConversationScreen({ route, navigation }) {
  // const [messages, setMessages] = useState([]);
  const [conversation, setconversation] = useState([]);
  const [limit, setlimit] = useState(10);
  const [state, setState] = useState({
    user_id,
    chat_loading: false,
  });
  const { user_id, chat_loading } = state;
  const updateField = (field) => {
    setState((prev) => ({ ...prev, ...field }));
  };

  useEffect(() => {
    updateField({ user_id: route.params?.id });
    Api.loadConversation(33160, undefined, undefined, undefined, limit)
      .then((data) => {
        setconversation(data.conversation.messages),
          console.log(data.conversation.messages, "conversation");
      })
      .catch((error) => {});
    // setMessages([
    //   {
    //     _id: 1,
    //     text: "Hello world",
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: "React Native",
    //       avatar: "https://placeimg.com/140/140/any",
    //     },
    //     sent: true,
    //     received: true,
    //   },
    // ]);
  }, [limit]);
  const onSend = useCallback((mess = []) => {
    console.log(mess, "on send message");
    const newMessage = {
      sender: {
        user_id: route.params?.id,
      },
      message: {
        rawTime: Math.floor(Date.now() / 1000),
        id: mess[0]._id,
        body: mess[0].text,
      },
    };

    setconversation((previousMessages) =>
      GiftedChat.append(previousMessages, newMessage)
    );
    Keyboard.dismiss();
    // console.log(newMessage.message.body, "on send message");
    on_submit(newMessage.message.body);
  });

  const on_submit = (msg) => {
    Api.sendMessage(33160, msg)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const conversation_func = () => {
    return conversation
      ? conversation.map((usr) => {
          console.log(usr, "conversation_func");
          // console.log(usr.sender.user_id, "user id");
          // updateField({ user_id: usr.sender.user_id });

          return {
            _id: usr.message.id,
            text: usr.message.body,
            received: usr.message.read == 1 ? true : false,
            sent: true,
            createdAt: moment.unix(usr.message.rawTime).toDate(),
            user: {
              _id: usr.sender.user_id,
              text: usr.message.body,
              received: usr.message.read == 1 ? true : false,
              sent: true,
              name: usr.sender.username,
              // avatar: usr.sender.default_picture,
              avatar: "https://placeimg.com/140/140/any",
            },
          };
        })
      : [];
  };
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "white",
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: "white",
            borderRadius: 10,
          },
          right: {
            backgroundColor: "#128C7E",
            borderRadius: 10,
          },
        }}
      />
    );
  };
  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
          padding: 3,
        }}
      />
    );
  };
  const load_earlier = () => {
    updateField({ chat_loading: true });
    setlimit(limit + 10);
    updateField({ chat_loading: false });
  };

  return (
    <ImageBackground
      source={require("../images/chat_bg_dark.png")}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <Header
          placement="left"
          containerStyle={{
            backgroundColor: "#075E54",
            justifyContent: "space-around",
          }}
          leftComponent={
            <Icon
              name="arrow-back"
              type="Ionicons"
              color="#fff"
              size={30}
              onPress={() => navigation.goBack()}
            />
          }
          centerComponent={{
            text: route.params?.name,
            style: { color: "#fff", fontSize: 22, fontWeight: "bold" },
          }}
        ></Header>
        <GiftedChat
          messages={conversation_func()}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: user_id,
          }}
          loadEarlier={true}
          isLoadingEarlier={chat_loading}
          onLoadEarlier={() => load_earlier()}
          showUserAvatar={false}
          renderBubble={renderBubble}
          renderInputToolbar={(props) => customtInputToolbar(props)}
          renderUsernameOnMessage={true}
          isAnimated={true}
          // isTyping={true}
        />
        {Platform.OS === "android" && <KeyboardAvoidingView />}
      </View>
    </ImageBackground>
  );
}
