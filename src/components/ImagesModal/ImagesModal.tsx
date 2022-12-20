import { useQueries } from '@tanstack/react-query';
import { getImagesListByBreed } from '../BreedPicker/BreedPickerHelpers';
import './ImagesModal.scss';


const ImagesModal = (props) => {
    const { onClick, selectedBreeds } = props;

    const imageListQueries = useQueries({
        queries: selectedBreeds.map((selectedBreedInfo) => {
            return {
                queryKey: ['getImageList', selectedBreedInfo.breed, selectedBreedInfo.subBreed],
                queryFn: () => getImagesListByBreed(selectedBreedInfo.breed, selectedBreedInfo.subBreed)
            }
        })
    });

    // De-dupe the queries result in case the user selected the same combination of breed/sub-breed more than once,
    //  or in case the same image appears in both lists
    const imageUrlsSet = new Set();
    imageListQueries.forEach((imageListQueryResult) => {
        if (imageListQueryResult?.data?.message?.length) {
            imageListQueryResult.data.message.forEach((imageUrl) => {
                imageUrlsSet.add(imageUrl);
            });
        }
    });
    const imageUrlsArray = [...imageUrlsSet];

    return (
        <div
            className="images-modal-container"
            onClick={onClick}
        >
            <div className="images-modal-content-wrapper">
                {
                    imageUrlsArray.map((imageUrl) => {
                        return <img src={imageUrl} className='dog-image' alt='dog' key={imageUrl} />
                    })
                }
            </div>
        </div>
    )
};

export default ImagesModal;
