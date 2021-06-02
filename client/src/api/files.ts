import axios from '../config/axios'

export type UploadResponseType = {
    file: File
    status: string
}

export default Object.assign({
    upload: (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        const config = {
            "Content-Type": "multipart/form-data",
            onUploadProgress: (event: any) => console.log(event.loaded)
        };

        return axios.post<UploadResponseType>("/files", formData, config)
            .then((res) => {
                return res.data
            })
            .catch((err) => {
                return err.response
            })
    }
})