import React, { Component } from 'react';
import { 
  Alert, 
  Image, 
  Platform, 
  StyleSheet, 
  Text, 
  TouchableHighlight, 
  View 
} from 'react-native';
import { useState } from 'react/cjs/react.production.min';

export default function index() {
  const [checked, setChecked] = useState(null);
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}