import { SelectChangeEvent } from "@mui/material";
import { SelectedBreed } from '../../ImagesModal/ImagesModal';

export const handleBreedChange = async (e: SelectChangeEvent, row: number, selectedBreeds: SelectedBreed[], setSelectedBreeds: Function) => {
    // Make a (deep) copy of prior list, then update
    const priorSelectedBreeds = [...selectedBreeds];
    // Update the value of the chosen breed for the affected row of controls
    priorSelectedBreeds[row].breed = e.target.value;
    // Reset the subBreed since we have a new main breed
    priorSelectedBreeds[row].subBreed = '';
    setSelectedBreeds(priorSelectedBreeds);
};

export const handleSubBreedChange = async (e: SelectChangeEvent, row: number, selectedBreeds: SelectedBreed[], setSelectedBreeds: Function) => {
    // Make a (deep) copy of prior list, then update
    const priorSelectedBreeds = [...selectedBreeds];
    priorSelectedBreeds[row].subBreed = e.target.value;
    setSelectedBreeds(priorSelectedBreeds);
};

export const handleAddRowOfInputs = (selectedBreeds: SelectedBreed[], setSelectedBreeds: Function) => {
    const priorSelectedBreeds = [...selectedBreeds];
    priorSelectedBreeds.push({breed: '', subBreed: ''});
    setSelectedBreeds(priorSelectedBreeds);
};
