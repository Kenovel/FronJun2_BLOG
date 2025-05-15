import './index.css';
import Blog from './Blog';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Blog />
    </BrowserRouter>,
);
