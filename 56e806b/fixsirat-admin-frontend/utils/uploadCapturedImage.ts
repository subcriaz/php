export default async function uploadCapturedImage (image: string): Promise<string> {
  const config = useRuntimeConfig();
  const { data: imgURL, error } = await useFetch(
    config.public.apiBase + '/images/upload',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        file: image
      })
    }
  );
  if (error.value) {
    throw new Error('Error while uploading image', error.value);
  }
  const { url } = imgURL.value as any;
  return url;
}
