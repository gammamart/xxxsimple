declare module 'react-simple-captcha' {
    export function loadCaptchaEnginge(num: number): void;
    export function LoadCanvasTemplate(): any;
    export function LoadCanvasTemplateNoReload(): void;
    export function validateCaptcha(): boolean;
  }
  