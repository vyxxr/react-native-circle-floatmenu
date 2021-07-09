import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

export default class CircleButtonItem extends Component {

  render() {
    const offsetX = this.props.radius * Math.cos(this.props.angle);
    const offsetY = this.props.radius * Math.sin(this.props.angle);
    return (
      <Animated.View
        style={[{
          opacity: this.props.anim,
          width: this.props.size,
          height: this.props.size,
          transform: [
            {
              translateY: this.props.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, offsetY],
              }) },
            {
              translateX: this.props.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, offsetX],
              }) },
            {
              rotate: this.props.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [`${this.props.startDegree}deg`, `${this.props.endDegree}deg`],
              }) },
            {
              scale: this.props.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }) },
          ]
        }]}
      >
        <TouchableOpacity style={{flex:1}} activeOpacity={this.props.activeOpacity || 0.85} onPress={this.props.onPress}>
          <View
            style={[styles.circleButton,{
              width: this.props.size,
              height: this.props.size,
              borderRadius: this.props.size / 2,
              backgroundColor: this.props.buttonColor,
            }]}
          >
            {this.props.children}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

}

CircleButtonItem.propTypes = {
  angle: PropTypes.number,
  radius: PropTypes.number,
  buttonColor: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.node.isRequired,
  startDegree: PropTypes.number,
  endDegree: PropTypes.number,
};

CircleButtonItem.defaultProps = {
  onPress: () => {},
  startDegree: 0,
  endDegree: 720
};

const styles = StyleSheet.create({
  circleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 2,
    backgroundColor: 'red',
    position: 'absolute',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,
  },
});
