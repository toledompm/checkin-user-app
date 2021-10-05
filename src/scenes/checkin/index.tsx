import { mainButton } from 'components/buttons';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { colors, mainSceneStyle } from 'styles';
import { getCheckinToken } from 'utils/api';

function checkin(url: string, userToken: string): JSX.Element {
  const [checkinTokenQrCode, setCheckinTokenQrCode] = React.useState('');

  const handleClick = async () => {
    const newCheckinToken = await getCheckinToken(url, userToken);
    setCheckinTokenQrCode(newCheckinToken.data.refreshToken);
  };

  const buildQrCode = () => {
    return checkinTokenQrCode ? (
      <QRCode
        value={checkinTokenQrCode}
        size={400}
        color={colors.contrast}
        backgroundColor={colors.main}
      />
    ) : null;
  };

  return (
    <SafeAreaView style={mainSceneStyle.container}>
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'center',
          marginTop: 150,
        }}
      >
        {buildQrCode()}
      </View>
      <View style={{ flex: 1, alignSelf: 'stretch' }}>
        {mainButton('check-in', handleClick, { container: { marginTop: 100 } })}
      </View>
    </SafeAreaView>
  );
}

export default checkin;
