import {Children, createContext} from 'react';
import {CustomImagePicker} from '../components';

const ImagePickerProvider = createContext();

const ImagePickerProvider = () => {
  const [] = useState();
  const optionText;

  return (
    <ImagePickerProvider.Provider value={optionText}>
      {Children}
      <CustomImagePicker />
    </ImagePickerProvider.Provider>
  );
};
