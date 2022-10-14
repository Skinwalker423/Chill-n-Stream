import { getVideos } from "../../lib/videos";

const fetchVideos = (req, res) => {

    console.log(req.query);
    const disnyVids = getVideos();

  return (
    res.json(disnyVids)
  )
}

export default fetchVideos