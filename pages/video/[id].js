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
        subtitle.style.color = '#f00';
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
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>
                
                <div>I am a modal</div>
            </Modal>
            
        </div>
    )
}

export default Video;