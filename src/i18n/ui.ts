/**
 * Preact アイランド（クライアント UI）の文言。ロケール別。
 * ページレベル content (`en.ts` / `ja.ts`) とは別に、インタラクティブな
 * アイランドが表示する文字列をここに集約する。
 *
 * 重要: アイランドは locale を PROP で受け取り（SSR 時に存在）、
 * `document` 等から読まない。SSR とクライアントで同一文字列を描画して
 * hydration mismatch を防ぐ。
 */
export const ui = {
  en: {
    // ConvertColorTool
    hexLabel: 'HEX',
    rgbLabel: 'RGB',
    hslLabel: 'HSL',
    hexPlaceholder: '#ffffff or fff',
    rgbPlaceholder: 'rgb(255, 255, 255) or 255,255,255',
    hslPlaceholder: 'hsl(0, 0%, 100%) or 0,0%,100%',
    swatchAria: 'Color preview',
    errInvalidHex: 'Not a valid HEX color — try #fff or #ffffff.',
    errInvalidRgb: 'Not a valid RGB color — try rgb(255, 0, 0) or 255,0,0 (each 0-255).',
    errInvalidHsl: 'Not a valid HSL color — try hsl(0, 100%, 50%) or 0,100%,50%.',

    // InstallPrompt
    installHeading: 'Install app',
    installBody: 'Add to your home screen for quick access.',
    install: 'Install',
    later: 'Later',

    // ThemeToggle
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    themeLabel: 'Theme',

    // shared
    close: 'Close',
    required: 'Required',
  },
  ja: {
    // ConvertColorTool
    hexLabel: 'HEX',
    rgbLabel: 'RGB',
    hslLabel: 'HSL',
    hexPlaceholder: '#ffffff または fff',
    rgbPlaceholder: 'rgb(255, 255, 255) または 255,255,255',
    hslPlaceholder: 'hsl(0, 0%, 100%) または 0,0%,100%',
    swatchAria: 'カラープレビュー',
    errInvalidHex: '正しいHEXカラーではありません。例: #fff または #ffffff',
    errInvalidRgb: '正しいRGBカラーではありません。例: rgb(255, 0, 0) または 255,0,0（各値0〜255）',
    errInvalidHsl: '正しいHSLカラーではありません。例: hsl(0, 100%, 50%) または 0,100%,50%',

    // InstallPrompt
    installHeading: 'アプリを追加',
    installBody: 'ホーム画面に追加すると、すぐに開けます。',
    install: '追加',
    later: 'あとで',

    // ThemeToggle
    themeToLight: 'ライトモードに切り替え',
    themeToDark: 'ダークモードに切り替え',
    themeLabel: 'テーマ',

    // shared
    close: '閉じる',
    required: '必須',
  },
  zh: {
    // ConvertColorTool
    hexLabel: 'HEX',
    rgbLabel: 'RGB',
    hslLabel: 'HSL',
    hexPlaceholder: '#ffffff 或 fff',
    rgbPlaceholder: 'rgb(255, 255, 255) 或 255,255,255',
    hslPlaceholder: 'hsl(0, 0%, 100%) 或 0,0%,100%',
    swatchAria: '颜色预览',
    errInvalidHex: '不是有效的 HEX 颜色，例如 #fff 或 #ffffff。',
    errInvalidRgb: '不是有效的 RGB 颜色，例如 rgb(255, 0, 0) 或 255,0,0（每个值 0-255）。',
    errInvalidHsl: '不是有效的 HSL 颜色，例如 hsl(0, 100%, 50%) 或 0,100%,50%。',

    // InstallPrompt
    installHeading: '安装应用',
    installBody: '添加到主屏幕，方便随时打开。',
    install: '安装',
    later: '以后再说',

    // ThemeToggle
    themeToLight: '切换到浅色模式',
    themeToDark: '切换到深色模式',
    themeLabel: '主题',

    // shared
    close: '关闭',
    required: '必填',
  },
  de: {
    // ConvertColorTool
    hexLabel: 'HEX',
    rgbLabel: 'RGB',
    hslLabel: 'HSL',
    hexPlaceholder: '#ffffff oder fff',
    rgbPlaceholder: 'rgb(255, 255, 255) oder 255,255,255',
    hslPlaceholder: 'hsl(0, 0%, 100%) oder 0,0%,100%',
    swatchAria: 'Farbvorschau',
    errInvalidHex: 'Keine gültige HEX-Farbe — versuche #fff oder #ffffff.',
    errInvalidRgb: 'Keine gültige RGB-Farbe — versuche rgb(255, 0, 0) oder 255,0,0 (je 0-255).',
    errInvalidHsl: 'Keine gültige HSL-Farbe — versuche hsl(0, 100%, 50%) oder 0,100%,50%.',

    // InstallPrompt
    installHeading: 'App installieren',
    installBody: 'Zum Startbildschirm hinzufügen, um es direkt zu öffnen.',
    install: 'Installieren',
    later: 'Später',

    // ThemeToggle
    themeToLight: 'Zum hellen Modus wechseln',
    themeToDark: 'Zum dunklen Modus wechseln',
    themeLabel: 'Design',

    // shared
    close: 'Schließen',
    required: 'Erforderlich',
  },
  es: {
    // ConvertColorTool
    hexLabel: 'HEX',
    rgbLabel: 'RGB',
    hslLabel: 'HSL',
    hexPlaceholder: '#ffffff o fff',
    rgbPlaceholder: 'rgb(255, 255, 255) o 255,255,255',
    hslPlaceholder: 'hsl(0, 0%, 100%) o 0,0%,100%',
    swatchAria: 'Vista previa del color',
    errInvalidHex: 'No es un color HEX válido — prueba #fff o #ffffff.',
    errInvalidRgb: 'No es un color RGB válido — prueba rgb(255, 0, 0) o 255,0,0 (cada valor 0-255).',
    errInvalidHsl: 'No es un color HSL válido — prueba hsl(0, 100%, 50%) o 0,100%,50%.',

    // InstallPrompt
    installHeading: 'Instalar la app',
    installBody: 'Añádela a tu pantalla de inicio para tenerla siempre a mano.',
    install: 'Instalar',
    later: 'Más tarde',

    // ThemeToggle
    themeToLight: 'Cambiar al modo claro',
    themeToDark: 'Cambiar al modo oscuro',
    themeLabel: 'Tema',

    // shared
    close: 'Cerrar',
    required: 'Obligatorio',
  },
} as const;

export type UiStrings = (typeof ui)['en'];
