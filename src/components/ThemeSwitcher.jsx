import { useState, useEffect } from 'react';
import styles from './ThemeSwitcher.module.css';

import React from 'react';
import {
  XMarkIcon,
  SunIcon,
  MoonIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeSwitcher = () => {
  const [isColorPicking, setIsColorPicking] = useState(false);
  const defaultDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
  const [theme, setTheme] = useLocalStorage('react-todo.theme', 277);
  const [hue, setHue] = useLocalStorage(
    'react-todo.color',
    defaultDark ? 'dark' : 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--_hue', hue);
  }, [hue]);

  return (
    <aside className={styles.wrapper} style={{}}>
      {isColorPicking ? (
        <>
          <button
            className={`btn ${styles.close}`}
            aria-label="Close color picking mode"
            onClick={() => setIsColorPicking(false)}
          >
            <XMarkIcon />
          </button>
          <input
            className={styles.picker}
            aria-label="Change color theme slider"
            type="range"
            min={0}
            max={360}
            value={hue}
            onInput={(e) => setHue(e.target.value)}
          />
        </>
      ) : (
        <div className={styles.btns}>
          <button
            aria-label={`Change theme to ${
              theme === 'light' ? 'dark' : 'light'
            } mode `}
            className="btn"
            role="switch"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setIsColorPicking(true)}
            aria-label="Enable color picking mode"
            className="btn"
          >
            <SwatchIcon />
          </button>
        </div>
      )}
    </aside>
  );
};

export default ThemeSwitcher;
