import React from 'react'
import { getVideos } from './videos';

const fetchYouTubeVideos = async(sectionQuery = 'Section', limit = 10) => {
    
  try{
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${limit}&q=${sectionQuery}&type=video&key=${process.env.YOUTUBE_API_KEY}`, {
    Accept: 'application/json',
  })

  const data = await res.json();

  if(!data) return [];

  const disneyVideos = getVideos(data);
    return disneyVideos;
  }catch(err){
    console.error('Problem getting YT videos', err)
  }
}

export default fetchYouTubeVideos