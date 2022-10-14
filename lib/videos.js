import moviesData from '../data/youtubeQuery.json'

export const getVideos = () => {
    return moviesData.items.map((movie, idx) => {
        return {
            id: movie?.id?.movieId || idx,
            imgUrl: movie.snippet.thumbnails.high.url,
            title: movie.snippet.title,
            descrption: movie.snippet.description,
            publishTime: movie.snippet.publishTime,
        }
    })
}