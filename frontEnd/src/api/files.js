import axios from '../config/axios'

export default Object.assign({
    upload: file => {
        const formData = new FormData();
        formData.append("file", file);
        return axios.post("/files", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
});