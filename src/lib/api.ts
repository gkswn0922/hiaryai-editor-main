export class API {
  public static uploadImage = async (file?: File) => {
    await new Promise(r => setTimeout(r, 500))

    // For now, return a placeholder image URL that actually exists
    // In a real application, you would upload the file to your server
    if (file) {
      // Create a local object URL for the uploaded file
      return URL.createObjectURL(file)
    }

    // Fallback to a working placeholder image
    return 'https://via.placeholder.com/800x600/f0f0f0/666666?text=Uploaded+Image'
  }
}

export default API
