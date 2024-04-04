import React from 'react';
import { Button, View } from 'react-native';

interface ButtonComponentProps {
  onPress: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ onPress }) => {
  return (
    <View style={{ margin: 20 }}>
      <Button title="Chamar Serviço" onPress={onPress} />
    </View>
  );
};

export default ButtonComponent;
