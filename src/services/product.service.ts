import { PostDataType } from "../page/productAdd/ProductAdd";
import httpService from "./http.service";
import config from "../config.json";

const productService = {
    get: async () => {
        const { data } = await httpService.get(config.apiEndPoint);
        return data;
    },
    post: async (data: PostDataType) => {
        const response = await httpService.post(config.apiEndPoint, data);
        return response;
    },
    delete: async (data: object) => {
        const response = await httpService.delete(config.apiEndPoint, data);
        return response;
    }
};

export default productService;
