declare global {
    interface Window {
        ethereum: any; // You can replace `any` with a more specific type if you have one
    }
}
declare module 'react-lottie' {
    export * from 'react-lottie';
}
declare module 'uuid';
declare module 'toastr';

export { };