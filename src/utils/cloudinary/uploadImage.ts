export function uploadImage(file: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            // Cài đặt các thông số cho việc upload
            const cloudName = 'leetb';
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
            const uploadPreset = 'Restaurant-vanilla-TS';

            // Tạo đối tượng FormData để chứa ảnh
            const formData = new FormData();
            formData.append('file', file);
            formData.append('public_id', file.name);
            formData.append('upload_preset', uploadPreset);

            // Thực hiện upload bằng Fetch API
            const res = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            resolve(res.json());
        } catch (error) {
            reject(error);
        }
    });
}
