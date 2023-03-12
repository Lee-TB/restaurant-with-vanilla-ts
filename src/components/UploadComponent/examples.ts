import { UploadComponent } from './UploadComponent';

const root = <HTMLDivElement>document.getElementById('root');
new UploadComponent(root, {
    label: 'Upload Image',
    onChange: (fileList) => {
        console.log(fileList);
    },
}).render();
