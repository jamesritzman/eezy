import { SelectChangeEvent } from '@mui/material';
import { vi, expect } from 'vitest';

import {
    handleBreedChange,
    handleSubBreedChange,
    handleAddRowOfInputs
} from './InputGroupHelpers';

describe("Input Group Helper Functions", () => {
    it("handleBreedChange called with new breed value", () => {
        const e = {target: {value: "foo"}} as SelectChangeEvent;
        const row = 1;
        const selectedBreeds = [{breed: "a", subBreed: "1"}, {breed: "b", subBreed: "2"}];
        const setSelectedBreeds = vi.fn();
    
        handleBreedChange(e, row, selectedBreeds, setSelectedBreeds);
        expect(setSelectedBreeds).toBeCalledWith([{breed: "a", subBreed: "1"}, {breed: "foo", subBreed: ""}]);
    });
    
    it("handleSubBreedChange called with new subBreed value", () => {
        const e = {target: {value: "foo"}} as SelectChangeEvent;
        const row = 1;
        const selectedBreeds = [{breed: "a", subBreed: "1"}, {breed: "b", subBreed: "2"}];
        const setSelectedBreeds = vi.fn();
    
        handleSubBreedChange(e, row, selectedBreeds, setSelectedBreeds);
        expect(setSelectedBreeds).toBeCalledWith([{breed: "a", subBreed: "1"}, {breed: "b", subBreed: "foo"}]);
    });
    
    it("handleAddRowOfInputs called with new 'empty' breed selection", () => {
        const selectedBreeds = [{breed: "a", subBreed: "1"}];
        const setSelectedBreeds = vi.fn();
    
        handleAddRowOfInputs(selectedBreeds, setSelectedBreeds);
        expect(setSelectedBreeds).toBeCalledWith([{breed: "a", subBreed: "1"},{breed: "", subBreed: ""}]);
    });
});
