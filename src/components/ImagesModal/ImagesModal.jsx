import './ImagesModal.scss';

const ImagesModal = (props) => {
    const { onClick, selectedBreeds } = props;

    return (
        <div
            className="images-modal-container"
            onClick={onClick}
        >
            <div className="images-modal-content-wrapper">
                {
                    selectedBreeds.map((breedInfo, idx) => {
                        return <p key={idx}>{breedInfo.breed} - {breedInfo.subBreed || 'none'}</p>
                    })
                }
            </div>
        </div>
    )
};

export default ImagesModal;
