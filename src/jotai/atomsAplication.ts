import { atom } from 'jotai';
import { cloudinaryReturnProps } from '@/types/Thumb';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AtomWidget = atom<cloudinaryReturnProps | any>({});

// atoms create post --------------------------------
export const AtomTitle = atom<string>('');
export const AtomEditor = atom<boolean | null>(null);
export const AtomSending = atom<boolean>(false);
export const AtomThumb = atom<string>('');
export const AtomWidgetVisible = atom<boolean>(true);
// fim ----------------------------------------------