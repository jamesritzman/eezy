import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import {
    handleBreedChange,
    handleSubBreedChange,
    handleAddRowOfInputs,
} from './InputGroupHelpers';
import { getImagesListByBreed } from '../BreedPickerHelpers';


type InputGroupPropTypes = {
    selectedBreedInfo: {breed: string, subBreed: string}
    allBreeds: {[key: string]: string[]},
    rowId: number,
    isLastRow: boolean,
    selectedBreeds: {breed: string, subBreed: string}[],
    setSelectedBreeds: Function
}
const InputGroup = (props: InputGroupPropTypes) => {
    const {
        selectedBreedInfo,
        allBreeds,
        rowId,
        isLastRow,
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
                    onChange={(e) => handleBreedChange(e, rowId, selectedBreeds, setSelectedBreeds)}
                >
                    {
                        Object.keys(allBreeds).map((primaryBreed) => {
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
                    onChange={(e) => handleSubBreedChange(e, rowId, selectedBreeds, setSelectedBreeds)}
                >
                    {
                        allBreeds[selectedBreedInfo.breed]?.length 
                        ? allBreeds[selectedBreedInfo.breed].map((subBreed) => {
                            // TODO: add an "All" option as well
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
            { isLastRow && <Button variant="text" onClick={() => handleAddRowOfInputs(selectedBreeds, setSelectedBreeds)}>+</Button> }
        </div>
    )
}

export default InputGroup;
