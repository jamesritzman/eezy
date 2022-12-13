export const getImagesListByBreed = async (selectedBreed, selectedSubBreed = null) => {
    if (selectedBreed === '') return {message: []}
    const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/${selectedSubBreed ? selectedSubBreed + '/' : ''}images`);
    if (!response.ok) {
        throw new Error('Network response for fetching images by breed was not ok');
    }
    return response.json();
};
