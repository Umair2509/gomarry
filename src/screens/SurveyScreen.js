import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import SurveyHeader from "../components/SurveyHeader";
import * as Progress from "react-native-progress";
import {
  CheckBox,
  Rating,
  AirbnbRating,
  ListItem,
} from "react-native-elements";
import Api from "../../service/Api";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
function SurveyScreen({ navigation }) {
  const [SurveyQuestion, setSurveyQuestion] = useState({});
  const [nxt_id, setnxt_id] = useState();
  const [question_id, setquestion_id] = useState();
  const [weight, setweight] = useState();
  const [loading, setloading] = useState(true);
  const [isSelected, setSelection] = useState(0);
  // let nxt_id;
  useEffect(() => {
    setloading(true);
    Api.getSurveyQuestion("")
      .then((data) => {
        console.log(data, "Survey Question Data");
        setSurveyQuestion(data);
        setnxt_id(data.next_id);
        setquestion_id(data.question_id);
        setweight(data.answer.weight);
        // console.log(nxt_id, "next question id");
        // s_question(data.next_id);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const s_question = () => {
    // setloading(true);
    Api.getSurveyQuestion(nxt_id)
      .then((data) => {
        console.log(data, "next question is here");
        setSurveyQuestion(data);
        setnxt_id(data.next_id);
        setquestion_id(data.question_id);
        setweight(data.answer.weight);
        // console.log(question_id, "setquestion_id question id");
        // setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const previous_question = () => {
    // setloading(true);
    Api.getSurveyQuestion(SurveyQuestion.previous_id)
      .then((data) => {
        console.log(data, "next question is here");
        setSurveyQuestion(data);
        setnxt_id(data.next_id);
        setquestion_id(data.question_id);
        setweight(data.answer.weight);
        // console.log(question_id, "setquestion_id question id");
        // setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const set_answers = (index) => {
    Api.setSurveyAnswer(question_id, Math.pow(2, index), weight, "abc")
      .then((data) => {
        console.log(data, "datadatadata");
      })
      .catch((error) => {
        console.log(error);
      });
    s_question();
  };
  const handlerating = (Rating) => {
    console.log(Rating, "rating");
  };

  const renderItem = ({ item, index }) => (
    <ListItem bottomDivider onPress={() => set_answers(index)}>
      <ListItem.Content>
        <ListItem.Title>{item}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <>
      {loading ? (
        <ActivityIndicator
          color="red"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <View>
          <SurveyHeader
            navigation={navigation}
            skip={s_question}
            back={previous_question}
          />
          <View
            style={{
              alignItems: "center",
              paddingTop: 15,
              paddingBottom: 5,
            }}
          >
            <Progress.Bar
              progress={SurveyQuestion.completion / 100}
              width={350}
              height={17}
              color="red"
              borderWidth={0.5}
              borderColor="red"
              borderRadius={15}
            >
              <Text
                style={{
                  fontSize: 13,
                  position: "absolute",
                  flex: 0,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                {SurveyQuestion.completion}%
              </Text>
            </Progress.Bar>
          </View>
          <Text
            style={{
              textAlign: "center",
              color: "purple",
              fontSize: 22,
              fontWeight: "500",
              paddingTop: 15,
            }}
          >
            Q: {SurveyQuestion.question.question}
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "brown",
              fontSize: 17,
              padding: 10,
            }}
          >
            Select One
          </Text>
          <View>
            <FlatList
              data={SurveyQuestion.question.answers[0]}
              keyExtractor={(item) => item.key}
              renderItem={renderItem}
            ></FlatList>
          </View>
          <View>
            <AirbnbRating
              count={4}
              reviews={[
                "Not Important",
                "Important",
                "Very Important",
                "it's a deal breaker!",
              ]}
              defaultRating={1}
              size={50}
              onFinishRating={handlerating}
            />
          </View>
        </View>
      )}
    </>
  );
}
export default SurveyScreen;
