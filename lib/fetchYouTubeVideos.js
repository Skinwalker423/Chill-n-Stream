
const fetchYouTubeVideos = async(url) => {
    
  try{

    const BASE_URL = 'https://youtube.googleapis.com/youtube/v3'


    const res = await fetch(`${BASE_URL}/${url}&maxResults=10&key=${process.env.YOUTUBE_API_KEY}`, {
    Accept: 'application/json',
  })

  const data = await res.json();

  if(data?.error){
    console.error('Problem getting YT videos', err);
    return [];
  }

  if(!data.items) return [];

  return data?.items.map((movie, idx) => {
      return {
          id: movie.id?.videoId || idx,
          imgUrl: movie.snippet.thumbnails.high.url,
          title: movie.snippet.title,
          descrption: movie.snippet.description,
          publishTime: movie.snippet.publishTime || null,
      }
  })

  }catch(err){
    console.error('Problem getting YT videos', err);
    return []
  }
}

export const getVideosByQuery = (sectionQuery = 'Section') => {
    const url = `search?part=snippet&q=${sectionQuery}&type=video`;
    return fetchYouTubeVideos(url);
} 

export const getPopularVideos = (regionCode = 'US') => {
    const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=${regionCode}`;
    return fetchYouTubeVideos(url);
} 

export default fetchYouTubeVideos