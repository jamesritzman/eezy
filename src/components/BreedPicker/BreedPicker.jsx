import { useState } from 'React';
import { useQuery } from '@tanstack/react-query';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import './BreedPicker.scss';

const getBreeds = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};


const BreedPicker = (props) => {

    // TODO: use state management instead of this placeholder state
    const [selectedBreeds, setSelectedBreeds] = useState([{breed: null, subBreed: null}]);

    // TODO: build out this temp handler function
    const handleBreedChange = (e) => {
        console.log("handleBreedChange event is: ", e);
        setSelectedBreeds([{breed: e.target.value, subBreed: null}]);
    };

    const handleSubBreedChange = (e) => {
        console.log("Sub-Breed event: ", e);
        setSelectedBreeds(prev => {const newData = prev; newData[0].subBreed = e.target.value; console.log("new: ", newData); return newData});
    };

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

    const primaryBreeds = Object.keys(rawBreedsData.message);

    return (
        <>
        <div className='breed-picker-container'>
            <div className='breed-picker-row'>
                <FormControl fullWidth>
                    <InputLabel id='breed-select-label'>Breed</InputLabel>
                    <Select
                        labelId='breed-select-label'
                        id='breed-select'
                        value={selectedBreeds[0].breed}
                        label='Breed'
                        onChange={handleBreedChange}
                    >
                        {
                            Object.keys(rawBreedsData.message).map((primaryBreed) => {
                                return <MenuItem value={primaryBreed}>{primaryBreed}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id='sub-breed-select-label'>Sub-Breed</InputLabel>
                    <Select
                        labelId='sub-breed-select-label'
                        id='sub-breed-select'
                        value={selectedBreeds[0].subBreed || ''}
                        label='Sub-Breed'
                        onChange={handleSubBreedChange}
                    >
                        {
                            rawBreedsData.message[selectedBreeds[0].breed]?.length 
                            ? rawBreedsData.message[selectedBreeds[0].breed].map((subBreed, idx, arr) => {
                                return <MenuItem value={subBreed}>{subBreed}</MenuItem>
                            })
                            : <MenuItem value='n/a'>n/a</MenuItem>
                        }
                    </Select>
                </FormControl>
                <p>#</p>
                <p>+</p>
            </div>
            <div className='breed-picker-row'>
                <FormControl fullWidth>
                    <InputLabel id='breed-select-label'>Breed</InputLabel>
                    <Select
                        labelId='breed-select-label'
                        id='breed-select'
                        value={selectedBreeds[0].breed}
                        label='Breed'
                        onChange={handleBreedChange}
                    >
                        {
                            Object.keys(rawBreedsData.message).map((primaryBreed) => {
                                return <MenuItem value={primaryBreed}>{primaryBreed}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id='sub-breed-select-label'>Sub-Breed</InputLabel>
                    <Select
                        labelId='sub-breed-select-label'
                        id='sub-breed-select'
                        value={selectedBreeds[0].subBreed || ''}
                        label='Sub-Breed'
                        onChange={handleSubBreedChange}
                    >
                        {
                            rawBreedsData.message[selectedBreeds[0].breed]?.length 
                            ? rawBreedsData.message[selectedBreeds[0].breed].map((subBreed, idx, arr) => {
                                return <MenuItem value={subBreed}>{subBreed}</MenuItem>
                            })
                            : <MenuItem value='n/a'>n/a</MenuItem>
                        }
                    </Select>
                </FormControl>
                <p>#</p>
                <p>+</p>
            </div>
        </div>
        <p>{JSON.stringify(rawBreedsData.message)}</p>
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
