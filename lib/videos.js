import moviesData from '../data/youtubeQuery.json'

export const getVideos = () => {
    return moviesData.items.map((movie) => {
        return {
            id: movie?.id?.movieId,
            imgUrl: movie.snippet.thumbnails.high.url,
            title: movie.snippet.title,
            descrption: movie.snippet.description,
            publishTime: movie.snippet.publishTime,
        }
    })
}