import { useState } from 'react';
// 3rd party
import { useQuery } from '@tanstack/react-query';
import { Button } from '@mui/material';
// Internal
import InputGroup from './InputGroup/InputGroup';
// Styles
import './BreedPicker.scss';

const getBreeds = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const ImagesModal = (props) => {
    const { onClick } = props;

    return (
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'lightblue', zIndex: 20}} onClick={onClick}></div>
    )
};


const BreedPicker = () => {

    // STATE
    // User selections of all rows
    const [selectedBreeds, setSelectedBreeds] = useState([{breed: '', subBreed: ''}]);
    const [showModal, setShowModal] = useState(false);

    // Get raw breeds data
    const { isLoading, isError, data: rawBreedsData, error } = useQuery({
        queryKey: ['breedsList'],
        queryFn: getBreeds
    });

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }


    return (
        <>
            <div className='breed-picker-container'>
                {
                    selectedBreeds.map((selectedBreedInfo, idx) => {
                        return (
                            <InputGroup
                                selectedBreedInfo={selectedBreedInfo}
                                allBreeds={rawBreedsData.message}
                                rowId={idx}
                                isLastRow={(idx === selectedBreeds.length - 1)}
                                selectedBreeds={selectedBreeds}
                                setSelectedBreeds={setSelectedBreeds}
                                key={idx}
                            />
                        )
                    })
                }
            </div>
            <Button onClick={() => {setShowModal(true)}} variant="outlined">Display Images</Button>
            { showModal && <ImagesModal onClick={() => {setShowModal(false)}} /> }
            {/* <p>{JSON.stringify(rawBreedsData.message)}</p> */}
        </>
    )
}

/*
            <p>{JSON.stringify(rawBreedsData.message)}</p>
            <ol>
                {
                    Object.keys(rawBreedsData.message).map((primaryBreed) => {
                        return (
                            <li key={primaryBreed}>
                                {primaryBreed}
                                {
                                    rawBreedsData.message[primaryBreed].length > 0 && (
                                        <ul>
                                            {
                                                rawBreedsData.message[primaryBreed].map((subBreed) => {
                                                    return <li key={subBreed}>{subBreed}</li>
                                                })
                                            }
                                        </ul>
                                    )
                                }
                            </li>
                        )
                    })
                }
            </ol>
*/

export default BreedPicker;
