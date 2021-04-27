const cloudinary = require("../core/cloudinary");
const UploadFileModel = require("../models/UploadFile");

class UploadFileController {

    createFile = (req, res) => {
        const userId = req.user._id;
        const file = req.file;

        cloudinary.uploader.upload_stream({resource_type: "auto"}, async (error, result) => {
            if (error) {
                throw new Error(error);
            }

            const fileData = {
                filename: result.original_filename,
                size: result.bytes,
                ext: result.format,
                url: result.url,
                user: userId
            };

            const uploadFile = await new UploadFileModel(fileData);
            const fileObj = await uploadFile.save()
            try {
                res.json({
                    status: "success",
                    file: fileObj
                })
            } catch (err) {
                res.json({
                    status: "error",
                    message: err
                })
            }
        }).end(file.buffer);
    };

    deleteFile = async (req, res) => {

    }

}

module.exports = UploadFileController;