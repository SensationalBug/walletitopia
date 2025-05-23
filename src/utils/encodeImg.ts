import { Image, ImageSourcePropType } from 'react-native';

export const imageURLencoder = async (imgURL: ImageSourcePropType) => {
    // convertimos la imagen a URI
    const imageUri = Image.resolveAssetSource(imgURL).uri;

    // Hacemos fetch de la imagen que previamente cargamos
    const response = await fetch(imageUri);
    // Leemos la respuesta como blob
    const blob = await response.blob();

    // Con FileReader extraemos la imagen convertida
    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
