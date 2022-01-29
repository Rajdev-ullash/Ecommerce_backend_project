function avatarUpload (){
    const upload = uploader(
        "avatars",
        ["image/jpeg", "image/jpg", "image/png"],
        9000000,
        "Only JPG, PNG and JPEG are supported"
    );
}

module.exports = avatarUpload;