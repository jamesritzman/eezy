import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@mui/material';


const handleBreedChange = (e, row, selectedBreeds, setSelectedBreeds) => {
    console.log("handleBreedChange event is: ", e);
    console.log("Breed control row is: " + row);

    // Make a (deep) copy of prior list, then update
    const priorSelectedBreeds = [...selectedBreeds];
    priorSelectedBreeds[row].breed = e.target.value;
    // Reset the subBreed since we have a new main breed
    priorSelectedBreeds[row].subBreed = '';
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


    
    const handleSubBreedChange = (e, row, selectedBreeds, setSelectedBreeds) => {
        console.log("Sub-Breed event: ", e);

        // Make a (deep) copy of prior list, then update
        const priorSelectedBreeds = [...selectedBreeds];
        priorSelectedBreeds[row].subBreed = e.target.value;
        setSelectedBreeds(priorSelectedBreeds);
    };

    const handleAddRowOfInputs = (selectedBreeds, setSelectedBreeds) => {
        const priorSelectedBreeds = [...selectedBreeds];
        priorSelectedBreeds.push({breed: '', subBreed: ''});
        setSelectedBreeds(priorSelectedBreeds);
    };


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
                    onChange={(e) => handleSubBreedChange(e, rowId, selectedBreeds, setSelectedBreeds)}
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
            <span># pics</span>
            <Button variant="text" onClick={() => handleAddRowOfInputs(selectedBreeds, setSelectedBreeds)}>+</Button>
        </div>
    )
}

export default InputGroup;
