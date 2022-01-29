const multer = require("multer");

function uploader(
    subfolder_path,
    allowed_file_types,
    max_file_size,
    error_msg
) {
    // file upload

    const UPLOADS_FOLDER = `${__dirname}/../../avatars/`;

    //define the storage

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, UPLOADS_FOLDER)
        },
        filename: function (req, file, cb) {
            const fileExt = path.extname(file.originalname);
            const filename = file.originalname
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") + "-" + Date.now();



            cb(null, filename + fileExt);
        },
    });

    //prepare the final upload

    const upload = multer({
        storage: storage,
        limits: {
            filesize : max_file_size
        },
        fileFilter: (req, file, cb) =>{
            if(allowed_file_types.includes(file.mimetype)){
                cb(null, true);
            }else{
                cb(createError(error_msg))
            }
        },
    });

    return upload;
}


module.exports = uploader;