import styles from './[id].module.css'

const Video = () => {
    return (
        <div className={styles.container}>
            <div className={styles.videoContainer}>
                <div className={styles.videoWrapper}>
                    <h1>Video Player</h1>
                </div>
                <div className={styles.detailsContainer}>
                    <div>
                        <h3>Left side details</h3>
                        <p>description</p>
                    </div>
                    <div>
                        <h3>Right side details</h3>
                        <p>description</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video;