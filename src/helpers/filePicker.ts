interface CloudinaryInfoObject {
  event: string;
  info: {
    secure_url: string;
    original_filename: string;
  };
}

interface cloudinaryProps {
  openUploadWidget: (
    options: {
      cloudName: string;
      uploadPreset: string;
      sources: string[];
      showAdvancedOptions: boolean;
      cropping: boolean;
      multiple: boolean;
      defaultSource: string;
      styles: {
        palette: {
          window: string;
          windowBorder: string;
          tabIcon: string;
          menuIcons: string;
          textDark: string;
          textLight: string;
          link: string;
          action: string;
          inactiveTabIcon: string;
          error: string;
          inProgress: string;
          complete: string;
          sourceBg: string;
        };
        fonts: {
          default: null;
          '"Fira Sans", sans-serif': {
            url: string;
            active: boolean;
          };
        };
      };
    },
    cb: (err: unknown, info: CloudinaryInfoObject) => void
  ) => void;
}

type Callback = (url: string, options: {title:string})=>void;

declare global {
  interface Window {
    cloudinary: cloudinaryProps;
  }
}

let isOpen = false;

function showUploadWidget(cb: Callback) {
  if (typeof window === 'undefined')return;
  if (window.cloudinary === undefined ) {
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    document.body.appendChild(script);
  }

  window.cloudinary.openUploadWidget({
    cloudName: 'dyne2rg3b',
    uploadPreset: 'uploadImage',
    sources: ['local'],
    showAdvancedOptions: false,
    cropping: true,
    multiple: false,
    defaultSource: 'local',
    styles: {
        palette: {
            window: '#FFFFFF',
            windowBorder: '#90A0B3',
            tabIcon: '#0078FF',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#0E2F5A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#E4EBF1'
        },
        fonts: {
            default: null,
            '"Fira Sans", sans-serif': {
                url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
                active: true
            }
        }
    }
  },
  (err: unknown, info: CloudinaryInfoObject) => {
    if (!err) {    
      console.log('Upload Widget event - ', info);
      // cb(info[0].secure_url, { title: info[0].original_filename });
    }
    if (info.event === 'success' && info.info.secure_url) {
      cb(info.info.secure_url, { title: info.info.original_filename });
    }
    if (info.event === 'close') {
      isOpen = false;
    }
  });
}

export const filePickerCallback = (cb: Callback) => {
  if (isOpen) return;
  console.log('called');
  showUploadWidget(cb);
  isOpen = true;
};

