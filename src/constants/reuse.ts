// The atob() method of the Window interface decodes a string of data which has been encoded using Base64 encoding. You can use the Window.btoa() method to encode and transmit data which may otherwise cause communication problems, then transmit it and use the atob() method to decode the data again. 


export const  base64ToFile=(base64String:string, fileName:string) =>{
    // Decode the base64 string
    const byteString = atob(base64String);
  
    // Create an array buffer
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
  
    // Assign decoded bytes to uint8Array
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
  
    // Create a Blob from the uint8Array
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });
  
    // Create a File from the Blob
    const file = new File([blob], fileName, { type: 'image/jpeg' });
  
    return file;
  }
  

  
