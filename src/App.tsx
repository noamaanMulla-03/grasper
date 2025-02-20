import { EuiProvider, EuiThemeProvider, EuiThemeColorMode } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_dark.json';
import '@elastic/eui/dist/eui_theme_light.json';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAppSelector } from './app/hooks';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

function App() {
    const dispatch = useDispatch();
    const isDarkTheme = useAppSelector(
        (grasperApp) => grasperApp.auth.isDarkTheme
    );
    const [isInitialEffect, setIsInitialEffect] = useState(true);

    const [theme, setTheme] = useState<EuiThemeColorMode>('light');
    useEffect(() => {
        const theme = localStorage.getItem('grasper-theme');

        if (theme) setTheme(theme as EuiThemeColorMode);
        else localStorage.setItem('grasper-theme', 'light');
    }, []);

    useEffect(() => {
        if (isInitialEffect) setIsInitialEffect(false);
        else {
            window.location.reload();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDarkTheme]);

    const overrides = {
        colors: {
            LIGHT: { primary: '#0b5cff' },
            DARK: { primary: '#0b5cff' },
        },
    };

    return (
        <EuiProvider>
            <EuiThemeProvider modify={overrides}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </EuiThemeProvider>
        </EuiProvider>
    );
}

export default App;
