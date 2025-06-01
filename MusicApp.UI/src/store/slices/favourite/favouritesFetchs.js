export const getFavouritesFetch = () => {
    return async (dispatch) => {
        try {
        const baseURL = import.meta.env.VITE_API_MUSIC_URL;
        let response = await fetch(`${baseURL}/api/favourites`, {
            headers: {
            "Authorization": `Bearer ${localStorage.getItem("TOKEN_KEY")}`,
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        let data = await response.json();
        dispatch(favouriteActions.setFavouriteList(data));
        } catch (error) {
        console.error("Error fetching favourites:", error);
        }
    };
}