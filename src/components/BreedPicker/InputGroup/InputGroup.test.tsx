import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// react-query client
const queryClient = new QueryClient();

import InputGroup from './InputGroup';

describe("InputGroup Component", () => {
    it("matches snapshot", () => {
        const selectedBreedInfo = {breed: "", subBreed: ""};
        const allBreeds = {"foo": ["bar", "baz"]};
        const rowId = 0;
        const isLastRow = true;
        const selectedBreeds = [{breed: "", subBreed: ""}];
        const setSelectedBreeds = vi.fn();

        const output = render(
            <QueryClientProvider client={queryClient}>
                <InputGroup
                    selectedBreedInfo={selectedBreedInfo}
                    allBreeds={allBreeds}
                    rowId={rowId}
                    isLastRow={isLastRow}
                    selectedBreeds={selectedBreeds}
                    setSelectedBreeds={setSelectedBreeds}
                />
            </QueryClientProvider>
        )

        expect(output).toMatchSnapshot();
    })
})
