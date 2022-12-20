export const handleBreedChange = async (e, row, selectedBreeds, setSelectedBreeds) => {
    // Make a (deep) copy of prior list, then update
    const priorSelectedBreeds = [...selectedBreeds];
    // Update the value of the chosen breed for the affected row of controls
    priorSelectedBreeds[row].breed = e.target.value;
    // Reset the subBreed since we have a new main breed
    priorSelectedBreeds[row].subBreed = '';
    setSelectedBreeds(priorSelectedBreeds);
};

export const handleSubBreedChange = async (e, row, selectedBreeds, setSelectedBreeds) => {
    // Make a (deep) copy of prior list, then update
    const priorSelectedBreeds = [...selectedBreeds];
    priorSelectedBreeds[row].subBreed = e.target.value;
    setSelectedBreeds(priorSelectedBreeds);
};

export const handleAddRowOfInputs = (selectedBreeds, setSelectedBreeds) => {
    const priorSelectedBreeds = [...selectedBreeds];
    priorSelectedBreeds.push({breed: '', subBreed: '', imageCount: 0});
    setSelectedBreeds(priorSelectedBreeds);
};
