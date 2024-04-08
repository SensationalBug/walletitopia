export const toDataURL = (img: RequestInfo) =>
    fetch(img)
        .then(response => response.blob())
        .then(
            blob =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                }),
        );
