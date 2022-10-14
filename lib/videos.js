
export const getVideos = (moviesData) => {
    return moviesData.items.map((movie, idx) => {
        return {
            id: movie.id.videoId || idx,
            imgUrl: movie.snippet.thumbnails.high.url,
            title: movie.snippet.title,
            descrption: movie.snippet.description,
            publishTime: movie.snippet.publishTime,
        }
    })
}