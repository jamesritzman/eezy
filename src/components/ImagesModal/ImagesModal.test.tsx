import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ImagesModal from './ImagesModal';

// react-query client
const queryClient = new QueryClient();

describe("ImagesModal component", () => {
    test("matches snapshot", () => {
        const onClick = vi.fn();
        const selectedBreeds = [{breed: "foo", subBreed: "bar"}];

        const output = render(
            <QueryClientProvider client={queryClient}>
                <ImagesModal onClick={onClick} selectedBreeds={selectedBreeds} />
            </QueryClientProvider>
        );

        expect(output).toMatchSnapshot();
    })
});
