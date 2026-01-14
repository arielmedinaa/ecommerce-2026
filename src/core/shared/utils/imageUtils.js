
export const removeBackgroundImage = async (image) => {
  try {
    if (!import.meta.env.VITE_REMOVEBG_API_KEY) {
      throw new Error('Remove.bg API key is not configured. Please set VITE_REMOVEBG_API_KEY in your environment variables.');
    }

    const formData = new FormData();
    let imageBlob;
    if (image instanceof File || image instanceof Blob) {
      imageBlob = image;
    } else if (typeof image === 'string') {
      const response = await fetch(image, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      imageBlob = await response.blob();
    } else {
      throw new Error('Invalid image input. Expected File, Blob, or URL string.');
    }
    if (!imageBlob.type.includes('webp')) {
      const webpBlob = await convertToWebP(imageBlob);
      formData.append('image_file', webpBlob, 'image.webp');
    } else {
      formData.append('image_file', imageBlob);
    }

    formData.append('size', 'auto');
    formData.append('format', 'png');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': import.meta.env.VITE_REMOVEBG_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.errors?.[0]?.title || `Failed to remove background: ${response.statusText}`);
    }

    const pngBlob = await response.blob();
    return await convertToWebP(pngBlob);
  } catch (error) {
    throw error;
  }
};

const convertToWebP = (blob) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const url = URL.createObjectURL(blob);
    
    img.onload = () => {
      try {
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        ctx.drawImage(img, 0, 0);
        
        const dataUrl = canvas.toDataURL('image/webp', 0.85);
        const base64Data = dataUrl.split(',')[1];
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        const webpBlob = new Blob([bytes], { type: 'image/webp' });
        URL.revokeObjectURL(url);
        resolve(webpBlob);
      } catch (error) {
        URL.revokeObjectURL(url);
        reject(new Error(`WebP conversion failed: ${error.message}`));
      }
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for WebP conversion'));
    };
    
    img.crossOrigin = 'anonymous';
    img.src = url;
  });
};

export const blobToDataURL = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const getImageUrl = (imageName, directory = '') => {
  const cleanName = imageName.endsWith('.webp') ? imageName.slice(0, -5) : imageName;

  console.log(cleanName);
  console.log(directory);
  
  try {
    return new URL(`../../../assets/${directory}${cleanName}.webp`, import.meta.url).href;
  } catch (error) {
    console.error(`Image not found: ${cleanName}.webp ${error}`);
    return '';
  }
};