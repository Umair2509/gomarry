// import React, { useEffect, useState } from "react";
// import { View, Text, ImageStore, ImageBackground } from "react-native";
// import Api from "../../service/Api";
// import Video from "react-native-video";
// function VideosScreen(props) {
//   useEffect(() => {
//     Api.profile(props.username)
//       .then((data) => {
//         console.log(data.user.albums[2].videos[0], "Videos Profile....... ");
//         setProfiledata(data);
//       })
//       .catch((err) => {});
//   }, []);
//   const [Profiledata, setProfiledata] = useState({});
//   const videoUrl = (alias) => {
//     return Api.uri(Api._base + "/media/video/" + alias);
//   };

//   return (
//     <View style={{ alignItems: "center", paddingTop: 111 }}>
//       <Text>Videos Screen</Text>
//       {/* {Profiledata == null? (
//         <Text>no videos</Text>
//       ) : (
//         <ImageBackground
//           style={{ width: 100, height: 100 }}
//           source={videoUrl(Profiledata.user.albums[2].videos[0])}
//         ></ImageBackground>
//       )} */}
//     </View>
//   );
// }
// export default VideosScreen;

// React Native Video Library to Play Video in Android and IOS
// https://aboutreact.com/react-native-video/

// import React in our code
import React, { useState, useRef, useEffect } from "react";

// import all the components we are going to use
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

//Import React Native Video to play video
import Video from "react-native-video";
import { Icon } from "react-native-elements";
//Media Controls to control Play/Pause/Seek and full screen
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
import Api from "../../service/Api";
function VideosScreen(props) {
  const [Profiledata, setProfiledata] = useState({});
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setloading(true);
    setProfiledata(props.profiledetail);
    if (Profiledata == undefined) {
      setloading(true);
    } else {
      setloading(false);
    }
  }, []);

  const videoUrl = (alias) => {
    return Api.uri(Api._base + "/media/video/" + alias);
  };
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState("content");

  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onError = () => alert("Oh! ", error);

  const exitFullScreen = () => {
    alert("Exit full screen");
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == "content") setScreenType("cover");
    else setScreenType("content");
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> ToolBar </Text>
    </View>
  );

  const onSeeking = (currentTime) => setCurrentTime(currentTime);

  return (
    <>
      {loading == true || Profiledata == null ? (
        <ActivityIndicator
          color="red"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <>
          {Profiledata.user.albums[2].videos == 0 ? (
            <View style={{ flexDirection: "column", marginTop: 60 }}>
              <Icon
                name="video-camera"
                type="font-awesome"
                color="grey"
                size={45}
              ></Icon>
              <Text style={{ marginLeft: 162 }}>No Videos</Text>
            </View>
          ) : (
            <View style={styles.container}>
              <Video
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                onProgress={onProgress}
                paused={paused}
                ref={videoPlayer}
                resizeMode={screenType}
                onFullScreen={isFullScreen}
                source={videoUrl(Profiledata.user.albums[2].videos[0])}
                style={styles.mediaPlayer}
                volume={10}
              />
              <MediaControls
                duration={duration}
                isLoading={isLoading}
                mainColor="#333"
                onFullScreen={onFullScreen}
                onPaused={onPaused}
                onReplay={onReplay}
                onSeek={onSeek}
                onSeeking={onSeeking}
                playerState={playerState}
                progress={currentTime}
                toolbar={renderToolbar()}
              />
            </View>
          )}
        </>
      )}
    </>
  );
}

export default VideosScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 10,
    overflow: "hidden",
    backgroundColor: "#000",
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-between",
    paddingTop: Platform.OS == "android" ? 10 : 0,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "black",
    justifyContent: "center",
    overflow: "hidden",
  },
});
