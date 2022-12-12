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

const handleDisplayImagesButtonClick = () => {
    console.log("display images...");
};



const BreedPicker = () => {

    // STATE
    // User selections of all rows
    const [selectedBreeds, setSelectedBreeds] = useState([{breed: '', subBreed: ''}]);

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
            <Button onClick={handleDisplayImagesButtonClick} variant="outlined">Display Images</Button>
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
