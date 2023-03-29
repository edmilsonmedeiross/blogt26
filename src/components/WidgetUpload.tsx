import { CldUploadWidget } from 'next-cloudinary';
import { useAtom } from 'jotai';
import { widgetAtom } from '@/jotai/atomsAplication';
import { cloudinaryReturnProps } from '@/types/Thumb';

function WidgetUpload() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [thumbInfos, setThumbInfos] = useAtom(widgetAtom);

  const options = {
    cropping: true,
    clientAllowedFormats: ['jpg', 'jpeg'],
    publicId: ''
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (Object.hasOwn(thumbInfos, 'public_id')) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    options.publicId = thumbInfos.public_id as string;
  }
  return (
    <div>
      <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params" 
      onUpload={ (e: {info: cloudinaryReturnProps}) => setThumbInfos(e.info) }
      uploadPreset='signedUpload'
      options={options}>
        {(all) => {
          function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault();
            all.open();
          }
          
          return (
            <div>
              <button onClick={handleOnClick}>
                Thumbnail Image
              </button>
            </div>
          );
        }}
      </CldUploadWidget>

    </div>
  );
}

export default WidgetUpload;


