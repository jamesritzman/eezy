import { useQuery } from '@tanstack/react-query';

const getBreeds = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const BreedPicker = (props) => {
    const { isLoading, isError, data: rawBreedsData, error } = useQuery({
        queryKey: ['breedsList'],
        queryFn: getBreeds
    });

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    const primaryBreeds = Object.keys(rawBreedsData.message);

    return (
        <>
            <p>{JSON.stringify(rawBreedsData.message)}</p>
            <ol>
                {
                    Object.keys(rawBreedsData.message).map((primaryBreed) => {
                        return (
                            <li key={primaryBreed}>
                                {primaryBreed}
                                {
                                    rawBreedsData.message[primaryBreed].length > 0 && (
                                        <ul>
                                            {
                                                rawBreedsData.message[primaryBreed].map((subBreed) => {
                                                    return <li key={subBreed}>{subBreed}</li>
                                                })
                                            }
                                        </ul>
                                    )
                                }
                            </li>
                        )
                    })
                }
            </ol>
        </>
    )
}

export default BreedPicker;
