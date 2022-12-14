import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import styles from './[id].module.css'
import Modal from 'react-modal';
Modal.setAppElement('#__next');
import clsx from 'classnames';
import { getVideoById } from '../../lib/fetchYouTubeVideos';
import Like from '../../components/icons/like-icon';
import DisLike from '../../components/icons/dislike-icon';

export async function getStaticProps({params}) {
  
    const vidId = params.id;
    const videoList = await getVideoById(vidId);
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

    revalidate: 60, // In seconds
  }
}


export async function getStaticPaths() {

  const listofBannerVids = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];

  const paths = listofBannerVids.map((vidId) => ({
    params: { id: vidId },
  }))

  return { paths, fallback: 'blocking' }
}



const Video = ({video}) => {

    const [likeBtnSelected, setLikeBtnSelected] = useState(false);
    const [disLikeBtnSelected, setDisLikeBtnSelected] = useState(false);
    const { title, publishTime, description, channelTitle, statistics: {viewCount} } = video;

    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    const videoId = router.query.id;
    const favoritedValue = !likeBtnSelected ? 1 : 0;

    const updatedUserStats = async(favorited = favoritedValue) => {
    const stats = {
        videoId,
        favorited,
    }

    try{
        const result = await fetch(`/api/stats`,
        {
            method: "POST",
            headers: {
                'conent-type': "application/json",
            },
            body: JSON.stringify(stats)
        }
        );
        const returnedData = await result.json();
        return returnedData;
    }catch(err){
        console.error('something went wrong posting stats', err);
    }
  }
  

  const handlelikeBtn = async() => {
    console.log('liked');
    setLikeBtnSelected((bool) => !bool);
    setDisLikeBtnSelected(false);
    return await updatedUserStats();
  }

  const handleDisLikeBtn = async() => {
    console.log('downvoted');
    setDisLikeBtnSelected((bool) => !bool);
    setLikeBtnSelected(false);
    return await updatedUserStats(0);
  }


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

  useEffect(() => {
    const userStatsFavorited = async() => {
        try{
            const result = await fetch(`/api/stats?videoId=${videoId}`);
            const returnedData = await result.json();
            console.log({returnedData});
            if(returnedData === 1){
                setLikeBtnSelected(true);
            }
            return returnedData;
        }catch(err){
            console.error('something went wrong getting favorited stats', err);
        }
    }
    userStatsFavorited();
  }, [videoId])

  

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
                    src={`https://www.youtube.com/embed/${videoId}?controls=0`}
                    frameBorder="0"
                    className={styles.videoPlayer}
                    
                ></iframe>
                <div className={styles.likeDislikeBtnWrapper}>
                    <button onClick={handlelikeBtn} type='button'>
                        <div className={styles.btnWrapper}>
                            <Like selected={likeBtnSelected}  />
                        </div>
                    </button>
                    <button onClick={handleDisLikeBtn} type='button'>
                        <div className={styles.btnWrapper}>
                            <DisLike selected={disLikeBtnSelected} />
                        </div>
                    </button>
                </div>
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