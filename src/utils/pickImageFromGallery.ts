// import { ImageSourcePropType } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export const pickImageFromGallery = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: true,
                maxHeight: 1024,
                maxWidth: 1024,
            },
            async (response: any) => {
                if (response.didCancel) {
                    reject('User cancelled image picker');
                } else {
                    resolve(response.assets[0].base64);
                }
            },
        );
    });
};
