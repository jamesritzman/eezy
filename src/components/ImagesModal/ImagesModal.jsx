import './ImagesModal.scss';

const ImagesModal = (props) => {
    const { onClick } = props;

    return (
        <div
            className="images-modal-container"
            onClick={onClick}
        >
            <div className="images-modal-content-wrapper">
                Images here...
            </div>
        </div>
    )
};

export default ImagesModal;
