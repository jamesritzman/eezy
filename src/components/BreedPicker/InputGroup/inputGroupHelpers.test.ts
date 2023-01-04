import { SelectChangeEvent } from '@mui/material';
import { vi, test, expect } from 'vitest';

import {
    handleBreedChange,
    handleSubBreedChange,
    handleAddRowOfInputs
} from './InputGroupHelpers';


test("handleBreedChange", () => {
    const e = {target: {value: "foo"}} as SelectChangeEvent;
    const row = 1;
    const selectedBreeds = [{breed: "a", subBreed: "1"}, {breed: "b", subBreed: "2"}];
    const setSelectedBreeds = vi.fn();

    handleBreedChange(e, row, selectedBreeds, setSelectedBreeds);
    expect(setSelectedBreeds).toBeCalledWith([{breed: "a", subBreed: "1"}, {breed: "foo", subBreed: ""}]);
});

test("handleSubBreedChange", () => {
    const e = {target: {value: "foo"}} as SelectChangeEvent;
    const row = 1;
    const selectedBreeds = [{breed: "a", subBreed: "1"}, {breed: "b", subBreed: "2"}];
    const setSelectedBreeds = vi.fn();

    handleSubBreedChange(e, row, selectedBreeds, setSelectedBreeds);
    expect(setSelectedBreeds).toBeCalledWith([{breed: "a", subBreed: "1"}, {breed: "b", subBreed: "foo"}]);
});

test("handleAddRowOfInputs", () => {
    const selectedBreeds = [{breed: "a", subBreed: "1"}];
    const setSelectedBreeds = vi.fn();

    handleAddRowOfInputs(selectedBreeds, setSelectedBreeds);
    expect(setSelectedBreeds).toBeCalledWith([{breed: "a", subBreed: "1"},{breed: "", subBreed: ""}]);
});
