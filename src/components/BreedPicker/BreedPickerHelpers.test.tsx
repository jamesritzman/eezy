import { getImagesListByBreed} from './BreedPickerHelpers';

describe("getImagesListByBreed helper function", () => {
    it("returns empty message if no breed is provided", async () => {
        const selectedBreed = '';
        const returnVal = await getImagesListByBreed(selectedBreed);
        expect(returnVal).toEqual({message: []});
    });

    it("returns mocked data when provided with a breed", async () => {
        const selectedBreed = 'poodle';
        const returnVal = await getImagesListByBreed(selectedBreed);
        console.log("returnVal is: ", returnVal);
        expect(returnVal).toEqual({message: []});
    })
});
