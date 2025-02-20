import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import PropTypes from "prop-types";
import CircleButtonItem from "./CircleButtonItem";

const alignMap = {
  topcenter: {
    alignItems: "center",
    justifyContent: "flex-start",
    startDegree: 0,
    endDegree: 180,
  },

  topleft: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    startDegree: 0,
    endDegree: 90,
  },

  topright: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    startDegree: 180,
    endDegree: 90,
  },
  center: {
    alignItems: "center",
    justifyContent: "flex-end",
    startDegree: 180,
    endDegree: 360,
  },

  left: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    startDegree: 270,
    endDegree: 360,
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    startDegree: 180,
    endDegree: 270,
  },

  midleft: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    startDegree: -90,
    endDegree: 90,
  },

  midright: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    startDegree: 270,
    endDegree: 90,
  },
};

export default class CircleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
      animating: false,
      anim: new Animated.Value(props.active ? 1 : 0),
    };
  }

  getCircleButtonStyle() {
    return [styles.circleBarItem, this.getButtonSize()];
  }

  getCircleContainerStyle() {
    const { alignItems, justifyContent } = alignMap[this.props.position];
    return [
      styles.overlay,
      styles.circleContainer,
      {
        alignItems,
        justifyContent,
      },
      this.props.containerStyle
    ];
  }
  getCirclesStyle() {
    return [this.getButtonSize()];
  }

  getButtonSize() {
    return {
      width: this.props.size,
      height: this.props.size,
    };
  }

  animateButton() {
    if (this.state.active) {
      this.reset();
      return;
    }

    this.setState({ active: true, animating: false }, () => {
      Animated.spring(this.state.anim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: this.props.useNativeDriver,
      }).start();
    });

  }

  reset() {
    Animated.spring(this.state.anim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: this.props.useNativeDriver,
    }).start(() => {
      this.setState({ active: false, animating: false });
    });
  }

  renderButton() {
    return (
      <View style={this.getCircleButtonStyle()}>
        <Pressable
          activeOpacity={0.85}
          onLongPress={this.props.onLongPress}
          onPress={() => {
            if (!this.state.animating) {
              this.setState({animating: true}, () => {
                this.props.onPress();
                if (this.props.children) {
                  this.animateButton();
                }
              })
            }
          }}
        >
          <Animated.View
            style={[
              styles.btn,
              {
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.size / 2,
                backgroundColor: this.props.useNativeDriver ? this.props.buttonColor : this.state.anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.props.buttonColor, this.props.btnOutRange],
                }),
                transform: [
                  {
                    scale: this.state.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, this.props.outRangeScale],
                    }),
                  },
                  {
                    rotate: this.state.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", this.props.degrees + "deg"],
                    }),
                  },
                ],
              },
              this.props.style,
            ]}
          >
            {this.renderButtonIcon()}
          </Animated.View>
        </Pressable>
      </View>
    );
  }

  renderButtonIcon() {
    if (this.props.icon) {
      return this.props.icon;
    }

    if (this.props.useNativeDriver) {
      return (
        <Text style={{...styles.btnText, color: this.props.buttonTextColor}}>
          +
        </Text>
      );
    } else {
      return (
        <Animated.Text
          style={[
            styles.btnText,
            {
              color: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  this.props.buttonTextColor,
                  this.props.btnOutRangeTxt,
                ],
              }),
            },
          ]}
        >
          +
        </Animated.Text>
      );
    }

  }

  renderCircles() {
    if (!this.state.active) return null;
    const startDegree =
      this.props.startDegree || alignMap[this.props.position].startDegree;
    const endDegree =
      this.props.endDegree || alignMap[this.props.position].endDegree;
    const startRadian = (startDegree * Math.PI) / 180;
    const endRadian = (endDegree * Math.PI) / 180;

    const childrenCount = React.Children.count(this.props.children);
    let offset = 0;
    if (childrenCount !== 1) {
      offset = (endRadian - startRadian) / (childrenCount - 1);
    }

    return React.Children.map(this.props.children, (button, index) => {
      return (
        <View pointerEvents="box-none" style={this.getCircleContainerStyle()}>
          <CircleButtonItem
            key={index}
            position={this.props.position}
            anim={this.state.anim}
            size={this.props.itemSize}
            radius={this.props.radius}
            angle={startRadian + index * offset}
            btnColor={this.props.btnOutRange}
            {...button.props}
            onPress={() => {
              if (this.props.autoInactive) {
                this.reset();
              }
              button.props.onPress();
            }}
          />
        </View>
      );
    });
  }

  render() {
    let backdrop;
    if (this.state.active) {
      backdrop = (
        <TouchableWithoutFeedback
          style={styles.overlay}
          onPress={() => {
            if (!this.state.animating) {
              this.setState({animating: true}, () => {
                if (this.props.children) {
                  this.reset();
                }
                this.props.onOverlayPress();
              })
            }
          }}
        >
          <Animated.View
            style={{
              backgroundColor: this.props.bgColor,
              opacity: this.state.anim,
              flex: 1,
            }}
          >
            {this.props.backdrop}
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    }
    return (
      <View pointerEvents="box-none" style={[
        styles.overlay,
        this.props.stayAbove && {zIndex: 150}
        ]}>
        {backdrop}

        {this.props.children && this.renderCircles()}
        <View pointerEvents="box-none" style={this.getCircleContainerStyle()}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

CircleButton.Item = CircleButtonItem;

CircleButton.propTypes = {
  active: PropTypes.bool,
  bgColor: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  size: PropTypes.number,
  itemSize: PropTypes.number,
  autoInactive: PropTypes.bool,
  useNativeDriver: PropTypes.bool,
  onPress: PropTypes.func,
  onOverlayPress: PropTypes.func,
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  startDegree: PropTypes.number,
  endDegree: PropTypes.number,
  radius: PropTypes.number,
  children: PropTypes.node,
  style: PropTypes.object,
  containerStyle: PropTypes.object,
  stayAbove: PropTypes.bool,
  position: PropTypes.oneOf([
    "left",
    "center",
    "right",
    "topleft",
    "topcenter",
    "topright",
    "midleft",
    "midright"
  ]),
};

CircleButton.defaultProps = {
  active: false,
  bgColor: "transparent",
  useNativeDriver: false,
  buttonColor: "rgba(0,0,0,1)",
  buttonTextColor: "rgba(255,255,255,1)",
  position: "center",
  outRangeScale: 1,
  autoInactive: true,
  onPress: () => {},
  onOverlayPress: () => {},
  backdrop: false,
  degrees: 135,
  size: 63,
  itemSize: 36,
  radius: 100,
  btnOutRange: "rgba(0,0,0,1)",
  btnOutRangeTxt: "rgba(255,255,255,1)",
  style: {},
  containerStyle: {},
  stayAbove: false
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "transparent",
  },
  circleContainer: {
    flexDirection: "column",
    padding: 10,
  },
  circleBarItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,
  },
  btnText: {
    marginTop: Platform.select({ios: 0, android: -4}),
    textAlign: 'center',
    fontSize: 24,
    lineHeight: Platform.select({ios: 25.5, android: null}),
    backgroundColor: "transparent",
    position: "relative",
  },
});
