import React, { useState } from "react";

import Api from "../../service/Api";
import ImageView from "react-native-image-view";

function FullImage({ route }) {
  const [Imagevisible, setImagevisible] = useState(true);
  var img_path = route.params?.Userid;
  const UserProfileCardPicture = (user_id, quality = true) => {
    let extra = quality ? "" : "/1";
    return Api.uri(Api._base + "/media/default/" + user_id + extra);
  };
  const images = [
    {
      source: UserProfileCardPicture(img_path),

      width: 806,
      height: 720,
    },
  ];

  return (
    <ImageView
      style={{ width: 100, height: 100 }}
      images={images}
      imageIndex={0}
      isVisible={Imagevisible}
      onClose={() => setImagevisible(false)}
      source={UserProfileCardPicture(img_path)}
      animationType="slide"
      isTapZoomEnabled={true}
    />
  );
}
export default FullImage;
