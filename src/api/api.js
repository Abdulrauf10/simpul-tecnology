import axios from "axios";

export const getUsers = async () => {
  try {
    const getData = await axios.get('https://dummyapi.io/data/v1/post/', {headers: {"app-id": "637f255d0ed25645cfbc455c"}})

    return getData.data
  } catch (error) {
   console.log(error) 
  }
}