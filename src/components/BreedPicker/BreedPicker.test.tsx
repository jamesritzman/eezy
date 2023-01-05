import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BreedPicker from './BreedPicker';

// react-query client
const queryClient = new QueryClient();

describe("BreedPicker component", () => {
    test("matches snapshot", () => {
        const output = render(
            <QueryClientProvider client={queryClient}>
                <BreedPicker />
            </QueryClientProvider>
        );

        expect(output).toMatchSnapshot();
    })
});
