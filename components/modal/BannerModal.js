import { useState } from 'react';
import styles from './BannerModal.module.css'
import { useRouter } from 'next/router';
import Modal from 'react-modal';
Modal.setAppElement('#__next');
import clsx from 'classnames';


  const BannerModal = ({videoId, isOpen, setIsOpen}) => {

    const [isOpen, setIsOpen] = useState(false);

    const videoBackup = {
        title: "Hi cute dog",
        publishTime: "1990-01-01",
        description: "A big red dog that is super cute, can he get any bigger?",
        channelTitle: "Paramount Pictures",
        statistics: {
            viewCount: 10000
        },
    };

    const { title, publishTime, description, channelTitle, statistics: {viewCount} } = videoBackup;

    const router = useRouter();

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
            height="75%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=0`}
            frameborder="0"
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
    )
}

export default BannerModal;