import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';


const getImagesListByBreed = async (selectedBreed, selectedSubBreed = null) => {
    if (selectedBreed === '') return {message: []}
    const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/${selectedSubBreed ? selectedSubBreed + '/' : ''}images`);
    if (!response.ok) {
        throw new Error('Network response for fetching images by breed was not ok');
    }
    return response.json();
};

const handleBreedChange = async (e, row, selectedBreeds, setSelectedBreeds) => {
    // Make a (deep) copy of prior list, then update
    const priorSelectedBreeds = [...selectedBreeds];
    // Update the value of the chosen breed for the affected row of controls
    priorSelectedBreeds[row].breed = e.target.value;
    // Reset the subBreed since we have a new main breed
    priorSelectedBreeds[row].subBreed = '';
    setSelectedBreeds(priorSelectedBreeds);
};

const handleSubBreedChange = async (e, row, selectedBreeds, setSelectedBreeds) => {
    // Make a (deep) copy of prior list, then update
    const priorSelectedBreeds = [...selectedBreeds];
    priorSelectedBreeds[row].subBreed = e.target.value;
    setSelectedBreeds(priorSelectedBreeds);
};

const handleAddRowOfInputs = (selectedBreeds, setSelectedBreeds) => {
    const priorSelectedBreeds = [...selectedBreeds];
    priorSelectedBreeds.push({breed: '', subBreed: '', imageCount: 0});
    setSelectedBreeds(priorSelectedBreeds);
};


const InputGroup = (props) => {
    const {
        selectedBreedInfo,
        breeds,
        rowId,
        selectedBreeds,
        setSelectedBreeds,
    } = props;


    const { isLoading, isError, data: breedImagesList, error } = useQuery({
        queryKey: ['getImageList', selectedBreedInfo.breed, selectedBreedInfo.subBreed],
        queryFn: () => getImagesListByBreed(selectedBreedInfo.breed, selectedBreedInfo.subBreed)
    });

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }


    return (
        <div className='breed-picker-row'>
            <FormControl fullWidth>
                <InputLabel id='breed-select-label'>Breed</InputLabel>
                <Select
                    labelId='breed-select-label'
                    id='breed-select'
                    value={selectedBreedInfo.breed}
                    label='Breed'
                    onChange={(e) => handleBreedChange(e, rowId, selectedBreeds, setSelectedBreeds, getImagesListByBreed)}
                >
                    {
                        Object.keys(breeds).map((primaryBreed) => {
                            return (
                                <MenuItem value={primaryBreed} key={primaryBreed}>
                                    {primaryBreed}
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id='sub-breed-select-label'>Sub-Breed</InputLabel>
                <Select
                    labelId='sub-breed-select-label'
                    id='sub-breed-select'
                    value={selectedBreedInfo.subBreed}
                    label='Sub-Breed'
                    onChange={(e) => handleSubBreedChange(e, rowId, selectedBreeds, setSelectedBreeds, getImagesListByBreed)}
                >
                    {
                        breeds[selectedBreedInfo.breed]?.length 
                        ? breeds[selectedBreedInfo.breed].map((subBreed) => {
                            return (
                                <MenuItem value={subBreed} key={subBreed}>
                                    {subBreed}
                                </MenuItem>
                            )
                        })
                        : <MenuItem value='n/a' disabled>n/a</MenuItem>
                    }
                </Select>
            </FormControl>
            <span>{`${breedImagesList.message.length} pics`}</span>
            <Button variant="text" onClick={() => handleAddRowOfInputs(selectedBreeds, setSelectedBreeds)}>+</Button>
        </div>
    )
}

export default InputGroup;
