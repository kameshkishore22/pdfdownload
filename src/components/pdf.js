import React from 'react';
import {
  View,
  Alert,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {pdfString} from '../constants/constant';

const PdfDownload = () => {
  const pdfOpenFile = 'https://www.clickdimensions.com/links/TestPDFfile.pdf';

  const downloadFile = ({basedata, filename}) => {
    try {
      const {dirs} = RNFetchBlob.fs;
      const dirToSave =
        Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
      const configfb = {
        fileCache: true,
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: 'Patient History',
        path: `${dirToSave}/${filename}`,
      };
      RNFetchBlob.fs
        .writeFile(configfb.path, basedata, 'base64')
        .then(() => {
          RNFetchBlob.android.addCompleteDownload({
            title: filename,
            description: 'Download Complete',
            mime: 'application/pdf',
            path: configfb.path,
            showNotification: true,
          });
          console.log(`wrote file ${configfb.path}`);
        })
        .catch(error => console.log(error));
    } catch (e) {
      console.log(e);
    }
  };

  const checkPermission = async ({filename, basedata}) => {
    if (Platform.OS === 'ios') {
      downloadFile({filename, basedata});
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'Need to Access to ypur storage',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadFile({filename, basedata});
          console.log('Storage Permission granted');
        } else {
          Alert.alert('Storage Permission Not granted');
        }
      } catch (err) {
        console.log('some error' + err);
      }
    }
  };

  const download = () => {
    // const buf = Buffer.from('abc');
    // const buffer = buf.toString('base64');
    let excelname = 'sample.xlsx';
    let exceldata = pdfString;
    checkPermission({filename: excelname, basedata: exceldata});
  };

  const handleOpenPdf = async () => {
    await Linking.openURL(pdfOpenFile);
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          height: 50,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}
        onPress={() => download()}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
          Download Pdf
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleOpenPdf()}
        style={{
          backgroundColor: 'blue',
          height: 50,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
          Open Pdf
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default PdfDownload;
