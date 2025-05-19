import './index.css';
import Blog from './Blog';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <Blog />
        </BrowserRouter>
    </Provider>,
);
