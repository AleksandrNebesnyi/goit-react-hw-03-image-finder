const API_KEY = "23744407-6e41977eb223c860dbad454a0";
const BASE_URL = "https://pixabay.com/api/"
 





// const fetchPixabayImages = async (searchQuery,currentPage)=>{
//     const {data} = await fetch(`${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
//     return data;
// }



 function fetchPixabayImages (searchQuery,currentPage) {

return fetch(`${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`).then(response =>{
    if(response.ok) {
        return response.json();
    }
    return Promise.reject(new Error(`Нет покемона с именем ${searchQuery}`));
})
}

// const fetchImages = async (searchQuery, currentPage) => {
//     const { data } = await fetch(
//       `${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
//     );
  
//     return data;
//   };
  

//     const {data} = await fetch(`${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
//     const response = await data ;
//     if (response.ok) {
//         return response.json();
//     }
//     return Promise.reject(new Error (`Нет покемона с именем ${searchQuery}`));
// }


export default fetchPixabayImages;




