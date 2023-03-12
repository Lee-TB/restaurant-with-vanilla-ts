import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import { App } from './app';

const root = <HTMLDivElement>document.getElementById('root');
new App(root).render();
