export async function uploadImage(file: any) {
    //     // Lấy file ảnh từ input tag
    // const fileInput = document.getElementById("file-input");
    // const file = fileInput.files[0];

    // Cài đặt các thông số cho việc upload
    const cloudName = 'leetb';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const uploadPreset = 'Restaurant-vanilla-TS';
    // const apiKey = 'your_api_key';
    // const apiSecret = 'your_api_secret';

    // Tạo đối tượng FormData để chứa ảnh
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('public_id', file.name);
    // formData.append('api_key', apiKey);

    // Thực hiện upload bằng Fetch API

    try {
        const res = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        return new Promise((resolve) => {
            resolve(res.json());
        });
    } catch (error) {
        console.log(error);
    }
}
