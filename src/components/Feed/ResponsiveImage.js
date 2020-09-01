import React, { useMemo, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

const ResponsiveImage = props => {
  const [containerWidth, setContainerWidth] = useState(0);
  const _onViewLayoutChange = event => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  }

  const imageStyles = useMemo(() => {
    const ratio = containerWidth / props.srcWidth;
    return {
      width: containerWidth,
      height: props.srcHeight * ratio
    };
  }, [containerWidth]);

  return (
    <View style={styles.container} onLayout={_onViewLayoutChange}>
      <Image source={props.src} style={imageStyles} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" }
});

export default ResponsiveImage;