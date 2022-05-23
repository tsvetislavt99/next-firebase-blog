import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ThemeToggler() {
    const [darkMode, setDarkMode] = useState<boolean>(null);
    useEffect(() => {
        if (localStorage.getItem('nextBlogDarkTheme') === 'true') {
            setDarkMode(true);
        }
    }, []);
    useEffect(() => {
        if (darkMode) {
            window.document.documentElement.classList.add('dark');
            localStorage.setItem('nextBlogDarkTheme', 'true');
        } else {
            window.document.documentElement.classList.remove('dark');
            localStorage.setItem('nextBlogDarkTheme', 'false');
        }
    }, [darkMode]);
    const onClick = () => {
        setDarkMode((currMode) => !currMode);
    };

    return (
        <div className="relative inline-block w-16 mr-2 align-middle select-none">
            <input
                value={darkMode === null ? '' : darkMode.toString()}
                checked={darkMode ? true : false}
                onChange={() => onClick()}
                type="checkbox"
                name="toggle"
                id="toggle"
                className="toggle-checkbox absolute block w-6 h-6 mt-1 ml-1 rounded-full bg-sun shadow-glow shadow-yellow-400 bg-auto bg-center appearance-none cursor-pointer checked:bg-moon checked:shadow-gray-500 z-10"
            />

            <label
                htmlFor="toggle"
                className="toggle-label block overflow-hidden h-8 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-200 cursor-pointer"
            >
                {darkMode ? (
                    <div className="absolute bottom-0 left-2">
                        <Image
                            className="-z-1"
                            src="/images/icons/stars.svg"
                            width={22}
                            height={22}
                            alt="clouds"
                        />
                    </div>
                ) : (
                    <div className="absolute bottom-0 right-2">
                        <Image
                            className="-z-1"
                            src="/images/icons/clouds.svg"
                            width={22}
                            height={22}
                            alt="clouds"
                        />
                    </div>
                )}
            </label>
            <style jsx>{`
                .toggle-checkbox:checked {
                    -webkit-transition: all 0.5s;
                    -moz-transition: all 0.5s;
                    -o-transition: all 0.5s;
                    transition: all 0.5s;
                    transform: translateX(135%);
                }
                .toggle-checkbox:not(:checked) {
                    -webkit-transition: all 0.5s;
                    -moz-transition: all 0.5s;
                    -o-transition: all 0.5s;
                    transition: all 0.5s;
                    transform: translateX(0);
                }
                .toggle-checkbox:checked + .toggle-label {
                    background: linear-gradient(
                        74.2deg,
                        #2e2e8b 12.71%,
                        #15154e 74.21%
                    );
                }
            `}</style>
        </div>
    );
}
