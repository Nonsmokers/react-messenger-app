import axios from '../config/axios'

export default Object.assign({
    upload: file => {
        const formData = new FormData();
        formData.append("file", file);

        const config = {
            "Content-Type": "multipart/form-data",
            onUploadProgress: event => console.log(event.loaded)
        };

        return axios.post("/files", formData, config).catch((err) => {
            return err.response
        })
    }
})