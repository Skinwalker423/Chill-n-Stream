import React, {useState} from 'react';
import { useRouter } from 'next/router';
import styles from './[id].module.css'
import Modal from 'react-modal';
Modal.setAppElement('#__next');


const Video = () => {

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
                    height="75%"
                    src={`https://www.youtube.com/embed/${router.query.id}?autoplay=0&controls=0`}
                    frameborder="0"
                    className={styles.videoPlayer}
                    
                ></iframe>
                
                <div className={styles.detailsContainer}>
                    <div>
                        <h2>Title</h2>
                        <p>left side description</p>
                    </div>
                    <div>
                        <h2>Title</h2>
                        <p>right side description</p>
                    </div>
                </div>
            </Modal>
            
        </div>
    )
}

export default Video;