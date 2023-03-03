import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');
window.addEventListener('load', () => {
    const button = <HTMLButtonElement>document.createElement('button');
    button.innerText = 'show user name';
    button.onclick = () => {};
    app?.appendChild(button);
});
