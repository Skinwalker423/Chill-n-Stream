import React, {useState} from 'react';
import { useRouter } from 'next/router';
import styles from './[id].module.css'
import Modal from 'react-modal';
Modal.setAppElement('#__next');
import clsx from 'classnames';
import { getVideoById } from '../../lib/fetchYouTubeVideos';

export async function getStaticProps({params}) {
  
    const vidId = params.id;
    const videoList = await getVideoById(vidId);
    console.log({videoList});
    // const videoList = {}
    const videoBackup = {
        title: "Hi cute dog",
        publishTime: "1990-01-01",
        description: "A big red dog that is super cute, can he get any bigger?",
        channelTitle: "Paramount Pictures",
        statistics: {
            viewCount: 10000
        },
    };

  return {
    props: {
      video: videoList.length > 0 ? videoList[0] : videoBackup ,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60, // In seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
//   const res = await fetch('https://.../posts')
//   const posts = await res.json()
const listofBannerVids = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];

  // Get the paths we want to pre-render based on posts
  const paths = listofBannerVids.map((vidId) => ({
    params: { id: vidId },
  }))
  console.log(paths);

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}



const Video = ({video}) => {


    const { title, publishTime, description, channelTitle, statistics: {viewCount} } = video;

    const router = useRouter();

    let subtitle;
    const [isOpen, setIsOpen] = useState(true);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        router.back();
        setIsOpen(false);
        // router.push('/');
  }

    return (
        <div className={styles.container}>
            <Modal
                isOpen={isOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Chill n stream the movie"
                className={styles.modal}
                overlayClassName={styles.overlay}
            >
                
                
            
                <iframe 
                    id="ytplayer" 
                    type="text/html" 
                    width="100%" 
                    height="360"
                    src={`https://www.youtube.com/embed/${router.query.id}?autoplay=0&controls=0`}
                    frameBorder="0"
                    className={styles.videoPlayer}
                    
                ></iframe>
                <div className={styles.modalBody}>
                    <div className={styles.modalBodyContent}>
                        <div className={styles.col1}>
                            <p className={styles.publishTime}>{publishTime}</p>
                            <p className={styles.title}>{title}</p>
                            <p className={styles.description}>{description}</p>
                        </div>
                        <div className={styles.col2}>
                            <p className={clsx(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>Cast: </span>
                                <span className={styles.channelTitle}>{channelTitle}</span>
                            </p>
                            <p className={clsx(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>View Count: </span>
                                <span className={styles.channelTitle}>{viewCount}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
            
        </div>
    )
}

export default Video;