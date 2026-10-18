import { createApp } from 'vue';
import App from './App.vue';
import PrototypeGallery from './prototype/PrototypeGallery.vue';
import './style.css';
// 访问 /#/prototype 查看 Figma 原型还原页，默认路由保持 CRM 应用
const root = window.location.hash.startsWith('#/prototype') ? PrototypeGallery : App;
createApp(root).mount('#app');
