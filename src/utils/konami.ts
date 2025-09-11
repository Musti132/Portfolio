// const konamiCode: Array<number> = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
export const konamiCode: Array<string> = ['ArrowLeft', 'ArrowLeft', 'ArrowRight', 'ArrowRight'];
let konamiIndex: number = 0;

const initKonamiCode = (callback: () => void, onKeyPressed: (key: string) => void = () => {}) => {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === konamiCode[konamiIndex]) {
            onKeyPressed(e.key);
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                callback();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

export default initKonamiCode;