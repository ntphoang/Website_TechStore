import productApi from "./productAPI";

productApi.getAll().then(res => {
    console.log("TEST:", res);
});