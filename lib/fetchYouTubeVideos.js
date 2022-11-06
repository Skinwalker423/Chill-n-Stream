import testData from '../data/youtubeQuery.json'
import { fetchWatchedVideosByUser } from './db/hasura'

export const getVids = async(url) => {
    const BASE_URL = 'https://youtube.googleapis.com/youtube/v3'

    const res = await fetch(`${BASE_URL}/${url}&maxResults=10&key=${process.env.YOUTUBE_API_KEY}`, {
    Accept: 'application/json',
  })

  return await res.json();
}

export const fetchYouTubeVideos = async(url) => {
    
  try{
  const isProductionMode = process.env.NODE_ENV === 'production';
  
  const data = isProductionMode ? await getVids(url) : testData;

  if(data?.error){
    console.error('Problem getting YT videos', data);
    return [];
  }

  if(!data.items) return [];

  return data?.items.map((movie) => {

      const {snippet, id, statistics} = movie;

      return {
          id: id?.videoId || movie.id,
          imgUrl: `https://i.ytimg.com/vi/${id.videoId}/mqdefault.jpg`,
          title: snippet.title,
          description: snippet.description,
          publishTime: snippet.publishTime || null,
          statistics: statistics ? statistics : {viewCount: 0},
          channelTitle: snippet.channelTitle,
      }
  })

  }catch(err){
    console.error('Problem getting YT videos', err);
    return []
  }
}

export const getVideosByQuery = (sectionQuery = 'trending') => {
    const url = `search?part=snippet&q=${sectionQuery}&type=video`;
    return fetchYouTubeVideos(url);
} 

export const getPopularVideos = (regionCode = 'US') => {
    const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=${regionCode}`;
    return fetchYouTubeVideos(url);
}

export const getVideoById = (id) => {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`;
  return fetchYouTubeVideos(url);
}

export const getWatchedVids = async(token, issuer) => {
  try{
    const watchedVideos = await fetchWatchedVideosByUser(token, issuer);
    
    if(watchedVideos){
        const mapWatchedVids = watchedVideos.map((movie) => {
            return {
                id: movie.videoId,
                imgUrl: `https://img.youtube.com/vi/${movie.videoId}/0.jpg`,
            }
        })
        return mapWatchedVids;
    } else {
      console.log("no vids found")
    }
  }catch(err){
    console.error('something went wrong fetching watched vids', err);
  }
}
