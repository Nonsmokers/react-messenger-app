import React, {useState, useEffect} from "react"
import {Upload, Modal} from "antd"
import {AttachmentType} from '../../../types/types'

function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

type PropsType = {
    attachments: Array<AttachmentType>
    removeAttachment: (file: any) => void
}

const UploadFiles: React.FC<PropsType> = ({attachments, removeAttachment}) => {
    const [state, setState] = useState({
        previewVisible: false,
        previewImage: "",
        fileList: attachments,
    })

    useEffect(() => {
        setState({
            ...state,
            fileList: attachments
        })
    }, [attachments])

    const handleCancel = () => setState({...state, previewVisible: false})

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        setState({
            ...state,
            previewImage: file.url || file.preview,
            previewVisible: true
        })
    }

    const handleChange = ({fileList}: any) =>
        setState({
            ...state,
            fileList
        })

    return (
        <div className="clearfix">
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"    // @ts-ignore
                fileList={state.fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={(file) => removeAttachment(file)}
            />
            <Modal
                visible={state.previewVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{width: "100%"}} src={state.previewImage}/>
            </Modal>
        </div>
    )
}

UploadFiles.defaultProps = {
    attachments: []
}

export default UploadFiles